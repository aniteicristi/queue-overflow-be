import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IsModerator } from './is-moderator.guard';
import { IsNotBannedGuard } from './isnotbanned.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
<<<<<<< HEAD
    IsModerator,
    { provide: APP_GUARD, useClass: IsNotBannedGuard },
=======
>>>>>>> c1e96d2eb9fc0d6c4c87cfa9f50038e95f4a2a79
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
