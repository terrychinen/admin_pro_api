import { Module } from '@nestjs/common';
import { DoctorService } from './services/doctor.service';
import { DoctorController } from './controllers/doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from './repositories/doctor.repository';
import { HospitalModule } from '../hospital/hospital.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorRepository]),
    HospitalModule
  ],
  providers: [
    DoctorService
  ],
  controllers: [
    DoctorController
  ]
})
export class DoctorModule { }
