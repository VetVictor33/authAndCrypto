import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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
}