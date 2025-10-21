import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  description: string;

  @Column({ type: 'varchar', nullable: true, length: 25 })
  location: string;

  @Column({ type: 'decimal', nullable: false })
  ticket_price: number;

  @Column({ type: 'varchar', nullable: false })
  event_type: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  event_code: string;

  @Column({ type: 'varchar', default: 'created' }) // TODO: definir estado del evento
  event_status: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({ type: 'varchar', nullable: false })
  created_user: string;

  @Column({ type: 'varchar', nullable: true })
  updated_user: string;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.event, {
    nullable: true,
  })
  reservations: Reservation[];
}
