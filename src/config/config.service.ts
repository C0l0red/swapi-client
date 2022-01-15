import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Environment } from '../common/enums/environment.enum';

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

  isProduction(): boolean {
    const environment: Environment = this.getValue('NODE_ENV');

    if (!(environment in Environment))
      throw new Error(`${environment} is not a valid Environment option`);

    return environment === Environment.production;
  }

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.getValue('DATABASE_URL'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'migration',
      cli: {
        migrationsDir: 'src/migrations',
      },
      ssl: this.isProduction(),
    };
  }
}
