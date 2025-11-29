import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('market')
export class market {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({ type: 'int' , default : 0})
    state: number

    @Column({type : 'varchar' , default : '45'})
    rsi : string

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

}