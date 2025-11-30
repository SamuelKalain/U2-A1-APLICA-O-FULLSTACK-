// product-form.component.ts
// [Samuel Kalain]

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/products';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  id?: string;
  product: Product = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: 'pizza'
  };

  categorias = [
    { label: 'Pizza', value: 'pizza' },
    { label: 'Bebida', value: 'bebida' },
    { label: 'Sobremesa', value: 'sobremesa' }
  ];

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.service.findOne(this.id).subscribe(res => {
        this.product = res;
      });
    }
  }

  save() {
    if (this.id) {
      this.service.update(this.id, this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.service.create(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
