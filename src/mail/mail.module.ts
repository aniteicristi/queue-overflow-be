import { Module } from '@nestjs/common';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      useFactory: (configService: ConfigService) => {
        return {
          username: configService.get<string>('MAILGUN_API_USER'),
          key: configService.get<string>('MAILGUN_API_KEY'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
