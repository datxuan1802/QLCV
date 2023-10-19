import { FileInterceptor } from '@nestjs/platform-express';
import { S3UploadService } from './s3-upload.service';
import { Post, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { Controller } from 'src/decorator/customController.decorator';

@Controller('s3-upload')
export class S3UploadController {
  constructor(private readonly s3UploadService: S3UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file,

    @Query('src') src: string,
  ) {
    const { originalname, buffer } = file;
    const key = originalname;
    const imageFile = await this.s3UploadService.uploadImage(key, buffer, src);
    return { url: imageFile.Location };
  }
}
