import { Injectable } from '@angular/core';
import { OrderItem } from './models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  
  submitOrder(customer: string, orderItems: OrderItem[]) {
    console.log('submitOrder');
  }
}
