// customers.service.ts
// [Samuel Kalain]

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private api = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Customer[]>(this.api);
  }

  findOne(id: string) {
    return this.http.get<Customer>(`${this.api}/${id}`);
  }

  create(data: Customer) {
    return this.http.post(this.api, data);
  }

  update(id: string, data: Customer) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }

  // ViaCEP API
  consultarCEP(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  // IBGE Estados
  listarEstados() {
    return this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  // IBGE Cidades
  listarCidades(estadoId: string) {
    return this.http.get<any[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
  }
}
