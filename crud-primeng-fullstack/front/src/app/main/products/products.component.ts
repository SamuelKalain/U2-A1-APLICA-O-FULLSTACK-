import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

// products.component.ts - Lista de Produtos
// [Samuel Kalain]

import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from './models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

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

  newProduct() {
    this.router.navigate(['/products/new']);
  }

  edit(id: string) {
    this.router.navigate(['/products/edit', id]);
  }

  remove(id: string) {
    this.service.delete(id).subscribe(() => this.load());
  }
}
