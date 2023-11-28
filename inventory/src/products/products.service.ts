import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductsSearchModel } from './products.inteface';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async insertProduct(data: Product): Promise<Product> {
    try {
      const response = await this.productRepository.save(data);
      return response;
    } catch (e) {
      throw new RpcException({ message: e.message });
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await this.productRepository.find();
      return response;
    } catch (e) {
      throw new RpcException({ message: e.message });
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await this.productRepository.findOneBy({ id });
      return response;
    } catch (e) {
      throw new RpcException({ message: e.message });
    }
  }

  async getProductCategories(): Promise<string[]> {
    try {
      const response: { category: string }[] = await this.productRepository
        .createQueryBuilder()
        .select('DISTINCT product.category', 'category')
        .from(Product, 'product')
        .getRawMany();
      return response.map((categories) => categories.category);
    } catch (e) {
      throw new RpcException({ message: e.message });
    }
  }

  async getProductsByCategory(
    data: ProductsSearchModel,
  ): Promise<{ data: Product[]; total: number }> {
    try {
      const category = data.category;
      const page = data.page;
      const limit = data.limit;

      const query = this.productRepository.createQueryBuilder('product');
      const categoryQuery = `${category}`;
      query.where('LOWER(product.category) = LOWER(:category)', {
        category: categoryQuery,
      });

      const total = await query.getCount();

      query.take(limit);
      query.skip((page - 1) * limit);

      const response = await query.getMany();
      return { data: response, total };
    } catch (e) {
      throw new RpcException({ message: e.message });
    }
  }

  async searchProducts(
    data: ProductsSearchModel,
  ): Promise<{ data: Product[]; total: number }> {
    try {
      const search = data.query;
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
    } catch (e) {
      throw new RpcException({ message: e.message });
    }
  }

  async updateProduct(data: Product): Promise<Product> {
    try {
      const response = await this.productRepository.save(data);
      return response;
    } catch (e) {
      throw new RpcException({ message: e.message });
    }
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    try {
      const response = await this.productRepository.delete(id);
      return response;
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      });
    }
  }
}
