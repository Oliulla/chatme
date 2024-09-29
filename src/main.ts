import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as basicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(helmet());
  const configService = app.get(ConfigService);

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.use(
    '/docs',
    basicAuth({ challenge: true, users: { admin: 'hdml@1230' } }),
  );

  const config = new DocumentBuilder()
    .setTitle('chat-app')
    .setDescription('chat-app API description')
    .setVersion('1.0')
    .addTag('chat-app')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = configService.get<number>('PORT');
  await app.listen(port, () => console.log(`Server running at port ${port}`));
}
bootstrap();
