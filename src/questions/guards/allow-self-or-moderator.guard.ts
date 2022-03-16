import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Answer } from 'src/answers/entities/answer.entity';
import { UserRole } from 'src/users/entities/user.entity';
import { Question } from '../entities/question.entity';
import { QuestionsService } from '../questions.service';

@Injectable()
export class AllowSelfOrModerator implements CanActivate {
  constructor(private readonly questionService: QuestionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.user.role;

    const id: number = context.switchToHttp().getRequest().params.id;
    let question: Question = await this.questionService.findOne(id);

    const selfId: number = context.switchToHttp().getRequest().user.id;

    return question.author.id == selfId || role == UserRole.MODERATOR;
  }
}
