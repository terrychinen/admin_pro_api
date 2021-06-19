import {
    Entity, Column, JoinColumn,
    PrimaryGeneratedColumn, ManyToOne
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Hospital {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    image: string;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(() => User, user => user.hospitals, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;
}