import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoctorService } from '../services/doctor.service';
import { CreateDoctorDto } from '../dtos/create-doctor.dto';
import { AuthJwt } from '../../auth/decorators/jwt-auth.decorator';
import { HospitalService } from '../../hospital/services/hospital.service';
import { Hospital } from '../../hospital/entities/hospital.entity';
import { UpdateDoctorDto } from '../dtos/update-doctor.dto';
import { IDeleteResult } from '../../../global/interfaces/delete-result.inteface';
import { Doctor } from '../entities/doctor.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('doctor')
export class DoctorController {

    constructor(
        private readonly doctorService: DoctorService,
        private readonly hospitalService: HospitalService
    ) {}
    
    @Get()
    getAllDoctors(): Promise<Doctor[]> {
        return this.doctorService.getAllDoctors();
    }

    @Get('/:id')
    getDoctorByID(@Param('id') doctorID: string): Promise<Doctor> {
        return this.doctorService.getDoctorByID(doctorID);
    }

    @Post()
    async createDoctor(
        @AuthJwt() user,
        @Body() createDoctorDto: CreateDoctorDto
    ): Promise<Doctor> {
        const hospital: Hospital = await this.getHospitalByID(createDoctorDto.hospitalID);
        return this.doctorService.createDoctor(user, hospital, createDoctorDto);
    }

    @Patch('/:id')
    updateDoctor(
        @Param('id') doctorID,
        @Body() updateDoctorDto: UpdateDoctorDto
    ): Promise<Doctor> {
        return this.doctorService.updateDoctor(doctorID, updateDoctorDto);
    }

    @Delete(':/id')
    deleteDoctor(
        @Param('id') id
    ): Promise<IDeleteResult> {
        return this.doctorService.deleteDoctor(id);
    }

    getHospitalByID(hospitalID: string): Promise<Hospital> {
        return this.hospitalService.getHospitalByID(hospitalID);
    }
}
