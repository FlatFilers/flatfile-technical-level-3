import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { v4 as uuid } from 'uuid'
import { diskStorage } from 'multer'
import { ImageEntity } from 'src/entities/Image'
import { ImagesService } from './images.service'
import { extname } from 'path'
import { Response } from 'express'

@Controller('images')
export class ImagesController {
  private readonly logger = new Logger(ImagesController.name)

  constructor(private imagesService: ImagesService) {}

  @Post(':card_id/upload')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: diskStorage({
        destination: `${__dirname}/uploads`,
        filename: (req, file, callback) => {
          let filename = `${uuid()}${extname(file.originalname)}`
          file.originalname = filename
          return callback(null, filename)
        },
      }),
    })
  )
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('card_id') card_id: number
  ): Promise<ImageEntity[]> {
    this.logger.log(`POST /images/${card_id}/upload`)

    return this.imagesService.create({ files, card_id })
  }

  @Get(':card_id')
  findFiles(@Param('card_id') card_id: number): Promise<ImageEntity[]> {
    this.logger.log(`GET /images/${card_id}`)

    return this.imagesService.find({ card_id })
  }

  @Get('path/:name')
  getFile(@Res() res: Response, @Param('name') name: string): void {
    this.logger.log(`GET /images/path/${name}`)

    res.sendFile(name, { root: `${__dirname}/uploads` })
  }
}
