import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { market } from "./market.entity";



@Entity('position')
export class position {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @OneToOne(()=>market , (marketState) => marketState.position)
    market: market
    
    @Column({ type: 'varchar' , default : '0'})
    weight: string

    @Column({type : 'varchar' , default : '45'})
    price : string

    @Column({type : 'varchar' , default : '0'})
    balance : string

    @Column({type : 'varchar' , default : '0'})
    profit : string

    @Column({type : 'varchar' , default : '0'})
    type : string

    @Column({type : 'varchar' , default : 'BTCUSDT'})
    currencie : string
    
    @Column({type : 'bool' , default : false})
    setllement : boolean

    @Column({type : 'varchar' , default : '0'})
    date : string

    @Column({type : 'varchar' , default : '0'})
    time : string

    @Column({ type: 'varchar', default: '0' })
    milisecond : string

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt:Date
}