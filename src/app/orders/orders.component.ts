import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  dataSource = new MatTableDataSource(this.orders);
  displayedColumns: string[] = ['order-id', 'customer-id', 'quantity', 'price'];

  constructor() { }

  ngOnInit(): void {
  }

}
