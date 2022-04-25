import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasMany } from "sequelize-typescript";
import { Adopcion } from './Adopcion'

interface Attributes {
    id?: number;
    userName: string;
    nombre: string;
    password: string;
    linkFotoPerfil: string;
    rol: string;
    adopciones?: Adopcion[]
}

@Table({
    tableName: 'Usuarios',
    timestamps: true,
})

export class Usuario extends Model<Usuario, Attributes> {

    @Column({ allowNull: false, type: DataType.STRING })
    userName!: string;

    @Column({ allowNull: false, type: DataType.STRING })
    nombre!: string;

    @Column({ allowNull: false, type: DataType.STRING })
    password!: string;

    @Column({ allowNull: false, type: DataType.STRING })
    linkFotoPerfil!: string;

    @Column({ allowNull: false, type: DataType.STRING, defaultValue: '' })
    rol!: string;

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