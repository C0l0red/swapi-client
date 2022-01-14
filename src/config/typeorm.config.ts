import { ConfigService } from './config.service';

const TypeOrmConfig = new ConfigService().createTypeOrmOptions();

export default TypeOrmConfig;
