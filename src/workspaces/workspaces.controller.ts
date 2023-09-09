import { UsersService } from './../users/users.service';
import { Post, Body, Get, Query, Put } from '@nestjs/common';
import { Controller } from 'src/decorator/customController.decorator';
import { WorkspacesService } from './workspaces.service';
import { ApiBody } from '@nestjs/swagger';
import { createWorkspaceDTO } from './dto/createWorkspaceDTO';
import { updateWorkspaceDTO } from './dto/updateWorkspaceDTO';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/enums/role.enum';
import { User } from 'src/users/users.schema';

@Controller('/workspaces')
export class WorkspacesController {
  constructor(
    private workspaceService: WorkspacesService,
    private userService: UsersService,
  ) {}
  @ApiBody({ type: createWorkspaceDTO })
  @Post('/create')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  create(
    @Query('ownerId') ownerId: string,
    @Body() createWorkspaceDTO: createWorkspaceDTO,
  ) {
    return this.workspaceService.create(ownerId, createWorkspaceDTO);
  }

  @Get('/all')
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.workspaceService.findAll();
  }

  @Get('/findByOwnerId')
  findByOwnerId(@Query('ownerId') ownerId: string) {
    return this.workspaceService.findByOwnerId(ownerId);
  }

  @Get('/findById')
  findById(@Query('workspaceId') workspaceId: string) {
    return this.workspaceService.findById(workspaceId);
  }

  @Put('/update')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  update(
    @Query('ownerId') ownerId: string,
    @Query('workspaceId') workspaceId: string,
    @Body() updateWorkspaceDTO: updateWorkspaceDTO,
  ) {
    return this.workspaceService.update(
      ownerId,
      workspaceId,
      updateWorkspaceDTO,
    );
  }
  // @Roles(UserRole.ADMIN,User.MANAGER)
  // @ApiBody({ type: updateWorkspaceDTO})
}
