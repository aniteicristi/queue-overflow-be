import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class DisallowSelfQuestionGuard implements CanActivate {
  constructor(private readonly questionService: QuestionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const id: number = context.switchToHttp().getRequest().body.questionId;
    let question: Question = await this.questionService.findOne(id);

    const selfId: number = context.switchToHttp().getRequest().user.id;

    return question.author.id != selfId;
  }
}
