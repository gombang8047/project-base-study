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
  async googleAuthRedirect(@Req() req, @Res() res) {
    //유저 데이터 찾아서 가져오기 없으면 생성
    const user = await this.authService.findOrCreateUser(req.user);
    // 1. JWT 토큰 생성
    const token = this.authService.generateJWT(user);
    // 2. 프론트엔드로 리다이렉트 (토큰 포함)
    res.redirect(`http://localhost:3000/main?token=${token}`);
  }
}
