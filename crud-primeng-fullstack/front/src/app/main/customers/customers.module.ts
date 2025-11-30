import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomersRoutingModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule
  ]
})
export class CustomersModule {}
