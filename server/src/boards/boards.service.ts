import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BoardEntity } from '../entities/Board'
import { Repository } from 'typeorm'
import { SectionEntity } from '../entities/Section'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>
  ) {}

  findAll(): Promise<BoardEntity[]> {
    return this.boardsRepository.find({ relations: ['sections', 'sections.cards'] })
  }

  createWithTitle(title: string): Promise<BoardEntity> {
    const board = new BoardEntity()
    board.title = title
    const backlogSection = new SectionEntity()
    backlogSection.title = 'Backlog'
    const readySection = new SectionEntity()
    readySection.title = 'Ready for Development'
    const inProgressSection = new SectionEntity()
    inProgressSection.title = 'In Progress'
    const inReviewSection = new SectionEntity()
    inReviewSection.title = 'In Review'
    const doneSection = new SectionEntity()
    doneSection.title = 'Done'
    board.sections = [backlogSection, readySection, inProgressSection, inReviewSection, doneSection]
    return this.boardsRepository.save(board)
  }
}
