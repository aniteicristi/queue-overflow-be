import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AnswersService } from 'src/answers/answers.service';
import { Answer } from 'src/answers/entities/answer.entity';

@Injectable()
export class DisallowSelfAnswerGuard implements CanActivate {
  constructor(private readonly questionService: AnswersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const id: number = context.switchToHttp().getRequest().body.answerId;
    let answer: Answer = await this.questionService.findOne(id);

    const selfId: number = context.switchToHttp().getRequest().user.id;

    return answer.author.id != selfId;
  }
}
