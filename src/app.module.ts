import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TechnologyModule } from './technology/technology.module';
import { StreetModule } from './street/street.module';
import { CommentModule } from './comment/comment.module';
import DatabaseLogger from './utils/database_logger';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/entities/**/*.entity.js'],
      synchronize: Boolean(process.env.DB_SYNC),
      namingStrategy: new SnakeNamingStrategy(),
      logging: Boolean(process.env.PRODUCTION) === false,
      logger: new DatabaseLogger(),
    }),
    AuthModule,
    UsersModule,
    TechnologyModule,
    StreetModule,
    CommentModule,
  ],
})
export class AppModule {}
