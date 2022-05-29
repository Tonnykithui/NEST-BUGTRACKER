import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { User } from "src/users/entities/user.entity";
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop()
    Title:string;

    @Prop()
    Description:string;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]})
    Assignee:User[];

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]})
    Creator:User[];
    /* @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Ticket'}]})
    Tickets:Ticket[]; */
}

export const ProjectSchema = SchemaFactory.createForClass(Project);