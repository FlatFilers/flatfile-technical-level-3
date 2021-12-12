import { Body, Controller, Logger, Get, Post, Param } from '@nestjs/common'
import { CardEntity } from '../entities/Card'
import { CardsService } from './cards.service'

@Controller('cards')
export class CardsController {
  private readonly logger = new Logger(CardsController.name)

  constructor(private cardsService: CardsService) {}

  @Get(':id')
  getCardsByBoard(@Param('id') id: string): Promise<CardEntity[]> {
    this.logger.log(`GET /cards/${id}`)

    // return this.boardsService.find()
    return this.cardsService.findByBoard()
  }

  @Post()
  addCard(
    @Body() card: { boardId: number; sectionId: number; title: string }
  ): Promise<CardEntity> {
    this.logger.log('POST /cards')

    return this.cardsService.create(card)
  }
}
