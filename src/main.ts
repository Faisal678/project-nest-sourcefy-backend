import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { setupSwagger } from './services/swagger.utils';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app)

  // Global Guards (see https://docs.nestjs.com/guards#global-guards)
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new RolesGuard(reflector));

  await app.listen(5000);
}
bootstrap();
