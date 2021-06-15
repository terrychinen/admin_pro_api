import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './features/auth/auth.module';
import { HospitalModule } from './features/hospital/hospital.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    HospitalModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
