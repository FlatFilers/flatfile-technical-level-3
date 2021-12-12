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

  create({ title }: { title: string }): Promise<BoardEntity> {
    let board = new BoardEntity()
    board.title = title
    return this.boardsRepository.save(board)
  }

  findAll(): Promise<BoardEntity[]> {
    return this.boardsRepository.find({ select: ["title", "id"] })
  }
}
