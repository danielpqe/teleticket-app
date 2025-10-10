import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'boolean', default: true })
  status?: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updated_at?: Date;

  @Column({ type: 'varchar', nullable: false })
  created_user?: string;

  @Column({ type: 'varchar', nullable: true })
  updated_user?: string;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deleted_at?: Date;
}
