import {
    Body, Controller,
    Delete, Get, Param,
    ParseUUIDPipe,
    Patch, Post, Query, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HospitalService } from '../services/hospital.service';
import { CreateHospitalDto } from '../dtos/create-hospital.dto';
import { AuthJwt } from '../../auth/decorators/jwt-auth.decorator';
import { PaginationDto } from '../../../global/dtos/pagination.dto';
import { UpdateHospitalDto } from '../dtos/update-hospital.dto';
import { Hospital } from '../entities/hospital.entity';
import { IDeleteResult } from '../../../global/interfaces/delete-result.inteface';

@UseGuards(AuthGuard('jwt'))
@Controller('hospital')
export class HospitalController {
    constructor(private readonly hospitalService: HospitalService) { }

    @Get()
    getAllHospitals(
        @Query() paginationDto: PaginationDto
    ): Promise<Hospital[]> {
        return this.hospitalService.getAllHospitals(paginationDto);
    }

    @Get('/:id')
    getHospitalByID(
        @Param('id', ParseUUIDPipe) hospitalID: string
    ): Promise<Hospital> {
        return this.hospitalService.getHospitalByID(hospitalID);
    }

    @Post()
    createHospital(
        @AuthJwt() user,
        @Body() createHospitalDto: CreateHospitalDto
    ): Promise<Hospital> {
        return this.hospitalService.createHospital(user, createHospitalDto);
    }

    @Patch('/:id')
    updateHospital(
        @Param('id', ParseUUIDPipe) hospitalID: string,
        @Body() updateHospitalDto: UpdateHospitalDto
    ): Promise<Hospital> {
        return this.hospitalService.updateHospital(hospitalID, updateHospitalDto);
    }

    @Delete('/:id')
    deleteHospital(
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<IDeleteResult> {
        return this.hospitalService.deleteHospital(id);
    }
}
