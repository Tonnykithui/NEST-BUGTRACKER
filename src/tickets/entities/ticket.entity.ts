import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Levels, TicketStatus } from "../dto/create-ticket.dto";
import mongoose, { Document } from 'mongoose';
import { User } from "src/users/entities/user.entity";
import { Project } from "src/projects/entities/project.entity";

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
    @Prop()
    Title:string;
    
    @Prop()	 
    Description:string
    
    @Prop()	 
    Status:TicketStatus[]
    
    @Prop()	 
    Priority:Levels[];
    
    @Prop()	 
    DateRaised:Date;
    
    @Prop()	 
    CloseDate:Date;
    
    @Prop()	 
    Severity:Levels[]

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    OwnerId:User;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Project'})
    ProjectId:Project;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]})
    Assignee:User;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);