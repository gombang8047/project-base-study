import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// TODO: 이 Guard를 Controller에 @UseGuards(JwtAuthGuard)로 사용
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
