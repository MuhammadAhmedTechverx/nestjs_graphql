import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdModule } from './prod/prod.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { MemoryModule } from './memory/memory.module';
import { join } from 'path';
const dotenv = require('dotenv');

dotenv.config();
@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
