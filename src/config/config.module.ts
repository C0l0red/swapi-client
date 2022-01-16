import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

// Module for all configurations
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
