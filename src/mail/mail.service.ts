import { Injectable } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { MailgunEmailModel } from '@nextnm/nestjs-mailgun/dist/nestjs-mailgun/classes/mailgun-email-model';
import { join } from 'path';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailService {
  constructor(
    private mailgunService: MailgunService,
    private configService: ConfigService,
  ) {}

  async sentUserBanNotification(user: User, reason: string) {
    try {
      this.mailgunService.createEmail(
        this.configService.get<string>('MAILGUN_API_DOMAIN'),
        new MailgunEmailModel(
          'Excited User <me@samples.mailgun.org>',
          user.email,
          'You have been banned from Queue Overflow',
          `You have been banned from queue overflow because of reason: ${reason}`,
        ),
      );
    } catch (e) {
      console.log(e);
    }
  }
}
