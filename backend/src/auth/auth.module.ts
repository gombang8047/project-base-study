import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/env.validation';

@Module({
  imports: [
    // TODO: JWT 모듈 설정
    JwtModule.register({
      secret: JWT_SECRET, // JWT 비밀키
      signOptions: { expiresIn: '1d' }, // 토큰 만료시간 7일
    }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy, // TODO: JwtStrategy 추가!
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
