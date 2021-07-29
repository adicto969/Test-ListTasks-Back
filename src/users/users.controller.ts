import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponseDto } from 'src/dto/auth-response.dto';
import { AuthDto } from 'src/dto/auth.dto';
import { UserUpdateDto } from 'src/dto/user-update.dto';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @UseGuards(AuthGuard()) 
    @Get()
    async get(): Promise<User[]> {
        return await this.userService.get();
    }

    @UseGuards(AuthGuard()) 
    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
        return await this.userService.getById(id);
    }

    @UseGuards(AuthGuard()) 
    @Put(':id')
    async update(@Param('id') id: string, @Body() user: UserUpdateDto): Promise<User> {
        return await this.userService.update(id, user);
    }

    @UseGuards(AuthGuard()) 
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return await this.userService.delete(id);
    }

    @Post('/login')
    async auth(@Body() auth: AuthDto): Promise<AuthResponseDto> {
        return await this.userService.auth(auth);
    }

    @Post()
    async create(@Body() user: UserDto): Promise<User> {
        return await this.userService.create(user);
    }
}
