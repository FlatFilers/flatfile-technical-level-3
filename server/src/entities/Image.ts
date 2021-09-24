import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CardEntity } from './Card'

@Entity({ name: 'images' })
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '' })
  name: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  upload_date: Date

  @Column({ name: 'card_id' })
  card_id: number

  @ManyToOne(() => CardEntity, (card) => card.images)
  @JoinColumn({ name: 'card_id' })
  card: CardEntity
}
