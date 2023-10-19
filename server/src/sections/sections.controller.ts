import { Controller, Get, Logger } from '@nestjs/common'

import { SectionEntity } from '../entities/Section'
import { SectionsService } from './sections.service'

@Controller('sections')
export class SectionsController {
  private readonly logger = new Logger(SectionsController.name)
  private lastLogTime: number = 0;
  private logInterval: number = 5000; // Log every 5 seconds

  constructor(private sectionsService: SectionsService) {}

  @Get()
  getAllSections(): Promise<SectionEntity[]> {

    const currentTime = Date.now();

    if (currentTime - this.lastLogTime >= this.logInterval) {
      this.logger.log('GET /sections')
      this.lastLogTime = currentTime;
    }

    return this.sectionsService.findAll()
  }
}
