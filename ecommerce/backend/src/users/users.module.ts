import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({
        secret: process.env.JWT_SECRET_BACKEND_E || 'your-secret-key',
        signOptions: { expiresIn: '1h' },
      })],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
