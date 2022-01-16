import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Environment } from '../common/enums/environment.enum';

// Loads .env file if exists
dotenv.config();

// Handles all Config data using environment variables and hard-coded values
@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  private readonly env: Record<string, any> = process.env;

  // Gets a value from environment variables, throws an Error if missing
  getValue(key: string, throwOnMissing = true) {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`Missing Environment variable ${key}`);
    }
    return value;
  }

  // Checks if App Environment is in Production
  // Throws an error if NODE_ENV environment variable is wrong
  isProduction(): boolean {
    const environment: Environment = this.getValue('NODE_ENV');

    if (!(environment in Environment))
      throw new Error(`${environment} is not a valid Environment option`);

    return environment === Environment.production;
  }

  // Creates configurations for TypeORM
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const extra = {
      ssl: {
        rejectUnauthorized: false,
      },
    };
    return {
      type: 'postgres',
      url: this.getValue('DATABASE_URL'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'migration',
      ssl: this.isProduction(),
      cli: {
        migrationsDir: 'src/migrations',
      },
      extra: this.isProduction() ? extra : {},
    };
  }
}
