// product-list.component.ts
// [Samuel Kalain]

import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private service: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.findAll().subscribe(res => {
      this.products = res;
    });
  }

  create() {
    this.router.navigate(['/products/new']);
  }

  edit(id: string) {
    this.router.navigate(['/products/edit', id]);
  }

  remove(id: string) {
    this.service.delete(id).subscribe(() => this.load());
  }

}
