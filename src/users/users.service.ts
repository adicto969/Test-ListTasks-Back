import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserUpdateDto } from 'src/dto/user-update.dto';
import { UserDto } from 'src/dto/user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthDto } from 'src/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from 'src/dto/auth-response.dto';

@Injectable()
export class UsersService {

    constructor(
        private jwtService: JwtService,
        @InjectModel('User') private userModel: Model<UserDocument>
    ) {}

    async auth(authDto: AuthDto): Promise<AuthResponseDto> {
        const user = await this.userModel.findOne({ email: authDto.email }).orFail(() => {
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
        }).exec();

        if (!(await bcrypt.compare(authDto.password, user.password))) {
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        return new AuthResponseDto(this.jwtService.sign(payload));
    }

    async get(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getById(id: string) {
        const user = this.userModel.findById(id).orFail(() => {
            throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
        }).exec();

        return user;
    }

    async create(userDto: UserDto): Promise<User> {

        userDto.password = await bcrypt.hash(userDto.password, 10);
        
        const createdUser = new this.userModel(userDto);

        return createdUser.save();
    }

    async update(id: string, userDto: UserUpdateDto): Promise<User> {
        const user = this.userModel.findById(id).orFail(() => {
            throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
        });

        if (userDto.password) {
            userDto.password = await bcrypt.hash(userDto.password, 10);
        }

        await user.update(userDto).exec();

        return this.userModel.findById(id).exec();
    }

    async delete(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id).orFail(() => {
            throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
        }).exec();

        return;
    }
}
