import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '../entities/user.entity';
import { IAuthResponse } from '../interfaces/auth-response.interface';
import { UpdateTokenDto } from '../dtos/update-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<IAuthResponse> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.createUser(registerDto);
  }

  @Post('/token/refresh')
  refreshToken(@Body() updateTokenDto: UpdateTokenDto): Promise<IAuthResponse> {
    return this.authService.refreshToken(updateTokenDto);
  }
}
