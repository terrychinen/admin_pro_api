import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './features/auth/auth.module';
import { HospitalModule } from './features/hospital/hospital.module';
import { DoctorModule } from './features/doctor/doctor.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    HospitalModule,
    DoctorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
