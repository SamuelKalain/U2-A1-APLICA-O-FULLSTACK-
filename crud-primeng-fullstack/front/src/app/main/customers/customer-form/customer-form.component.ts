// customer-form.component.ts
// [Samuel Kalain]

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../services/customers.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {

  id?: string;
  estados: any[] = [];
  cidades: any[] = [];

  customer: Customer = {
    nome: '',
    telefone: '',
    cep: '',
    estado: '',
    cidade: '',
    endereco: ''
  };

  constructor(
    private route: ActivatedRoute,
    private service: CustomersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.service.listarEstados().subscribe(uf => {
      this.estados = uf.map((u: any) => ({
        label: u.nome,
        value: u.id
      }));
    });

    if (this.id) {
      this.service.findOne(this.id).subscribe(res => {
        this.customer = res;
        this.carregarCidades(res.estado);
      });
    }
  }

  carregarCidades(estadoId: string) {
    this.service.listarCidades(estadoId).subscribe(cidades => {
      this.cidades = cidades.map((c: any) => ({
        label: c.nome,
        value: c.nome
      }));
    });
  }

  buscarCEP() {
    if (this.customer.cep.length === 8) {
      this.service.consultarCEP(this.customer.cep).subscribe((info: any) => {
        this.customer.endereco = info.logradouro;
        this.customer.estado = info.ibge.substring(0, 2);
      });
    }
  }

  save() {
    if (this.id) {
      this.service.update(this.id, this.customer).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    } else {
      this.service.create(this.customer).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }
}
