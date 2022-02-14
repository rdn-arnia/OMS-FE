import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItem } from './models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }
  
  submitOrder(customer: string, orderItems: OrderItem[]): Observable<any> {

    var httpOptions = {
      headers: new  HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    var postData = {
      customerId: customer,
      orderArticles: orderItems.map(oi => {
        return {
          productId: oi.catalogItem.productId,
          quantity: oi.quantity
        }})
    };

    return this.http.post("http://localhost:5150/api/orders", postData, httpOptions);
  }
}
