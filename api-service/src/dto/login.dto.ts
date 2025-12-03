import { IsNotEmpty, IsString } from "class-validator";


export class loginDto{

    @IsString()
    @IsNotEmpty()
    readonly userName : string

    @IsString()
    @IsNotEmpty()
    readonly password: string

    @IsString()
    @IsNotEmpty()
    readonly firstName : string

    @IsString()
    @IsNotEmpty()
    readonly lastName: string

    @IsString()
    @IsNotEmpty()
    readonly phoneNumber : string

}


export class registerDto{
    @IsString()
    @IsNotEmpty()
    readonly userName : string

    @IsString()
    @IsNotEmpty()
    readonly password: string

    @IsString()
    @IsNotEmpty()
    readonly firstName : string

    @IsString()
    @IsNotEmpty()
    readonly lastName: string

    @IsString()
    @IsNotEmpty()
    readonly phoneNumber : string

}