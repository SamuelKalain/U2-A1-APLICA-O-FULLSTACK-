import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements OnInit {

  id!: number | null;

  product = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: 'pizza'
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.productService.getById(this.id).subscribe((res: any) => {
        this.product = res;
      });
    }
  }

  save() {
    if (this.id) {
      this.productService.update(this.id, this.product).subscribe(() => {
        this.router.navigate(['/products/list']);
      });

    } else {
      this.productService.create(this.product).subscribe(() => {
        this.router.navigate(['/products/list']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/products/list']);
  }

}
