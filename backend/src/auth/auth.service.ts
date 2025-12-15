import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config/env.validation';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  generateJWT(user: any): string {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d',
    });
  }

  async findOrCreateUser(googleUser: any) {
    let user = await this.prisma.user.findUnique({
      where: { email: googleUser.email },
    });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: googleUser.email,
          password: '',
          username: googleUser.firstName + ' ' + googleUser.lastName,
          picture: googleUser.picture,
        },
      });
    }
    return user;
  }
}
