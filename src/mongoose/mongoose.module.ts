import { Module, Global } from '@nestjs/common';
import { MongooseModule as MModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { UserSchema } from 'src/users/users.schema';
import { WorkspaceSchema } from 'src/workspaces/workspaces.schema';
@Global()
@Module({
  imports: [
    MModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
      }),
    }),
    // MModule.forFeature([
    //   {
    //     name: 'User',
    //     schema: UserSchema,
    //   },
    //   {
    //     name: 'Workspace',
    //     schema: WorkspaceSchema,
    //   },
    // ]),
  ],
  providers: [],
  exports: [],
})
export class MongooseModule {}
