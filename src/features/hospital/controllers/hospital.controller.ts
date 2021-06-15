import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HospitalService } from '../services/hospital.service';
import { CreateHospitalDto } from '../dtos/create-hospital.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('hospital')
export class HospitalController {
    constructor(private readonly hospitalService: HospitalService) {}

    @Get()
    getAllHospitals() {
        return this.hospitalService.getAllHospitals();    
    }

    @Get('/:id')
    getHospitalByID(@Param('id') id: string) {
        return this.hospitalService.getHospitalByID(id);
    }

    @Post()
    createHospital(@Body() createHospitalDto: CreateHospitalDto) {
        return this.hospitalService.createHospital(createHospitalDto);
    }

    @Patch()
    updateHospital() {
        return this.hospitalService.updateHospital();
    }

    @Delete('/:id')
    deleteHospital(@Param('id') id: string) {
        return this.hospitalService.deleteHospital(id);
    }
}
