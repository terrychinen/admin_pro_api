import { EntityRepository, Repository } from 'typeorm';
import { Hospital } from '../entities/hospital.entity';
import { CreateHospitalDto } from '../dtos/create-hospital.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Hospital)
export class HospitalRepository extends Repository<Hospital> {
    
}