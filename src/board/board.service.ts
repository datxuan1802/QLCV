import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './board.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardRepository: Model<Board>) {}
  create(workspaceId: string, createBoardDto: CreateBoardDto) {
    return this.boardRepository.create({ ...createBoardDto, workspaceId });
  }

  findAll() {
    return this.boardRepository.find();
  }

  findByWorkspaceId(workspaceId: string) {
    return this.boardRepository.find({ workspaceId });
  }

  findOne(boardId: string) {
    return this.boardRepository.findById(boardId);
  }

  update(boardId: string, updateBoardDto: UpdateBoardDto) {
    return this.boardRepository.findByIdAndUpdate(boardId, updateBoardDto);
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
