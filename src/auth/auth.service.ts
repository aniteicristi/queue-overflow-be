import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { compare as compareHash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const dbUser = await this.userRepository.findOne({ email: username });
    if (dbUser && compareHash(password, dbUser.passwordHash)) {
      return dbUser;
    } else {
      return null;
    }
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    if (payload.role == 'banned') {
      throw new ForbiddenException('User is banned');
    }
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
