import { Controller as NestController } from '@nestjs/common';
import { ApiTags as SwaggerApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { IS_PUBLIC_KEY } from './isPublic.decorator';
export function Controller(route: string): ClassDecorator {
  const decorators = [
    NestController(route), // Use the original @Controller decorator
    SwaggerApiTags(removeLeadingSlash(route) + '-controller'), // Use @ApiTags for Swagger documentation
  ];
  return (target: Function) => {
    decorators.forEach((decorator) => decorator(target));
  };
}

function removeLeadingSlash(path: string): string {
  return path.replace(/^\/+/, ''); // Remove leading slashes
}
