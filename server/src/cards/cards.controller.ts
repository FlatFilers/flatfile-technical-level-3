import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common'
import { CardEntity } from '../entities/Card'
import { CardsService } from './cards.service'

@Controller('cards')
export class CardsController {
  private readonly logger = new Logger(CardsController.name)

  constructor(private cardsService: CardsService) {}

  @Post()
  addCard(@Body() card: { sectionId: number; title: string }): Promise<CardEntity> {
    this.logger.log('POST /cards')

    return this.cardsService.create(card)
  }

  @Get(':id')
  getCard(@Param('id') id: number): Promise<CardEntity> {
    this.logger.log(`GET /cards/${id}`)

    return this.cardsService.findOne(id)
  }
}
