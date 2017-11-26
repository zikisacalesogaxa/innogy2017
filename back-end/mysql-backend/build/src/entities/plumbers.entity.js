"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const schedules_entity_1 = require("./schedules.entity");
let _plumberEntity = class _plumberEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], _plumberEntity.prototype, "ID", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar' }),
    __metadata("design:type", String)
], _plumberEntity.prototype, "First_Name", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar' }),
    __metadata("design:type", String)
], _plumberEntity.prototype, "Last_Name", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar' }),
    __metadata("design:type", String)
], _plumberEntity.prototype, "Username", void 0);
__decorate([
    typeorm_1.Column({ type: 'int' }),
    __metadata("design:type", Number)
], _plumberEntity.prototype, "CellNumber", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar' }),
    __metadata("design:type", String)
], _plumberEntity.prototype, "Email", void 0);
__decorate([
    typeorm_1.OneToMany(type => schedules_entity_1._scheduleEntity, schedule => schedule.Plumber),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], _plumberEntity.prototype, "Schedules", void 0);
_plumberEntity = __decorate([
    typeorm_1.Entity()
], _plumberEntity);
exports._plumberEntity = _plumberEntity;
