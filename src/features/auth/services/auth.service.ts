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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {}

  login(loginDto: LoginDto): Promise<User> {
    return this.authRepository.login(loginDto);
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
