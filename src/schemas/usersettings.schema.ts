import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose';

@Schema()
export class UserSettings{
    @Prop({required: false})
    recievedNotification?: boolean;

    @Prop({required: false})
    recievedEmails?: boolean;

    @Prop({required:false})
    recievedSMS?: boolean;
}

export const userSettingSchema = SchemaFactory.createForClass(UserSettings)