import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private productUrl = 'http://localhost:5150/api/product/';
  
  constructor(
    private http: HttpClient
  ) { }

  public getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(this.productUrl + productId);
  }
}
