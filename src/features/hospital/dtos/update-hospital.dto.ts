import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateHospitalDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
}