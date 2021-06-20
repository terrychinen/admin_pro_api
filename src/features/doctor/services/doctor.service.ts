import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorRepository } from '../repositories/doctor.repository';
import { CreateDoctorDto } from '../dtos/create-doctor.dto';
import { Doctor } from '../entities/doctor.entity';
import { User } from '../../auth/entities/user.entity';
import { Hospital } from '../../hospital/entities/hospital.entity';
import { UpdateDoctorDto } from '../dtos/update-doctor.dto';
import { IDeleteResult } from '../../../global/interfaces/delete-result.inteface';

@Injectable()
export class DoctorService {
    
    constructor(
        @InjectRepository(DoctorRepository)
        private readonly doctorRepository: DoctorRepository,
    ) { }

    getAllDoctors(): Promise<Doctor[]> {
        return this.doctorRepository.find();
    }

    async getDoctorByID(doctorID: string): Promise<Doctor> {
        const doctor: Doctor = await this.doctorRepository.findOne({ id: doctorID });
        if(!doctor) {
            throw new NotFoundException('Doctor ID not found'); 
        }

        return doctor;
    }

    async createDoctor(
        user: User,
        hospital: Hospital,
        createDoctorDto: CreateDoctorDto
    ): Promise<Doctor> {
        return this.doctorRepository.createDoctor(user, hospital, createDoctorDto);
    }

    async updateDoctor(
        doctorID: string,
        updateDoctorDto: UpdateDoctorDto
    ): Promise<Doctor> {
        const { name } = updateDoctorDto;
        const doctor: Doctor = await this.getDoctorByID(doctorID);
        doctor.name = name;

        return this.doctorRepository.save({
            id: doctorID,
            doctor
        }).catch((err) => {
            throw new InternalServerErrorException(err);
        });       
    }

    deleteDoctor(id: string): Promise<IDeleteResult> {
        return this.doctorRepository.delete(id).then((res) => {
            let deleteResult: IDeleteResult;

            if (res.affected >= 1) {
                return deleteResult = {
                    ok: true,
                    message: 'Doctor deleted'
                };
            }

            return deleteResult = {
                ok: false,
                message: 'Ups, something went wrong'
            };


        }).catch((err) => {
            throw new InternalServerErrorException(err);
        });
    }
}