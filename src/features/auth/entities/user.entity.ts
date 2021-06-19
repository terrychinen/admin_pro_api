import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hospital } from '../../hospital/entities/hospital.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: false, default: 'USER_ROLE' })
  role: string;

  @Column({ type: 'boolean', default: false })
  google: string;

  @OneToMany(() => Hospital, hospital => hospital.user)
  @JoinColumn()
  hospitals: Hospital[];
}
