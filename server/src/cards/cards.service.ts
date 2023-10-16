import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CardEntity } from '../entities/Card'
import { Repository } from 'typeorm'

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>
  ) {}

  create({ sectionId, title, description }: { sectionId: number; title: string, description: string }): Promise<CardEntity> {
    let card = new CardEntity()
    card.title = title
    card.description = description
    card.section_id = sectionId
    return this.cardsRepository.save(card)
  }

  async update({ id, sectionId, title, description }: { id: number; sectionId: number; title: string, description: string }): Promise<CardEntity> {
    // Find the card by its ID
    const existingCard = await this.cardsRepository.findOne(id);

    if (!existingCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    // Update the fields
    existingCard.title = title;
    existingCard.description = description;
    existingCard.section_id = sectionId;

    // Save the updated card to the database
    return this.cardsRepository.save(existingCard);
  }
}
