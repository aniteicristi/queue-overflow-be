import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { TagsModule } from './tags/tags.module';
import { AnswersModule } from './answers/answers.module';
import { VotesModule } from './votes/votes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      debug: false,
    }),

    UsersModule,
    AuthModule,
    QuestionsModule,
    AnswersModule,
    TagsModule,
    VotesModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
