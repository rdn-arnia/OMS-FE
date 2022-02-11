import { CatalogService } from './../catalog.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Catalog } from '../models/catalog';
import { CatalogItem } from '../models/catalog-item';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  catalog: Catalog | undefined;
  catalogItems: CatalogItem[] = [];

  constructor(private productService: ProductService,
    private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.getCatalogWithItems();
  }

  getCatalogWithItems(): void {
    this.catalogService.getCurrentCatalog()
      .subscribe(catalog => {
        this.catalog = catalog;
        this.getCatalogItems(catalog.catalogId);
      });
  }

  getCatalogItems(catalogId: string): void {
    this.catalogService.getCatalogItems(catalogId)
      .subscribe(catalogItems => {
        this.catalogItems = catalogItems;

        this.catalogItems.forEach(catalogItem => {
          this.productService.getProduct(catalogItem.productId)
            .subscribe(p => catalogItem.product = p);
        })
      });
  }
}
