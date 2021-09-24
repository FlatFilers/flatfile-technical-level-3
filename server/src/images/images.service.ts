import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ImageEntity } from 'src/entities/Image'

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private imagesRepository: Repository<ImageEntity>
  ) {}

  create({
    files,
    card_id,
  }: {
    files: Array<Express.Multer.File>
    card_id: number
  }): Promise<ImageEntity[]> {
    const images: ImageEntity[] = files.map((file) => {
      let image = new ImageEntity()
      image.card_id = card_id
      image.name = file.originalname
      return image
    })

    return this.imagesRepository.save(images)
  }

  find({ card_id }: { card_id: number }): Promise<ImageEntity[]> {
    return this.imagesRepository.find({
      where: {
        card_id,
      },
      order: {
        upload_date: 'DESC',
      },
      take: 3,
    })
  }
}
