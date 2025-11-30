// products.ts - Modelo de Produtos (Pizzaria)
// [Samuel Kalain]

export interface Product {
  _id?: string;
  nome: string;
  descricao?: string;
  preco: number;
  categoria: string; // pizza | bebida | sobremesa
}
