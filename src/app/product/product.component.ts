import { CatalogItem } from './../models/catalog-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public catalogItem: CatalogItem | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
