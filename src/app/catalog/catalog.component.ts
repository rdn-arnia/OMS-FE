import { CatalogService } from './../catalog.service';
import { ProductService } from './../product.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Catalog } from '../models/catalog';
import { CatalogItem } from '../models/catalog-item';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, AfterViewInit {

  catalog: Catalog | undefined;
  catalogItems: CatalogItem[] = [];
  dataSource = new MatTableDataSource(this.catalogItems);
  displayedColumns: string[] = ['select', 'title', 'description', 'currentStock', 'price'];
  selection = new SelectionModel<CatalogItem>(true);

  @ViewChild(MatPaginator) paginator = null;

  constructor(private productService: ProductService,
    private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.getCatalogWithItems();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

        this.dataSource.data = this.catalogItems;

        this.catalogItems.forEach(catalogItem => {
          this.productService.getProduct(catalogItem.productId)
            .subscribe(p => catalogItem.product = p);
        })
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
