import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    // 1. JWT 토큰 생성
    const token = this.authService.generateJWT(req.user);
    // 2. 프론트엔드로 리다이렉트 (토큰 포함)
    res.redirect(`http://localhost:3000/main?token=${token}`);
  }
}
