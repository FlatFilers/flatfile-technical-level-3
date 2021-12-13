import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CardEntity } from '../entities/Card'
import { CardsController } from './cards.controller'
import { CardsService } from './cards.service'

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}

export const repositoryMockFactory: () => MockType<Repository<jest.Mock>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}))

describe('CardsController', () => {
  let controller: CardsController
  let service: CardsService
  let repositoryMock: MockType<Repository<CardEntity>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(CardEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile()

    controller = module.get<CardsController>(CardsController)
    service = module.get<CardsService>(CardsService)
    repositoryMock = module.get(getRepositoryToken(CardEntity))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call save on cards repository', async () => {
    const card = new CardEntity()
    card.title = 'test'
    card.section_id = 1
    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(card))
    expect(await controller.addCard({ boardId: 1, sectionId: 1, title: 'test' })).toBe(card)
  })

  it('should call findByBoard on cards repository', async () => {
    const card = new CardEntity()
    card.title = 'test'
    card.section_id = 1
    card.board_id = 1
    jest.spyOn(service, 'findByBoard').mockImplementation(() => Promise.resolve([card]))
    expect(await controller.getCardsByBoard('1')).toStrictEqual([card])
  })
})
