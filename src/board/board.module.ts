import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Workspace, WorkspaceSchema } from 'src/workspaces/workspaces.schema';
import { Board, BoardSchema } from './board.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Workspace.name,
        schema: WorkspaceSchema,
      },
      {
        name: Board.name,
        schema: BoardSchema,
      },
    ]),
  ],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
