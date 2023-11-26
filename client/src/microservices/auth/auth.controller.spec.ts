import { TestingModule, Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDTO, AuthUserDTO } from './auth.dto';

class MockClientProxy {}

const authentication: AuthDTO = {
  username: 'admin',
  userpassword: 'admin',
};

const users: AuthUserDTO[] = [
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

const access_token: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ';

describe('Authentication', () => {
  let controller: AuthController;
  let service: AuthService;
  let clientProxy: MockClientProxy;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: 'AUTH_MICROSERVICE',
          useClass: MockClientProxy,
        },
      ],
    }).compile();

    controller = moduleRef.get<AuthController>(AuthController);
    service = moduleRef.get<AuthService>(AuthService);
    clientProxy = moduleRef.get<MockClientProxy>('AUTH_MICROSERVICE');
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

  it('shoud be defined - ClientProxy', () => {
    expect(clientProxy).toBeDefined();
  });

  describe('Authenticaton DTO', () => {
    it('should have a username', () => {
      expect(authentication.username).not.toBe('');
    });

    it('should have a userpassword', () => {
      expect(authentication.userpassword).not.toBe('');
    });
  });

  describe('signIn', () => {
    it('should find the user and return an access token', () => {
      jest.spyOn(service, 'signIn').mockImplementation(() => {
        const index = users.findIndex(
          (user) =>
            user.username === authentication.username &&
            user.userpassword === authentication.userpassword,
        );
        if (index !== -1) {
          return <any>access_token;
        }
      });

      expect(controller.signIn(authentication)).toBe(access_token);
      expect(service.signIn).toHaveBeenCalledWith(authentication);
    });
  });
});
