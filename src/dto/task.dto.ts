import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsString } from "class-validator";

export class TaskDto {

    @IsString()
    name: string;

    @Type(() => Date)
    @IsDate()
    expirationDate: Date;

    @IsBoolean()
    completed: boolean;
}