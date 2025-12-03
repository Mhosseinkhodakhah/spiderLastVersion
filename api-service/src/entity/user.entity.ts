import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";




@Entity('user')
export class user {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar' , nullable : true})
    nationalCode: string;

    @Column({ type: 'varchar' , nullable : true})
    apiToken: string;

    @Column({ type: 'bool' , default : true})
    isConnected: boolean;

    @Column({ type: 'varchar' , nullable : true})
    userName: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' , nullable : true})
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