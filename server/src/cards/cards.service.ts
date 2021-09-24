import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CardEntity } from '../entities/Card'
import { Repository } from 'typeorm'

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>
  ) {}

  create({
    sectionId,
    title,
    description,
  }: {
    sectionId: number
    title: string
    description: string
  }): Promise<CardEntity> {
    let card = new CardEntity()
    card.title = title
    card.section_id = sectionId
    card.description = description
    return this.cardsRepository.save(card)
  }

  findOne(id: number): Promise<CardEntity> {
    return this.cardsRepository.findOne({
      where: {
        id,
      },
    })
  }

  update({
    id,
    title,
    description,
  }: {
    id: number
    title: string
    description: string
  }): Promise<CardEntity> {
    return this.cardsRepository.save({ id, title, description })
  }
}
