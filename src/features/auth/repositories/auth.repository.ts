import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;

    const user: User = await this.findOne({ email }).catch((err) => {
      throw new InternalServerErrorException(err);
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    }

    throw new UnauthorizedException('email or password does not exists');
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const { name, email, password, image, role, google } = registerDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: User = this.create({
      name,
      email,
      password: hashedPassword,
      image,
      role,
      google,
    });

    return await this.save(user).catch((err) => {
      throw new InternalServerErrorException(err);
    });
  }
}
