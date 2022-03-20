/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User, UserRole } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class IsNotBannedGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const id = context.switchToHttp().getRequest().user.id;
    const user: User = await this.userService.findOne(id);
    if (user.role == UserRole.BANNED) return false;

    return true;
  }
}
