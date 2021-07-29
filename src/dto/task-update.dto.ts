import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsString, IsOptional } from "class-validator";

export class TaskUpdateDto {
    
    @IsString()
    @IsOptional()
    name: string;
    
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    expirationDate: Date;

    @IsBoolean()
    @IsOptional()
    completed: boolean;
}