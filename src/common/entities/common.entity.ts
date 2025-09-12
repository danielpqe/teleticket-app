import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'boolean', default: true })
  status?: boolean;
  @Column({ type: 'timestamp', name: 'created_at' })
  created_at?: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updated_at?: Date;

  @Column({ type: 'varchar', nullable: false })
  created_user?: string;

  @Column({ type: 'varchar', nullable: true })
  updated_user?: string;
}
