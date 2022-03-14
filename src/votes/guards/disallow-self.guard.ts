import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class DisallowSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const id: number = context.switchToHttp().getRequest().body.userTo;

    const selfId: number = context.switchToHttp().getRequest().id;

    return id != selfId;
  }
}
