import { OrderItem } from './models/order-item';
import { Injectable } from '@angular/core';
import { CatalogItem } from './models/catalog-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  public addItemsToCart(itemsToAdd: Map<CatalogItem, number>): void {
    const orderItems = this.getItems();
    
    itemsToAdd.forEach((quantity, catalogItem) => {
      const orderItem = orderItems.find(oi => oi.catalogItem.catalogItemId == catalogItem.catalogItemId);
      if (!!orderItem) {
        orderItem.quantity = +orderItem.quantity + +quantity;
      } else {
        orderItems.push({
          catalogItem: catalogItem,
          quantity: quantity
        });
      }
    });

    localStorage.setItem('cart_items', JSON.stringify(orderItems));
  }

  public getItems(): OrderItem[] {
    var cartItems = localStorage.getItem('cart_items');
    if (!!cartItems) {
      return JSON.parse(cartItems);
    } else {
      return [];
    }
  }

  public clear(): void {
    localStorage.removeItem('cart_items');
  }
} 
