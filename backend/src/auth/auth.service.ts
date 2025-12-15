import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config/env.validation';

@Injectable()
export class AuthService {
  generateJWT(user: any): string {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d',
    });
  }
}
