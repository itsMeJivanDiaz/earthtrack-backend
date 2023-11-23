export interface ProductModel {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
}

export interface ProductsSearchModel {
  searchTerm: string;
  page: number;
  limit: number;
}
