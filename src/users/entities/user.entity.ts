import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Roles } from "../dto/create-user.dto";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    FirstName:string;

    @Prop()
    LastName:string;

    @Prop()
    Email:string;

    @Prop()
    Password:string;

    @Prop()
    Role:Roles[]
}

export const UserSchema = SchemaFactory.createForClass(User);