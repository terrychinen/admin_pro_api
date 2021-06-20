import { MinLength, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDoctorDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
}