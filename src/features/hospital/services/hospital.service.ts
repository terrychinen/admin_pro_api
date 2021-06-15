import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HospitalRepository } from '../repositories/hospital.repository';
import { CreateHospitalDto } from '../dtos/create-hospital.dto';

@Injectable()
export class HospitalService {
    
    constructor(
        @InjectRepository(HospitalRepository)
        private readonly hospitalRepository: HospitalRepository
    ) {}

    getAllHospitals() {
        return this.hospitalRepository.find();
    }

    getHospitalByID(id: string) {
        return {
            ok: true,
            message: `Get hospital with id ${id}`
        }
    }

    createHospital(createHospitalDto: CreateHospitalDto) {       
        return {
            ok: true,
            message: 'Create hospital'
        }
    }

    updateHospital() {
        return {
            ok: true,
            message: 'Update hospital'
        }
    }

    deleteHospital(id: string) {
        return {
            ok: true,
            message: `Delete hospital with id ${id}`
        }
    }
}
