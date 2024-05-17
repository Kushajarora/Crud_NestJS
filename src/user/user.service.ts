import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/schemas.module';
import { Model, set } from 'mongoose';
import { createUserDto } from './dto/user.dto';
import { updateUserDto } from './dto/update.dto';
import { UserSettings } from 'src/schemas/usersettings.schema';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,@InjectModel(UserSettings.name) private userSettingModel: Model<UserSettings>
    ){}
        
        
        async createUser({settings, ...createUserDto}: createUserDto){
            try{
                if(settings){   
                    const newsettings=new this.userSettingModel(settings);
                    console.log(newsettings)
                    const savednewsettings=await newsettings.save()
                    
                    const newUser=new this.userModel({
                        ...createUserDto,
                        settings: savednewsettings._id,
                    })
                    return newUser.save()
                } else{
                    const newUser =new this.userModel(createUserDto)
                    return newUser.save()
                }
            }catch(error){
                if(error.code==="E11000"){
                    throw new Error('Record Already Exist')
                } else{
                    throw error
                }
            }   
        }


        getAllUser(){
            const allUsers= this.userModel.find().populate(['settings','posts']);
            return allUsers
        }
        getUniqueUser(id: string){
            return this.userModel.findById(id).populate('settings');
        }
        updateUser(id: string, updateUserDto:updateUserDto){
            return this.userModel.findByIdAndUpdate(id,updateUserDto,{new: true});
        }
        deleteUser(id: string){
            return this.userModel.findByIdAndDelete(id);
        }
    }
