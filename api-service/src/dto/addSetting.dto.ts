import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { setting } from "src/entity/setting.entity";


export class addSetting implements Partial<setting>{

    @IsArray()
    currencies?: string[] | undefined;

    @IsNotEmpty()
    @IsNumber()
    percent?: number | undefined;

    @IsNotEmpty()
    @IsString()
    volume?: string | undefined;

    
}