import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalRepository } from '../repositories/hospital.repository';
import { CreateHospitalDto } from '../dtos/create-hospital.dto';
import { User } from '../../auth/entities/user.entity';
import { Hospital } from '../entities/hospital.entity';
import { PaginationDto } from '../../../global/dtos/pagination.dto';
import { UpdateHospitalDto } from '../dtos/update-hospital.dto';
import { IDeleteResult } from '../../../global/interfaces/delete-result.inteface';

@Injectable()
export class HospitalService {

    constructor(
        @InjectRepository(HospitalRepository)
        private readonly hospitalRepository: HospitalRepository
    ) { }

    async getAllHospitals(paginationDto: PaginationDto): Promise<Hospital[]> {
        const { skip, take } = paginationDto;

        const hospitals: Hospital[] = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .select(['hospital.id', 'hospital.name', 'user.id', 'user.name'])
            .innerJoin('hospital.user', 'user')
            .skip(skip)
            .take(take)
            .getMany().catch((err) => {
                throw new InternalServerErrorException(err);
            });

        return hospitals;
    }

    async getHospitalByID(hospitalID: string): Promise<Hospital> {
        const findHospital: Hospital = await this.hospitalRepository.findOne({ id: hospitalID });

        if (!findHospital) {
            throw new NotFoundException('Hospital ID not found');
        }

        const hospital: Hospital = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .select(['hospital.id', 'hospital.name', 'user.id', 'user.name'])
            .innerJoin('hospital.user', 'user')
            .where('hospital.id = :id', { id: hospitalID })
            .getOne()
            .catch((err) => {
                throw new InternalServerErrorException(err);
            });

        return hospital;
    }

    createHospital(
        user: User,
        createHospitalDto: CreateHospitalDto
    ): Promise<Hospital> {
        return this.hospitalRepository.createHospital(user, createHospitalDto);
    }

    async updateHospital(
        hospitalID: string,
        updateHospitalDto: UpdateHospitalDto
    ): Promise<Hospital> {
        const { name } = updateHospitalDto;

        const hospital: Hospital = await this.getHospitalByID(hospitalID);
        hospital.name = name;

        return this.hospitalRepository.save({
            id: hospitalID,
            hospital
        }).catch((err) => {
            throw new InternalServerErrorException(err);
        });
    }

    deleteHospital(id: string): Promise<IDeleteResult> {
        return this.hospitalRepository.delete(id).then((res) => {
            let deleteResult: IDeleteResult;

            if (res.affected >= 1) {
                return deleteResult = {
                    ok: true,
                    message: 'Hospital deleted'
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