import { TestingModule, Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';

class MockRepository {}

const users: User[] = [
  {
    firstname: 'John',
    lastname: 'Doe',
    username: 'admin',
    userpassword: 'admin',
    role: 'admin',
    id: 'b5b37713-b524-4ea8-a022-61efbc720006',
  },
  {
    firstname: 'Erick',
    lastname: 'Krueger',
    username: 'auditor',
    userpassword: 'auditor',
    role: 'auditor',
    id: '3108834d-30df-40e4-8689-be9ac8e1ac19',
  },
  {
    firstname: 'Jivan',
    lastname: 'Diaz',
    username: 'guest',
    userpassword: 'guest',
    role: 'guest',
    id: '0d0b2171-8f1c-42dc-9bac-e96f436258ed',
  },
];

const username = 'admin';

describe('Users in Authentication Microservice', () => {
  let controller: UsersController;
  let service: UsersService;
  let repository: MockRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
      ],
      exports: [UsersService],
    }).compile();

    controller = moduleRef.get<UsersController>(UsersController);
    service = moduleRef.get<UsersService>(UsersService);
    repository = moduleRef.get<MockRepository>(getRepositoryToken(User));
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

  it('should be defined - Repository', () => {
    expect(repository).toBeDefined();
  });

  describe('username', () => {
    expect(username).not.toBe('');
  });

  describe('getUserByUsername', () => {
    it('should get user by username and return it whole data', async () => {
      jest
        .spyOn(service, 'getUserByUsername')
        .mockImplementation((): Promise<User> => {
          const index = users.findIndex((user) => user.username === username);
          if (index !== -1) {
            return Promise.resolve(users[index]);
          }
        });

      expect(await controller.getUserByUsername(username)).toBe(users[0]);
      expect(service.getUserByUsername).toHaveBeenLastCalledWith(username);
    });
  });
});
