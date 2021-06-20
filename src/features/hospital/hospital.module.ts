import { Module } from '@nestjs/common';
import { HospitalController } from './controllers/hospital.controller';
import { HospitalService } from './services/hospital.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalRepository } from './repositories/hospital.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([HospitalRepository]),
  ],
  exports: [
    HospitalService
  ],
  controllers: [    
    HospitalController
  ],
  providers: [HospitalService]
})
export class HospitalModule { }
