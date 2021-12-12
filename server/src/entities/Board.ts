import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string
}
