import { CommonEntity } from 'src/common/entities/common.entity';
import { Column } from 'typeorm';

export class Reservation extends CommonEntity {
  // TODO: Add one to many relationship with event entity
  @Column({ type: 'varchar', nullable: false })
  reservation_code: string;

  @Column({ type: 'varchar', nullable: false })
  event_code: string;

  @Column({ type: 'boolean', default: true })
  reservation_status: boolean;
}
