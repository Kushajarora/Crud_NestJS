import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserScheme } from 'src/schemas/schemas.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSettings, userSettingSchema } from 'src/schemas/usersettings.schema';

@Module({
    imports:[
        MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserScheme
        },
        {
            name: UserSettings.name,
            schema: userSettingSchema
        }
    ])
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
