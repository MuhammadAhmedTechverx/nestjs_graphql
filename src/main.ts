import { LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as session from 'express-session';
import { LoggingInterceptor } from './logger.interceptor';
import helmet from 'helmet';
import { MongoExceptionFilter } from 'mongo-exception.filter';
import { join } from 'path';
const dotenv = require('dotenv');
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(
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
  var port = process.env.PORT || 3000;
  console.log(port);
  await app.listen(port);
}
bootstrap();
