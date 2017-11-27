"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// Entities
const plumbers_entity_1 = require("../src/entities/plumbers.entity");
const schedules_entity_1 = require("../src/entities/schedules.entity");
let connection = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'shannon',
    database: 'innogy2017',
    entities: [
        plumbers_entity_1._plumberEntity,
        schedules_entity_1._scheduleEntity
    ],
    synchronize: true,
};
exports.default = connection;
