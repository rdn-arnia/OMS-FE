import { CartService } from './../cart.service';
import { CatalogService } from './../catalog.service';
import { ProductService } from './../product.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Catalog } from '../models/catalog';
import { CatalogItem } from '../models/catalog-item';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, AfterViewInit {

  catalog: Catalog | undefined;
  catalogItems: CatalogItem[] = [];
  dataSource = new MatTableDataSource(this.catalogItems);
  displayedColumns: string[] = ['title', 'description', 'order', 'currentStock', 'price'];
  selection = new SelectionModel<CatalogItem>(true);
  
  quantitiesToOrder: number[] = [];

  @ViewChild(MatPaginator) paginator = null;

  constructor(private productService: ProductService,
    private catalogService: CatalogService,
    private cartService: CartService ) { }

  ngOnInit(): void {
    this.loadCatalogWithItems();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCatalogWithItems(): void {
    this.catalogService.getCurrentCatalog()
      .subscribe(catalog => {
        this.catalog = catalog;
        this.loadCatalogItems(catalog.catalogId);
      });
  }

  loadCatalogItems(catalogId: string): void {
    this.catalogService.getCatalogItems(catalogId)
      .subscribe(catalogItems => {
        this.catalogItems = catalogItems;

        this.dataSource.data = this.catalogItems;

        this.quantitiesToOrder = this.catalogItems.map(ci => 0);

        this.catalogItems.forEach(catalogItem => {
          this.productService.getProduct(catalogItem.productId)
            .subscribe(p => catalogItem.product = p);
        })
      });
  }

  hasOrderValues(): boolean {
    return this.quantitiesToOrder.filter(r => r > 0).length > 0;
  }

  addToCart(): void {
    const toOrder: Map<CatalogItem, number> = new Map();

    this.quantitiesToOrder.forEach((value, index) => {
      if (value > 0) {
        toOrder.set(this.catalogItems[index], value);
      }
    });

    this.cartService.addItemsToCart(toOrder);

    this.quantitiesToOrder.forEach((value, index) => this.quantitiesToOrder[index] = 0);
  }
}
