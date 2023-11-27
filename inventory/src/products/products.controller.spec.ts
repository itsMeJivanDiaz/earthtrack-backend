import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { TestingModule, Test } from '@nestjs/testing';
import { Product } from './products.entity';
import {
  DeleteProductResponseDTO,
  ProductDTO,
  SearchProductResponseDTO,
} from './products.dto';

class MockRepository {}

const product: ProductDTO = {
  name: 'Test Product 1',
  description:
    'This is a test product number 1, do not use as real world value',
  category: 'Test 1',
  price: 2,
};

const productArray: ProductDTO[] = [
  {
    id: 'f0bb16a8-2ff3-43b3-977b-a19ce8f35064',
    name: 'Test Product 1',
    description:
      'This is a test product number 1, do not use as real world value',
    category: 'Android',
    price: 2,
  },
  {
    id: '36c2bef6-065a-4842-89c1-194cb1e31c94',
    name: 'Test Product 2',
    description:
      'This is a test product number 2, do not use as real world value',
    category: 'Apple',
    price: 2.55,
  },
];

describe('Products in Inventory Microservice', () => {
  let controller: ProductsController;
  let service: ProductService;
  let repository: MockRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: MockRepository,
        },
      ],
    }).compile();

    controller = moduleRef.get<ProductsController>(ProductsController);
    service = moduleRef.get<ProductService>(ProductService);
    repository = moduleRef.get<MockRepository>(getRepositoryToken(Product));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined - Controller', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined - Service', () => {
    expect(service).toBeDefined();
  });

  it('should be defined - Repository', () => {
    expect(repository).toBeDefined();
  });

  describe('Product DTO', () => {
    it('should have a product name', () => {
      expect(product.name).not.toBe('');
    });

    it('should have a description with minimum character of 10', () => {
      expect(product.description.length).toBeGreaterThanOrEqual(10);
    });

    it('should have a category with minimum character of 3', () => {
      expect(product.category.length).toBeGreaterThanOrEqual(3);
    });

    it('should have a price', () => {
      expect(product.price).not.toBe(null);
    });
  });

  describe('insertProduct', () => {
    it('should add product and return the product with an id', async () => {
      const mockedResult = productArray[0];

      jest.spyOn(service, 'insertProduct').mockResolvedValue(mockedResult);

      expect(await controller.insertProduct(product)).toBe(mockedResult);
      expect(service.insertProduct).toHaveBeenCalledWith(product);
    });
  });

  describe('getProducts', () => {
    it('should return an array of product', async () => {
      jest.spyOn(service, 'getProducts').mockResolvedValue(productArray);

      expect(await controller.getProducts()).toBe(productArray);
      expect(service.getProducts).toHaveBeenCalledWith();
    });
  });

  describe('searchProducts', () => {
    it('should return an array of product base on a query string', async () => {
      const query = 'Test Product';
      const page = 1;
      const limit = 10;
      const expectedResult = { data: productArray, total: 2 };

      jest.spyOn(service, 'searchProducts').mockImplementation(async () => {
        const searh = productArray.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()),
        );

        const total = searh.length;
        const startIndex = (page - 1) * limit;
        const data = searh.slice(startIndex, startIndex + limit);
        const respose: SearchProductResponseDTO = {
          data,
          total,
        };
        return respose;
      });

      expect(
        await controller.searchProducts({ query, page, limit }),
      ).toStrictEqual(expectedResult);
      expect(service.searchProducts).toHaveBeenCalledWith({
        query,
        page,
        limit,
      });
    });
  });

  describe('getProductsByCategory', () => {
    it('should return an array of product equal to a category', async () => {
      const category = 'Android';
      const page = 1;
      const limit = 10;
      const expectedResult = { data: [productArray[0]], total: 1 };

      jest
        .spyOn(service, 'getProductsByCategory')
        .mockImplementation(async () => {
          const searh = productArray.filter(
            (product) =>
              product.category.toLowerCase() === category.toLowerCase(),
          );

          const total = searh.length;
          const startIndex = (page - 1) * limit;
          const data = searh.slice(startIndex, startIndex + limit);
          const respose: SearchProductResponseDTO = {
            data,
            total,
          };
          return respose;
        });

      expect(
        await controller.getProductsByCategory({ category, page, limit }),
      ).toStrictEqual(expectedResult);
      expect(service.getProductsByCategory).toHaveBeenCalledWith({
        category,
        page,
        limit,
      });
    });
  });

  describe('getProductById', () => {
    it('should return product selected by id', async () => {
      const id = '36c2bef6-065a-4842-89c1-194cb1e31c94';
      const productToFind = productArray.find((product) => product.id === id);

      jest.spyOn(service, 'getProductById').mockResolvedValue(productToFind);

      expect(await controller.getProductById(id)).toBe(productToFind);
      expect(service.getProductById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateProduct', () => {
    it('should update product and return a product with the id', async () => {
      const id = '36c2bef6-065a-4842-89c1-194cb1e31c94';
      const updateValue = {
        name: 'Test Product 1 Updated',
        description:
          'This is a test product number 1, do not use as real world value',
        category: 'Test 1',
        price: 2,
      };
      const mockedData: ProductDTO = { ...updateValue, id };

      jest.spyOn(service, 'updateProduct').mockImplementation(async () => {
        const index = productArray.findIndex((product) => product.id === id);
        if (index !== -1) {
          const updatedProduct = { ...productArray[index], ...updateValue };
          return updatedProduct;
        }
      });

      expect(await controller.updateProduct(mockedData)).toStrictEqual(
        mockedData,
      );
      expect(service.updateProduct).toHaveBeenCalledWith(mockedData);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product and return a delete result response', async () => {
      const id = 'f0bb16a8-2ff3-43b3-977b-a19ce8f35064';
      const deleteResult: DeleteProductResponseDTO = {
        raw: [],
        affected: 1,
      };

      jest.spyOn(service, 'deleteProduct').mockImplementation(async () => {
        const index = productArray.findIndex((product) => product.id === id);
        if (index !== -1) {
          productArray.splice(index, 1);
          return deleteResult;
        }
        deleteResult.affected = 0;
        return deleteResult;
      });

      expect(await controller.deleteProduct(id)).toBe(deleteResult);
      expect(service.deleteProduct).toHaveBeenCalledWith(id);
    });
  });
});
