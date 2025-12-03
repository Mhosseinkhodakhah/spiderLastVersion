import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";




@Entity('user')
export class user {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar' })
    nationalCode: string;

    @Column({ type: 'varchar' })
    apiToken: string;

    @Column({ type: 'varchar' })
    isConnected: string;

    @Column({ type: 'varchar' })
    userName: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    phoneNumber: string;

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