import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {

  products: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((res: any) => {
      this.products = res;
    });
  }

  edit(id: number) {
    this.router.navigate(['/products/form', id]);
  }

  delete(id: number) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.productService.delete(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  create() {
    this.router.navigate(['/products/form']);
  }
}
