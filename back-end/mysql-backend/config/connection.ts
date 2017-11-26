import 'reflect-metadata';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

// Entities
import { _plumberEntity } from '../src/entities/plumbers.entity';
import { _scheduleEntity } from '../src/entities/schedules.entity';

let connection: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'shannon',
    database: 'innogy2017',
    entities: [
        _plumberEntity,
        _scheduleEntity
    ],
    synchronize: true,
};

export default connection;