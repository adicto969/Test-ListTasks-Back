import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtConstants } from 'src/constants/jwt-constants';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UserSchema } from 'src/schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '2d' }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtAuthGuard]
})
export class UsersModule {}
