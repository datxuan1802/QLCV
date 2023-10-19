import { Module } from '@nestjs/common';
import { S3UploadService } from './s3-upload.service';
import { S3UploadController } from './s3-upload.controller';

@Module({
  providers: [S3UploadService],
  controllers: [S3UploadController]
})
export class S3UploadModule {}
