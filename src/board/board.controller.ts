import { Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Controller } from 'src/decorator/customController.decorator';
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/create')
  create(
    @Query('workspaceId') workspaceId: string,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    return this.boardService.create(workspaceId, createBoardDto);
  }

  @Get('/all')
  findAll() {
    return this.boardService.findAll();
  }

  @Get('/find-by-workspace/:workspaceId')
  findByWorkspace(@Param('workspaceId') workspaceId: string) {
    return this.boardService.findByWorkspaceId(workspaceId);
  }

  @Get(':boardId')
  findOne(@Param('boardId') boardId: string) {
    return this.boardService.findOne(boardId);
  }

  @Patch('update')
  update(
    @Query('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(boardId, updateBoardDto);
  }

  @Delete('/delete')
  Delete(@Query('boardId') boardId: string) {
    console.log(boardId,'board');
    return this.boardService.remove(boardId);
  }
}
