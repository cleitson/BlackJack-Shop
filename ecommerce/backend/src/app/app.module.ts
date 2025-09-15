import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [UsersModule, PrismaModule, AuthModule, JwtModule.register({
        secret: process.env.JWT_SECRET || 'your-secret-key',
        signOptions: { expiresIn: '1h' },
      })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('user');
  }
}
