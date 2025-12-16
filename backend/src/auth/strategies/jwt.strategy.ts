import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from 'src/config/env.validation';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer <token>
      ignoreExpiration: false, // 만료된 토큰 거부
      secretOrKey: JWT_SECRET, // 토큰 검증에 사용할 비밀키
    });
  }

  // TODO: 토큰이 검증되면 이 메서드 실행
  // payload = JWT 토큰 안에 들어있는 데이터 (email, id)
  async validate(payload: any) {
    // 이 return 값이 req.user로 저장됨!
    return {
      userId: payload.id,
      email: payload.email,
    };
  }
}
