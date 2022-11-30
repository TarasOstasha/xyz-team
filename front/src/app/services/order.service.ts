import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, from, BehaviorSubject, of } from 'rxjs';
import { map, filter, tap, combineAll, combineLatest } from 'rxjs/operators';

interface Order { // test interface
  orderN: number;
  productCode: string;
  productName: string;
  orderInHandDate: Date;
  orderStatus: any;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  searchString = new BehaviorSubject("");
  searchString$ = this.searchString.asObservable();  

  myOrders: Order[] = [
    { orderN: 1,
      productCode: 'MK100',
      productName: 'SHOES',
      orderInHandDate: new Date('1/1/16'),
      orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']
    },
    {
      orderN: 2,
      productCode: 'MK101',
      productName: 'shoes',
      orderInHandDate: new Date('1/1/16'),
      orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']},
    {
      orderN: 3,
      productCode: 'MK102',
      productName: 'SHOES',
      orderInHandDate: new Date('1/1/16'),
      orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']
    },
    { orderN: 4,
      productCode: 'MK100',
      productName: 'SHOES',
      orderInHandDate: new Date('1/1/16'),
      orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']
    },
    {
      orderN: 5,
      productCode: 'MK101',
      productName: 'SHOES',
      orderInHandDate: new Date('1/1/16'),
      orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']},
    {
      orderN: 6,
      productCode: 'MK102',
      productName: 'SHOES',
      orderInHandDate: new Date('1/1/16'),
      orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']
    }
  ];

  myOrdersTest :any = [
    {
      orderN: 6,
      productCode: 'MK102',
      productName: 'SHOES',
      orderInHandDate: new Date('1/1/16'),
      orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']
    }
  ]

  getData(val: any): any {
    
    return this.myOrdersTest.map((item: any) => console.log(Object.values(item)))
    // return this.myOrdersTest.filter((item: any) => item.productCode === val.toUpperCase())
  }

  getData1() {
    console.log(this.searchString.pipe(tap(item=>console.log(item))))
  }
  
  products$ = combineLatest([
    this.searchString$,
    of(this.myOrdersTest)
  ])
    
  

  private productsUrl = 'api/products';


  constructor(private _http: HttpClient) { }








  
}
