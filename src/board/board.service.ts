import { getObjectId } from 'src/utils/helper';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './board.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from 'src/workspaces/workspaces.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardRepository: Model<Board>,
    @InjectModel(Workspace.name) private workspaceRepo: Model<Workspace>,
  ) {}
  async create(workspaceId: string, createBoardDto: CreateBoardDto) {
    const newBoard = await this.boardRepository.create({
      ...createBoardDto,
      workspace: getObjectId(workspaceId),
    });
    await this.workspaceRepo.findByIdAndUpdate(workspaceId, {
      $push: { boards: newBoard._id },
    });
    return newBoard;
  }

  findAll() {
    return this.boardRepository.find();
  }

  findByWorkspaceId(workspace: string) {
    return this.boardRepository.find({ workspace: getObjectId(workspace) });
  }

  findOne(boardId: string) {
    return this.boardRepository.findById(getObjectId(boardId));
  }

  update(boardId: string, updateBoardDto: UpdateBoardDto) {
    return this.boardRepository.findByIdAndUpdate(boardId, updateBoardDto);
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
