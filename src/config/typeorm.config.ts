import { ConfigService } from './config.service';

// Gets TypeORM configurations from Config Service for cases where the app isn't
// running
const TypeOrmConfig = new ConfigService().createTypeOrmOptions();

export default TypeOrmConfig;
