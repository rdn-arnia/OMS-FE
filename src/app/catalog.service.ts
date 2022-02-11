import { CatalogItem } from './models/catalog-item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalog } from './models/catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private catalogUrl = 'http://localhost:5150/api/catalogs/current';
  private catalogItemsUrl = 'http://localhost:5150/api/catalogitems/catalog/';

  constructor(
    private http: HttpClient
  ) { }

  getCurrentCatalog(): Observable<Catalog> {
    return this.http.get<Catalog>(this.catalogUrl);
  }

  getCatalogItems(catalogId: string): Observable<CatalogItem[]> {
    return this.http.get<CatalogItem[]>(this.catalogItemsUrl + catalogId);
  }
}
