import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Answer } from 'src/answers/entities/answer.entity';
import { UserRole } from 'src/users/entities/user.entity';
import { AnswersService } from '../answers.service';
@Injectable()
export class AllowSelfOrModerator implements CanActivate {
  constructor(private readonly answerService: AnswersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.user.role;

    const id: number = context.switchToHttp().getRequest().params.id;
    let answer: Answer = await this.answerService.findOne(id);

    const selfId: number = context.switchToHttp().getRequest().user.id;

    return answer.author.id == selfId || role == UserRole.MODERATOR;
  }
}
