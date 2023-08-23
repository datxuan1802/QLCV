import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Task Management')
  .setDescription('The Task Management App API description 💥')
  .setVersion('1.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .build();

export const options: SwaggerDocumentOptions = {
  // swaggerOptions: {
  //   persistAuthorization: true,
  // },
};
