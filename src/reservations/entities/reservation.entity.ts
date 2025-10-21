import { CommonEntity } from 'src/common/entities/common.entity';
import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity('reservations')
export class Reservation extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  reservation_code: string;

  @Column({ type: 'boolean', default: true })
  reservation_status: boolean;

  @ManyToOne(() => Event, (event) => event.reservations, { nullable: true })
  @JoinColumn({ name: 'eventId' })
  event: Event;
}
