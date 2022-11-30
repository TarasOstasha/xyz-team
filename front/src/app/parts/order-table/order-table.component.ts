import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Subscription, Observable, of, from, EMPTY, pipe, merge } from 'rxjs';
import { tap, map, catchError, combineLatest, mergeAll } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';

interface Order { // test interface
  orderN: number;
  productCode: string;
  productName: string;
  orderInHandDate: Date;
  orderStatus: any;
}

interface statusArr {
  status: string;
  color: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.less']
})


export class OrderTableComponent implements OnInit {
  @Input() expanded: boolean = false;
  @Output() open: EventEmitter<any> = new EventEmitter();

  private productsUrl = 'api/products';

  
  
  panelOpenState = false; // toggle panel flag
  selectOpenPanel = false;

  private statusChange = new BehaviorSubject<number>(0);
  statusChangeAction$ = this.statusChange.asObservable();

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  testOrders$: any;

  constructor(private _order: OrderService) { 
    // of([1,2,3,4]).pipe(
    //   mergeAll()
    // ).subscribe(v => console.log(v));
    this.testOrders$ = merge(
      of([1,2,3,4]),
      of(['test',22,'dfdsfs',44])
    ).pipe(
      tap(order => console.log(order)),
      map(order => order)
    ).subscribe(console.log)
  }

  ngOnInit(): void {
    console.log(this._order.myOrders)
  }

  myOrders$ = of(this._order.myOrders); // here I converted my hard coded array to Observable, later need to get all data from service from API
  
  
  statusChanges$ = this.statusChangeAction$
  .pipe(
    map(res => res),
    //tap(status => console.log(typeof status )),
    catchError(err => {
      this.errorMessageSubject.next(err)
      return EMPTY
    })
  ).subscribe()

 
  selectedOptions: Order[] | undefined; // array of all selected option


  

  statusArray: statusArr[] = [ {status: 'newOrder', color: 'green'}, { status: 'approvedOrder', color: 'red' }, { status: 'holdOnOrder', color: 'yellow' }, { status: 'noMoneyOrder', color: 'blue' }, { status: 'done', color: 'black' }]
  colorArr: Array<string> = [];
  myIndex = 0;
  onChange(selectedValue: any, index: any, event: any) {
    const currentColorIndex = event.currentTarget.options.selectedIndex;
    let filteredColor = this.statusArray.filter((item, index) => index == currentColorIndex );
    if(this.colorArr.includes(filteredColor[0].color)) this.colorArr.splice(currentColorIndex,1);
    else this.colorArr.push(filteredColor[0].color);
    this.myIndex = index;
    //console.log(event.currentTarget.options.selectedIndex)
    this.statusChange.next(event.currentTarget.options.selectedIndex);
  }
  sendColorStatus(index: any) {
    
  }



  onClick() {
    this.open.emit(true)
    this.selectOpenPanel = true;
    this.expanded = true;
    console.log(this.selectOpenPanel)
  }
  onOpen(index: any) {
    console.log(index, this.expanded,this.open)
  }



  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
