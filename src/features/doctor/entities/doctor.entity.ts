import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Hospital } from '../../hospital/entities/hospital.entity';

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    image: string;

    @ManyToOne(() => User, user => user.doctors, { nullable: false })
    @JoinColumn({ name: 'user_id'})
    user: User;

    @ManyToOne(() => Hospital, hospital => hospital.doctors, { nullable: false })
    @JoinColumn({ name: 'doctor_id' })
    hospital: Hospital;
}