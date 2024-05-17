import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateUserSettingsDto{
    @IsOptional()
    @IsBoolean()
    recievedNotifications?:boolean;

    @IsOptional()
    @IsBoolean()
    recievedEmails?:boolean;

    @IsOptional()
    @IsBoolean()
    recievedSMS?:boolean;
}

export class createUserDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @IsOptional()
    displayName?:string;

    @IsOptional()
    @ValidateNested()
    @Type(()=> CreateUserSettingsDto)
    settings?:CreateUserSettingsDto
}