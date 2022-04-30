"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adopcion = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Usuario_1 = require("./Usuario");
const Mascota_1 = require("./Mascota");
let Adopcion = class Adopcion extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.BOOLEAN })
], Adopcion.prototype, "elegido", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.BOOLEAN })
], Adopcion.prototype, "notificado", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.DATE })
], Adopcion.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.DATE })
], Adopcion.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Usuario_1.Usuario),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.INTEGER })
], Adopcion.prototype, "IdUsuario", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Usuario_1.Usuario)
], Adopcion.prototype, "usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Mascota_1.Mascota),
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.INTEGER })
], Adopcion.prototype, "IdMascota", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Mascota_1.Mascota)
], Adopcion.prototype, "mascota", void 0);
Adopcion = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'Adopcion',
        timestamps: true,
    })
], Adopcion);
exports.Adopcion = Adopcion;
