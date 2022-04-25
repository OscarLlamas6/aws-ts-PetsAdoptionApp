import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from './Usuario'
import { Mascota } from './Mascota'

interface Attributes {
    id?: number;
    elegido: boolean;
    notificado: boolean;
    IdUsuario: number;
    IdMascota: number;
}

@Table({
    tableName: 'Adopcion',
    timestamps: true,
})

export class Adopcion extends Model<Adopcion, Attributes> {

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    elegido!: boolean;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    notificado!: boolean;

    // Fechas de registro
    @CreatedAt
    @Column({ allowNull: false, type: DataType.DATE })
    createdAt!: Date;

    @UpdatedAt
    @Column({ allowNull: false, type: DataType.DATE })
    updatedAt!: Date;

    //LLAVE FORANEA USUARIO
    @ForeignKey(() => Usuario)
    @Column({ allowNull: false, type: DataType.INTEGER })
    IdUsuario?: number;

    @BelongsTo(() => Usuario)
    usuario?: Usuario;

    //LLAVE FORANEA MASCOTA
    @ForeignKey(() => Mascota)
    @Column({ allowNull: false, type: DataType.INTEGER })
    IdMascota?: number;

    @BelongsTo(() => Mascota)
    mascota?: Mascota;
}