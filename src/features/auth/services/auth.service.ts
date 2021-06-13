import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../repositories/auth.repository';
import { User } from '../entities/user.entity';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { IAuthResponse } from '../interfaces/auth-response.interface';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto): Promise<IAuthResponse> {
    const isAuth = await this.authRepository.login(loginDto);
    if (isAuth) {
      const payload: IJwtPayload = { email: loginDto.email };
      const accessToken: string = this.jwtService.sign(payload);

      const authResponse: IAuthResponse = {
        token: accessToken
      };

      return authResponse;
    }
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const { email } = registerDto;

    const findEmail = await this.authRepository.findOne({ email })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });

    if (findEmail) {
      throw new ConflictException('Email already exists');
    }

    return this.authRepository.createUser(registerDto);
  }
}
