import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AuthService, GoogleStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
