import { LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as session from 'express-session';
import { LoggingInterceptor } from './logger.interceptor';
import helmet from 'helmet';
import { MongoExceptionFilter } from 'mongo-exception.filter';
const dotenv = require('dotenv');
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;
global.base_dir_path = __dirname;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    //   ,{
    //   logger: ['error', 'warn'],
    // }
  );
  const lazyModuleLoader = app.get(LazyModuleLoader);
  // app.useGlobalPipes(GlobalPipes)
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.use(compression());
  app.useGlobalFilters(new MongoExceptionFilter());
  // app.use(helmet());
  // app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: true,
    }),
  );
  // app.enableShutdownHooks();
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('hbs');
  // var port = process.env.PORT || 3000;
  // console.log(port);
  // await app.listen(port);
  const config = new DocumentBuilder()
    .setTitle('nestJs practise')
    .setDescription('The nestJs API description')
    .setVersion('1.0')
    .addTag('nestJS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('global', global.base_dir_path);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
