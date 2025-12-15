import { Injectable } from '@nestjs/common';
//  NestJS의 Injectable 데코레이터를 가져옴. 이 클래스를 "서비스"로 사용 가능하게 함
import { PassportStrategy } from '@nestjs/passport';
// Passport 인증 전략을 NestJS에서 쓸 수 있게 해주는 헬퍼 가져옴
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
// Google OAuth 전용 Strategy와 검증 콜백 타입을 가져옴
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from 'src/config/env.validation';

// "이 클래스는 다른 곳에서 주입(inject)해서 쓸 수 있어요" 표시
@Injectable()
// GoogleStrategy 클래스 정의. PassportStrategy를 상속받으며, 'google'이라는 이름으로 등록
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // 클래스가 생성될 때 실행되는 초기화 함수
  constructor() {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
