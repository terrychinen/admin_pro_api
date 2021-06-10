import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
