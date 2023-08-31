import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import Monster from './Monster'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => Monster, monster => monster.user)
  monsters: Monster[]
}