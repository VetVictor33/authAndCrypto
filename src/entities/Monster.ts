import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import User from './User'

@Entity('monsters')
export default class Monster {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @Column()
  name: string

  @Column()
  nickname: string

  @Column({ nullable: true })
  skills: string

  @Column({ nullable: true })
  image_url: string

  @ManyToOne(() => User, user => user.monsters)
  @JoinColumn({ name: 'user_id' })
  user: User
}