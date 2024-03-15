import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    helmet({
      xPoweredBy: false
    })
  )
  app.enableCors({
    origin: [...process.env.ALLOWED_ORIGINS.split(' ')],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
  app.setGlobalPrefix('api/v1')
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
