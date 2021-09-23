import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { SectionEntity } from './Section'
import { ImageEntity } from './Image'

@Entity({ name: 'cards' })
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({default: ""})
  title: string

  @Column({default: null, nullable: true})
  description: string

  @Column({ name: 'section_id' })
  section_id: number

  @ManyToOne(() => SectionEntity, (section) => section.cards)
  @JoinColumn({ name: 'section_id' })
  section: SectionEntity

  @OneToMany(() => ImageEntity, (image) => image.card)
  @JoinColumn({ referencedColumnName: 'card_id' })
  images: ImageEntity[]
}
