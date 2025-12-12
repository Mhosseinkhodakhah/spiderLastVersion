import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class setting{
    
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({type : 'varchar' , default : '10'})
    volume : string

    @Column({type : 'int' , default : 5})
    percent : number

    @Column({type : 'bool' , default : true})
    active : boolean

    @Column({type : 'varchar' , array : true })
    currencies : string[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date

}