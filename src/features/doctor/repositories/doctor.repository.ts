import { EntityRepository, Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateDoctorDto } from '../dtos/create-doctor.dto';
import { Hospital } from '../../hospital/entities/hospital.entity';
import { User } from '../../auth/entities/user.entity';

@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> {
    async createDoctor(
        user: User,
        hospital: Hospital,
        createDoctorDto: CreateDoctorDto
    ) {
        const { name, image } = createDoctorDto;

        const doctor: Doctor = this.create({
            name,
            image,
            user,
            hospital
        });

        delete doctor.hospital.user;
        delete doctor.user.email;
        delete doctor.user.image;
        delete doctor.user.role;
        delete doctor.user.google;        

        return await this.save(doctor).catch((err) => {
            if(err.code === '23505') {
                throw new ConflictException(`${doctor.name} is already exists`);
            }
            throw new InternalServerErrorException(err);
        });
    }
}