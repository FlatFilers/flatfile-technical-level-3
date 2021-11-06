import { Body, Controller, Logger, Post } from '@nestjs/common'
import { CardEntity } from '../entities/Card'
import { CardsService } from './cards.service'

@Controller('cards')
export class CardsController {
  private readonly logger = new Logger(CardsController.name)

  constructor(private cardsService: CardsService) {}

  @Post()
  // FIXME: Should I split into two methods?
  addOrUpdateCard(@Body() card: { section_id: number; title: string, id: number}): Promise<CardEntity> {
    this.logger.log('POST /cards')

    return this.cardsService.createOrUpdate(card)
  }
}
