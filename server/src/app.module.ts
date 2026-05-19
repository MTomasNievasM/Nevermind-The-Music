import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DATABASE_PATH || 'database.sqlite', // Configurable para persistencia en producción
      entities: [User],
      synchronize: true, // Auto-crea las tablas (ideal para desarrollo)
    }),
    AuthModule,
  ],
})
export class AppModule {}
