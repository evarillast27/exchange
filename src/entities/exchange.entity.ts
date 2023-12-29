import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exchange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  target: string;

  @Column()
  date: string;

  @Column({ type: 'decimal', precision: 15, scale: 5 })
  exchange: number;

  @Column({ default: false })
  disabled: boolean;
}