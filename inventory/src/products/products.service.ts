import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductModel, ProductsSearchModel } from './products.inteface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async insertProduct(data: ProductModel): Promise<string> {
    const response = await this.productRepository.save(data);
    return response.id;
  }

  async getProducts(): Promise<ProductModel[]> {
    return this.productRepository.find();
  }

  async getProductById(id: string): Promise<ProductModel> {
    return this.productRepository.findOneBy({ id });
  }

  async searchProducts(
    data: ProductsSearchModel,
  ): Promise<{ data: Product[]; total: number }> {
    const search = data.searchTerm;
    const page = data.page;
    const limit = data.limit;

    const query = this.productRepository.createQueryBuilder('product');
    const searchQuery = `%${search}%`;
    query.where(
      'LOWER(product.name) LIKE LOWER(:searchTerm) OR LOWER(product.description) LIKE LOWER(:searchTerm)',
      { searchTerm: searchQuery },
    );

    const total = await query.getCount();

    query.take(limit);
    query.skip((page - 1) * limit);

    const response = await query.getMany();
    return { data: response, total };
  }

  async updateProduct(data: ProductModel): Promise<string> {
    const response = await this.productRepository.save(data);
    return response.id;
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
