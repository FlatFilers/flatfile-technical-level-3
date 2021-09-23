/* istanbul ignore file */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
    cors: (req, callback) => {
      callback(null, {
        origin: 'http://localhost:3000',
        preflightContinue: false,
      })
    },
  })
  await app.listen(3001)
}
bootstrap()
