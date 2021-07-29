import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthToken } from 'src/dto/auth-token.dto';
import { TaskUpdateDto } from 'src/dto/task-update.dto';
import { TaskDto } from 'src/dto/task.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { Task } from 'src/schemas/task.schema';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService) {}

    @UseGuards(AuthGuard()) 
    @Get()
    async get(@Req() req: any): Promise<Task[]> {
        //<AuthToken>req.user;
        return await this.taskService.get();;
    }

    @UseGuards(AuthGuard()) 
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Task> {
        return await this.taskService.getById(id);
    }

    @UseGuards(AuthGuard()) 
    @Post()
    async create(@Body() task: TaskDto): Promise<Task> {
        return await this.taskService.create(task);
    }

    @UseGuards(AuthGuard()) 
    @Put(':id')
    async update(@Param('id') id: string, @Body() task: TaskUpdateDto): Promise<Task> {
        return await this.taskService.update(id, task);
    }

    @UseGuards(AuthGuard()) 
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return await this.taskService.delete(id);
    }
}
