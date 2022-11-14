import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { ProdModule } from './prod/prod.module';

import { FileModule } from './file/file.module';

import { MemoryModule } from './memory/memory.module';

import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TechverxModule } from './techverx/techverx.module';
import { Test1Module } from './test1/test1.module';
const dotenv = require('dotenv');

dotenv.config();
@Module({
  imports: [
    // MailerModule.forRootAsync({
    //   useFactory: () => ({
    //     transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    //     defaults: {
    //       from: '"nest-modules" <modules@nestjs.com>',
    //     },
    //     preview: true,
    //     template: {
    //       dir: __dirname + '/views/index',
    //       adapter: new PugAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    // }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'e3c23a452e8a93',
          pass: '844c1e58b62b46',
        },
      },
      // defaults: {
      //   from: '"No Reply" <noreply@example.com>',
      // },
      template: {
        dir: join(__dirname, 'mails'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    SessionModule.forRoot({
      session: { secret: 'keyboard cat' },
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
    }),
    UserModule,
    AuthModule,
    ProdModule,
    FileModule,
    MemoryModule,
    TechverxModule,
    Test1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
