import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTokenDto {
    @IsString()
    @IsNotEmpty()
    readonly token: string;
}