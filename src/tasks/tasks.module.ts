import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtConstants } from 'src/constants/jwt-constants';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { TaskSchema } from 'src/schemas/task.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: JwtConstants.secret,
            signOptions: { expiresIn: '2d' }
        })
    ],
    controllers: [TasksController],
    providers: [
        TasksService,
        JwtAuthGuard
    ]
})
export class TasksModule {}
