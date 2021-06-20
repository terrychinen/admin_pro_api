import { EntityRepository, Repository } from 'typeorm';
import { Hospital } from '../entities/hospital.entity';
import { CreateHospitalDto } from '../dtos/create-hospital.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User } from '../../auth/entities/user.entity';

@EntityRepository(Hospital)
export class HospitalRepository extends Repository<Hospital> {
    async createHospital(
        user: User, 
        createHospitalDto: CreateHospitalDto
    ): Promise<Hospital> {
        const { name, image } = createHospitalDto;
        const hospital: Hospital = this.create({
            name,
            image,
            user
        });

        return await this.save(hospital).catch((err) => {
            if(err.code === '23505') {
                throw new ConflictException(`${hospital.name} is already exists`);
            }
            throw new InternalServerErrorException(err);
        });
    }
}