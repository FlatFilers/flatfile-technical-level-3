/* istanbul ignore file */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
    cors: (req, callback) => {
      callback(null, {
        origin: req.method !== ('POST' || 'PUT'),
        preflightContinue: false,
      })
    },
  })
  app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
  await app.listen(3001)
}
bootstrap()
