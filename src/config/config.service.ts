import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  private readonly env: Record<string, any> = process.env;

  getValue(key: string, throwOnMissing = true) {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`Missing Environment variable ${key}`);
    }
    return value;
  }
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: this.getValue('DB_PORT'),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_NAME'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'migration',
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }
}
