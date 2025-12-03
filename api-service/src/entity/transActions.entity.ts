import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";







@Entity('transactions')
export class transActions {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    nobitexId: string;

    @Column({ type: 'varchar' })
    amount: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar' })
    created_at: string;

    @Column({ type: 'varchar' })
    balance: string;

    @Column({ type: 'varchar' })
    tp: string;

    @Column({ type: 'varchar', nullable: true })
    calculatedFee: null;

    @Column({ type: 'varchar' })
    type: string;

    @Column({ type: 'varchar' })
    currency: string;

    @Column({ type: 'varchar' })
    date: string

    @Column({ type: 'varchar' })
    time: string

    @Column({ type: 'varchar' })
    milisecond: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

}