import {environment} from '../../../../environments/environment'

// products.service.ts - Serviço de Produtos (Pizzaria)
// [Samuel Kalain]

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  findOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(data: Product) {
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: string, data: Product) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
