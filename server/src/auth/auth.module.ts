import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'super-secreto-tienda-musica-1234', // En producción iría en un .env
      signOptions: { expiresIn: '1d' }, // El token dura 1 día
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
