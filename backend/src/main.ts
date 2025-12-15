import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // "이 출처는 믿을 수 있어. 허용해!"
    origin: 'http://localhost:3000',
    // "쿠키도 같이 보내도 돼!"
    credentials: true,
  });

  await app.listen(process.env.PORT || 8000);
}
bootstrap().catch((err) => console.error(err));
