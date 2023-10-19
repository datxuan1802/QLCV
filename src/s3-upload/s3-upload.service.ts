import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3UploadService {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }
  async uploadImage(key: string, body: Buffer, src: string) {
    const params: AWS.S3.PutObjectRequest = {
      //   Bucket: process.env.AWS_S3_BUCKET,
      Bucket: process.env.AWS_S3_BUCKET + '/' + src,
      Key: key,
      Body: body,
      ContentType: 'image/jpeg',
      //   ACL: 'public-read',
    };
    try {
      const result = await this.s3.upload(params).promise();
      console.log(`File uploaded to ${result.Location}`);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
