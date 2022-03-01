import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private productUrl = environment.apiUrl + '/products/';
  
  constructor(
    private http: HttpClient
  ) { }

  public getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(this.productUrl + productId);
  }
}
