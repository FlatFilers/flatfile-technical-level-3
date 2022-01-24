import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BoardEntity } from '../entities/Board'
import { Repository } from 'typeorm'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>
  ) {}

  findAll(): Promise<BoardEntity[]> {
    return this.boardsRepository.find({ relations: ['sections', 'sections.cards'] })
  }
}
