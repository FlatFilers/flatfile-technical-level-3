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

  createOrUpdate({ section_id, title, id }: { section_id: number; title: string, id: number }): Promise<CardEntity> {
    let card = new CardEntity()
    card.title = title
    card.section_id = section_id
    card.id = id
    return this.cardsRepository.save(card)
  }
}
