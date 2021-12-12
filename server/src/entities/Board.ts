import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm'
import { CardEntity } from './Card'

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @OneToMany(() => CardEntity, (card) => card.board)
  @JoinColumn({ referencedColumnName: 'board_id' })
  cards: CardEntity[]
}
