import { OrderService } from './../order.service';
import { CartService } from './../cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrderItem } from '../models/order-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  orderItems: OrderItem[] = [];
  dataSource = new MatTableDataSource(this.orderItems);
  displayedColumns: string[] = ['title', 'quantity', 'unit_price', 'price'];
  customer: string = '';
  
  quantitiesToOrder: number[] = [];

  @ViewChild(MatPaginator) paginator = null;

  constructor(private cartService: CartService,
    private orderService: OrderService) {  }

  ngOnInit(): void {
    this.loadOrderItems();
  }

  public hasOrderItems(): boolean {
    return this.orderItems.length > 0;
  }

  public submitOrder(): void {
    this.orderService.submitOrder(this.customer, this.orderItems).subscribe(response => {
      this.clearOrder();
    });
  }

  public clearOrder(): void {
    this.cartService.clear();
    this.loadOrderItems();
  }

  private loadOrderItems(): void {
    this.orderItems = this.cartService.getItems();
    this.dataSource.data = this.orderItems;
  }
}
