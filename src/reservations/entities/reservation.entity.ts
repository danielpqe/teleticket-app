import { CommonEntity } from 'src/common/entities/common.entity';
import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('reservations')
export class Reservation extends CommonEntity {
  // TODO: Add one to many relationship with event entity
  @Column({ type: 'varchar', nullable: false })
  reservation_code: string;

  @Column({ type: 'varchar', nullable: false })
  event_code: string;

  @Column({ type: 'boolean', default: true })
  reservation_status: boolean;

  @ManyToOne(() => Event, (event) => event.reservations, { nullable: true })
  event: Event;
}
