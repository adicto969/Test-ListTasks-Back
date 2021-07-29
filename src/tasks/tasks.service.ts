import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskUpdateDto } from 'src/dto/task-update.dto';
import { TaskDto } from 'src/dto/task.dto';
import { Task, TaskDocument } from 'src/schemas/task.schema';

@Injectable()
export class TasksService {

    constructor(@InjectModel('Task') private taskModel: Model<TaskDocument>) {}

    async get(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async getById(id: string) {
        const task = this.taskModel.findById(id).orFail(() => {
            throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);    
        }).exec();
        
        return task;
    }

    async create(taskDto: TaskDto): Promise<Task> {
        const createdTask = new this.taskModel(taskDto);

        return createdTask.save();
    }
    
    async update(id: string, taskDto: TaskUpdateDto): Promise<Task> {
        const task = this.taskModel.findById(id).orFail(() => {
            throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);    
        });

        await task.update(taskDto).exec();

        return this.taskModel.findById(id).exec();
    }

    async delete(id: string): Promise<void> {
        await this.taskModel.findByIdAndDelete(id).orFail(() => {
            throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);    
        }).exec();

        return;
    }
}
