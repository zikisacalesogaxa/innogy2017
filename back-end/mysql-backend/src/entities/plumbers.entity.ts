import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { _scheduleEntity } from './schedules.entity';

@Entity()
export class _plumberEntity {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ type: 'varchar' })
    First_Name: string;
    
    @Column({ type: 'varchar' })
    Last_Name: string;

    @Column({ type: 'varchar' })
    Username: string;
    
    @Column({ type: 'int' })
    CellNumber: number;

    @Column({ type: 'varchar' })
    Email: string;

    @OneToMany( type => _scheduleEntity, schedule => schedule.Plumber)
    @JoinColumn()
    Schedules: [_scheduleEntity];

}
