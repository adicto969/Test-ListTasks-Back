import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TaskDocument = Task & Document;

@Schema()
export class Task {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    expirationDate: Date;

    @Prop({ required: true })
    completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);