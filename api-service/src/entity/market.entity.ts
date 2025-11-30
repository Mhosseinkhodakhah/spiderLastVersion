import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('market')
export class market {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({ type: 'int' , default : 0})
    state: number

    @Column({type : 'varchar' , default : '45'})
    rsi : string

    @Column({type : 'varchar' , default : '0'})
    totalBalance : string

    @Column({type : 'varchar' , default : '0'})
    profit : string

    @Column({type : 'varchar' , default : '1'})
    currencies : string

    @Column({type : 'varchar' , default : '0'})
    lastPrice : string

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}