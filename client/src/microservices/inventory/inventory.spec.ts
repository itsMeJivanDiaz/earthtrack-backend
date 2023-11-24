/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestingModule, Test } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { ProductModel } from './interfaces/inventory-product.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

class MockClientProxy {
  send(pattern: { cmd: string }, data: ProductModel) {}
}

describe('Inventory', () => {
  const product: ProductModel = {
    name: 'Test Product',
    description: 'This is a test product, do not use as real world value',
    category: 'Test',
    price: 1.99,
  };

  const result = {
    ...product,
    id: expect.any(String),
  };

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
          provide: 'INVENTORY_SERVICE',
          useClass: MockClientProxy,
        },
      ],
    }).compile();

    controller = moduleRef.get<InventoryController>(InventoryController);
    service = moduleRef.get<InventoryService>(InventoryService);
    clientProxy = moduleRef.get<MockClientProxy>('INVENTORY_SERVICE');
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

  describe('ProductModel', () => {
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
      const cmd = { cmd: 'add_product' };

      jest.spyOn(service, 'addProduct').mockImplementation(() => <any>result);
      jest.spyOn(clientProxy, 'send').mockImplementation(() => result);

      expect(controller.addProduct(product)).toBe(result);
      expect(clientProxy.send(cmd, product)).toMatchObject(result);
      expect(clientProxy.send).toHaveBeenCalledWith(cmd, product);
    });
  });
});
