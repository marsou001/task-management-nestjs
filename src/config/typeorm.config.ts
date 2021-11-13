import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: process.env.DATABASE_TYPE as 'postgres',
    host: process.env.DATABASE_HOST.toString(),
    port: parseInt(process.env.DATABASE_PORT.toString()),
    username: process.env.DATABASE_USERNAME.toString(),
    password: process.env.DATABASE_PASSWORD.toString(),
    database: process.env.DATABASE_NAME.toString(),
    autoLoadEntities: true,
    synchronize: true,
};
