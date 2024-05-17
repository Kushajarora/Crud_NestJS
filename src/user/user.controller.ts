import { Body, Controller, Post,Get, Param, HttpException,Patch, Delete, UsePipes, ValidationPipe  } from "@nestjs/common";
import { UserService } from './user.service'
import { createUserDto } from "./dto/user.dto";
import { updateUserDto } from './dto/update.dto';

import mongoose from 'mongoose';

@Controller('users')
export class UserController{
    constructor(private userService: UserService){}
    
    @Post('')
    // @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: createUserDto){
        console.log(createUserDto)
        return this.userService.createUser(createUserDto);
    }
    
    @Get('')
    getAllUser(){
        return this.userService.getAllUser();
    }

    @Get(':id')
    async getUserByID(@Param('id') id: string){
        const isValid=mongoose.Types.ObjectId.isValid(id)
        if (!isValid) throw new HttpException("Incorrect ID",404)
        const findUser = await this.userService.getUniqueUser(id);
        if(!findUser) throw new HttpException('User Not Found',404);
        return findUser;
    }

    @Patch(':id')
    updateUser(@Param('id') id:string, @Body() updateUserDto: updateUserDto){
        const isValid=mongoose.Types.ObjectId.isValid(id)
        if (!isValid){
            throw new HttpException("Incorrect ID",404);
        }
        return this.userService.updateUser(id,updateUserDto);
    }
    @Delete(":id")
    deleteUser(@Param('id') id:string){
        const isValid=mongoose.Types.ObjectId.isValid(id)
        if (!isValid){
            throw new HttpException("Incorrect ID",404);
        }
        return this.userService.deleteUser(id)
    }
} 