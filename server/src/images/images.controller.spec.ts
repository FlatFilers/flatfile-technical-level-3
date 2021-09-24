import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ImageEntity } from '../entities/Image'
import { ImagesController } from './images.controller'
import { ImagesService } from './images.service'

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}

export const repositoryMockFactory: () => MockType<Repository<jest.Mock>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}))

describe('ImagesController', () => {
  let controller: ImagesController
  let service: ImagesService
  let repositoryMock: MockType<Repository<ImageEntity>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        ImagesService,
        {
          provide: getRepositoryToken(ImageEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile()

    controller = module.get<ImagesController>(ImagesController)
    service = module.get<ImagesService>(ImagesService)
    repositoryMock = module.get(getRepositoryToken(ImageEntity))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call get images in repository', async () => {
    const images: ImageEntity[] = []
    jest.spyOn(service, 'find').mockImplementation(() => Promise.resolve(images))
    expect(
      await controller.findFiles(1)
    ).toHaveLength(0)
  })
})
