import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Adopcion } from './Adopcion'

interface Attributes {
    id?: number;
    nombre: string;
    raza: string
    tipo: string;
    sexo: string;
    estado: string;
    linkFotoPerfil: string;
    descripcion: string;
    adopciones?: Adopcion[]
}

@Table({
    tableName: 'Mascota',
    timestamps: true,
})

export class Mascota extends Model<Mascota, Attributes> {

    @Column({ allowNull: false, type: DataType.STRING })
    nombre!: string;

    @Column({ allowNull: false, type: DataType.STRING })
    raza!: string;

    @Column({ allowNull: false, type: DataType.STRING })
    tipo!: string;

    @Column({ allowNull: false, type: DataType.STRING })
    sexo!: string;

    @Column({ allowNull: false, type: DataType.STRING })
    estado!: string;

    @Column({ allowNull: false, type: DataType.STRING })
    linkFotoPerfil!: string;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: '' })
    descripcion!: string;

    // Fechas de registro
    @CreatedAt
    @Column({ allowNull: false, type: DataType.DATE })
    createdAt!: Date;

    @UpdatedAt
    @Column({ allowNull: false, type: DataType.DATE })
    updatedAt!: Date;

    // Adopciones
    @HasMany(() => Adopcion)
    adopciones?: Adopcion[];
}