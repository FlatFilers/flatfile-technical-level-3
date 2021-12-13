import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BoardEntity } from '../entities/Board'
import { CardEntity } from '../entities/Card'
import { Repository } from 'typeorm'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>
  ) {}

  create({ title }: { title: string }): Promise<BoardEntity> {
    let board = new BoardEntity()
    board.title = title
    return this.boardsRepository.save(board)
  }

  findByBoard(): Promise<BoardEntity[]> {
    return this.boardsRepository.find({ relations: ['cards'] })
  }

  findAll(): Promise<BoardEntity[]> {
    return this.boardsRepository.find({ select: ['title', 'id'] })
  }
}
