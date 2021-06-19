import { IsNumberString } from "class-validator";

export class PaginationDto {
    @IsNumberString()
    skip: number = 0;

    @IsNumberString()
    take: number = 10;
}