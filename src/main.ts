import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swaggerConfig';
import { IS_PUBLIC_KEY } from './decorator/isPublic.decorator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  app.use(helmet());
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(port);
}
bootstrap();
