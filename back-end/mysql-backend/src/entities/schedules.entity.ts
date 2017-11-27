import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { _plumberEntity } from './plumbers.entity';

@Entity()
export class _scheduleEntity {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ type: 'varchar' })
    Employer_Name: string;

    @Column({ type: 'int' })
    Employer_Number: number;

    @Column({ type: 'varchar' })
    Day: string;

    @Column({ type: 'varchar' })
    Slot: string;

    @Column({ type: 'varchar' })
    Job_Description: string;

    @ManyToOne( type => _plumberEntity, plumber => plumber.Schedules)
    Plumber: _plumberEntity;

}