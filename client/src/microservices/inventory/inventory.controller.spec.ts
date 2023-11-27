/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestingModule, Test } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  DeleteProductResponseDTO,
  ProductDTO,
  SearchProductResponseDTO,
} from 'src/microservices/inventory/inventory-product.dto';

class MockClientProxy {}

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
    category: 'Apple',
    price: 2,
  },
  {
    id: '36c2bef6-065a-4842-89c1-194cb1e31c94',
    name: 'Test Product 2',
    description:
      'This is a test product number 2, do not use as real world value',
    category: 'Android',
    price: 2.55,
  },
];

describe('Inventory', () => {
  let controller: InventoryController;
  let service: InventoryService;
  let clientProxy: MockClientProxy;
  let configService: ConfigService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        InventoryService,
        JwtService,
        ConfigService,
        {
          provide: 'INVENTORY_MICROSERVICE',
          useClass: MockClientProxy,
        },
      ],
    }).compile();

    controller = moduleRef.get<InventoryController>(InventoryController);
    service = moduleRef.get<InventoryService>(InventoryService);
    clientProxy = moduleRef.get<MockClientProxy>('INVENTORY_MICROSERVICE');
    configService = moduleRef.get<ConfigService>(ConfigService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined - Controller', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined - Service', () => {
    expect(service).toBeDefined();
  });

  it('should be defined - ClientProxy', () => {
    expect(clientProxy).toBeDefined();
  });

  it('should be defined - ConfigService', () => {
    expect(configService).toBeDefined();
  });

  it('should be defined - JwtService', () => {
    expect(jwtService).toBeDefined();
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

  describe('addProduct', () => {
    it('it should add product and return the product with an id', () => {
      const expectedResult = productArray[0];

      jest.spyOn(service, 'addProduct').mockReturnValue(<any>expectedResult);

      expect(controller.addProduct(product)).toBe(expectedResult);
      expect(service.addProduct).toHaveBeenCalledWith(product);
    });
  });

  describe('getProducts', () => {
    it('should return an array of product', () => {
      jest.spyOn(service, 'getProducts').mockReturnValue(<any>productArray);

      expect(controller.getProducts()).toBe(productArray);
      expect(service.getProducts).toHaveBeenCalledWith();
    });
  });

  describe('getProductsByCategory', () => {
    it('should return an array of product equal to a category', () => {
      const category = 'Android';
      const page = 1;
      const limit = 10;
      const expectedResult = { data: [productArray[1]], total: 1 };

      jest.spyOn(service, 'getProductsByCategory').mockImplementation(() => {
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
        return <any>respose;
      });

      expect(
        controller.getProductsByCategory(category, page, limit),
      ).toStrictEqual(expectedResult);
      expect(service.getProductsByCategory).toHaveBeenCalledWith({
        category,
        page,
        limit,
      });
    });
  });

  describe('searchProducts', () => {
    it('should return an array of product base on a query string', () => {
      const query = 'Test Product';
      const page = 1;
      const limit = 10;
      const expectedResult = { data: productArray, total: 2 };

      jest.spyOn(service, 'searchProducts').mockImplementation(() => {
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
        return <any>respose;
      });

      expect(controller.searchProducts(query, page, limit)).toStrictEqual(
        expectedResult,
      );
      expect(service.searchProducts).toHaveBeenCalledWith({
        query,
        page,
        limit,
      });
    });
  });

  describe('getProductById', () => {
    it('should return product selected by id', () => {
      const id = '36c2bef6-065a-4842-89c1-194cb1e31c94';
      const productToFind = productArray.find((product) => product.id === id);

      jest.spyOn(service, 'getProductById').mockReturnValue(<any>productToFind);

      expect(controller.getProductById(id)).toBe(productToFind);
      expect(service.getProductById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateProduct', () => {
    it('should update product and return a product with the id', () => {
      const id = '36c2bef6-065a-4842-89c1-194cb1e31c94';
      const updateValue = {
        name: 'Test Product 1 Updated',
        description:
          'This is a test product number 1, do not use as real world value',
        category: 'Test 1',
        price: 2,
      };
      const expectedResult = { ...updateValue, id };

      jest.spyOn(service, 'updateProduct').mockImplementation(() => {
        const index = productArray.findIndex((product) => product.id === id);
        if (index !== -1) {
          const updatedProduct = { ...productArray[index], ...updateValue };
          return <any>updatedProduct;
        }
      });

      expect(controller.updateProduct(id, updateValue)).toStrictEqual(
        expectedResult,
      );
      expect(service.updateProduct).toHaveBeenCalledWith(id, updateValue);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product and return a delete result response', () => {
      const id = 'f0bb16a8-2ff3-43b3-977b-a19ce8f35064';
      const deleteResult: DeleteProductResponseDTO = {
        raw: [],
        affected: 1,
      };

      jest.spyOn(service, 'deleteProduct').mockImplementation(() => {
        const index = productArray.findIndex((product) => product.id === id);
        if (index !== -1) {
          productArray.splice(index, 1);
          return <any>deleteResult;
        }
        deleteResult.affected = 0;
        return <any>deleteResult;
      });

      expect(controller.deleteProduct(id)).toBe(deleteResult);
      expect(service.deleteProduct).toHaveBeenCalledWith(id);
    });
  });
});
