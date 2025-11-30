// customer-list.component.ts
// [Samuel Kalain]

import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { Customer } from '../models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];

  constructor(
    private service: CustomersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.findAll().subscribe(res => {
      this.customers = res;
    });
  }

  create() {
    this.router.navigate(['/customers/new']);
  }

  edit(id: string) {
    this.router.navigate(['/customers/edit', id]);
  }

  remove(id: string) {
    this.service.delete(id).subscribe(() => this.load());
  }
}
