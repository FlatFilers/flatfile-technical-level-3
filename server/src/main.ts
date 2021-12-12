/* istanbul ignore file */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

var allowlist = ['localhost']
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
    cors: (req, callback) => {
      console.log(req.headers.host)
      callback(null, {
        origin: allowlist.indexOf(req.header('Origin')) !== -1 ? false : true,
        preflightContinue: false,
      })
    },
  })
  await app.listen(3001)
}
bootstrap()
