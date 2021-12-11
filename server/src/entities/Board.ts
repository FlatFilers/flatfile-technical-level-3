import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CardEntity } from './Card'

@Entity({ name: 'cards' })
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @ManyToOne(() => CardEntity, (card) => card)
  @JoinColumn({ name: 'board_id' })
  cards: CardEntity[]
}
