import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { TaskModule } from './task/task.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(typeOrmConfig), TasksModule, TaskModule, AuthModule],
  controllers: [AuthController],
})
export class AppModule {}
