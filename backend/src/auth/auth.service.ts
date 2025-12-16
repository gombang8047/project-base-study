import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config/env.validation';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('아이디가 존재하지 않습니다.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('이메일 또는 비밀번호가 틀렸습니다.');
    }

    return this.generateJWT(user);
  }

  async signup(email: string, password: string, username: string) {
    const exist = await this.prisma.user.findUnique({
      where: { email },
    });
    if (exist) {
      throw new Error('이미 존재하는 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    return this.generateJWT(user);
  }
}
