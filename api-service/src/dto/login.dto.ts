import { IsNotEmpty, IsString } from "class-validator";


export class loginDto{

    @IsString()
    @IsNotEmpty()
    readonly userName : string

    @IsString()
    @IsNotEmpty()
    readonly password: string

}