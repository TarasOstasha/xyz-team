import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subject, fromEvent, Subscription, from, of, Observable, combineLatest, EMPTY, isObservable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { debounceTime, map, distinctUntilChanged, mergeMap, filter, tap, startWith, catchError, switchMap } from 'rxjs/operators';
// import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatInput } from '@angular/material/input';

interface Order { // test interface
  orderN: number;
  productCode: string;
  productName: string;
  orderInHandDate: Date;
  orderStatus: any;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements AfterViewInit, OnInit, OnDestroy {
  //@ViewChild('toTarget', {static: true}) toTarget!: ElementRef;
  //@ViewChild('search', {static: false}) search!: ElementRef;
 

  // *** handle errors
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
 
  private searchValueSubject = new Subject<string>();
  searchValue: string  = ''; // ngModel value
  data$: any;

  orders$: any; // later should be order interface
  private searchTerms =new Subject<string>();
  mySearch(term: string) {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.orders$ = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(item => console.log(item)),
      switchMap((value: string) => this._http.post<string>('http://localhost:3000/orders', {value} )),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    ).subscribe(console.log)
  }

  onKeyup() {
    // this.data$ = of(this.searchValue).pipe(
    //   startWith(""),
    //   debounceTime(700),
    //   distinctUntilChanged(),
    //   tap(item => console.log(item)),
    //   mergeMap((value: string) => this._http.post<string>('http://localhost:3000/orders', {value} )),
    //   catchError(err => {
    //     this.errorMessageSubject.next(err);
    //     return EMPTY;
    //   })
    // ).subscribe(console.log)
  }

  ngAfterViewInit(): void {
    // fromEvent(this.search.nativeElement as HTMLInputElement, 'keyup').pipe(
    //   debounceTime(500),
    //   startWith(""),
    //   distinctUntilChanged(),
    //   tap(item => console.log(isObservable(item))),
    //   //mergeMap(value => this._http.post<string>('http://localhost:3000/orders', { test: 'MK100' })),
    //   catchError(err => {
    //     this.errorMessageSubject.next(err);
    //     return EMPTY;
    //   })
    // ).subscribe(console.log)
    
  }


  constructor(private _order: OrderService, private _http: HttpClient) { 
  }


  searchVal(val: any): void {
    //console.log(val)
    of(val).pipe( // transfer data to stream
      debounceTime(700), // make delay
      distinctUntilChanged(), // avoid duplicated values
      tap((val) => this._order.searchString.next(val))
    ).subscribe({
      next: res => this._order.searchString.next(res),
      error: console.log
    });

    console.log(this._order.searchString, this._order.getData1())
  }



  ngOnDestroy(): void {
    this._order.searchString.unsubscribe();
    //this.searchQueryStream.unsubscribe();
   
  }

}
