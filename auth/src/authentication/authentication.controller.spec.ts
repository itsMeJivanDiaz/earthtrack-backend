import { JwtService } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { AuthDTO } from './authentication.dto';

const authData: AuthDTO = {
  username: 'admin',
  userpassword: 'admin',
};

describe('Authentication', () => {
  let controller: AuthenticationController;
  let service: AuthenticationService;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        AuthenticationService,
        JwtService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = moduleRef.get<AuthenticationController>(
      AuthenticationController,
    );
    service = moduleRef.get<AuthenticationService>(AuthenticationService);
    userService = moduleRef.get<UsersService>(UsersService);
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

  it('should be defined - JwtService', () => {
    expect(jwtService).toBeDefined();
  });

  describe('AuthDTO', () => {
    it('should have a username', () => {
      expect(authData.username).not.toBe('');
    });

    it('should have a userpassword', () => {
      expect(authData.userpassword).not.toBe('');
    });
  });

  describe('signIn', () => {
    it('should sign in and return access token', async () => {
      const mockedAccessToken = 'mocked_access_token';

      const mockedUser = {
        firstname: 'John',
        lastname: 'Doe',
        username: 'admin',
        role: 'admin',
        id: 'b5b37713-b524-4ea8-a022-61efbc720006',
      };

      const mockedGetUserResult = {
        ...mockedUser,
        userpassword: authData.userpassword,
      };

      jest
        .spyOn(userService, 'getUserByUsername')
        .mockResolvedValue(mockedGetUserResult);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(mockedAccessToken);
      jest.spyOn(service, 'signIn').mockImplementation(async () => {
        const user = await userService.getUserByUsername(authData.username);
        return await jwtService.signAsync(user);
      });

      expect(await controller.signIn(authData)).toBe(mockedAccessToken);
      expect(service.signIn).toHaveBeenCalledWith(authData);
      expect(userService.getUserByUsername).toHaveBeenLastCalledWith(
        authData.username,
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith(mockedGetUserResult);
    });
  });
});
