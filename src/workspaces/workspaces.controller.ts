import { MailService } from './../mail/mail.service';
import { getObjectId } from './../utils/helper';
import { WorkspacePermission } from './../workspace-permission/workspace-permission.schema';
import { Workspace } from './workspaces.schema';
import { Post, Body, Get, Query, Put, Req } from '@nestjs/common';
import { Controller } from 'src/decorator/customController.decorator';
import { ApiBody } from '@nestjs/swagger';
//mongo
import { Types, ObjectId } from 'mongoose';
// dto
import { createWorkspaceDTO } from './dto/createWorkspaceDTO';
import { updateWorkspaceDTO } from './dto/updateWorkspaceDTO';
// services
import { WorkspacesService } from './workspaces.service';
import { UsersService } from './../users/users.service';
import { WorkspacePermissionService } from 'src/workspace-permission/workspace-permission.service';

import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/enums/role.enum';
import { User } from 'src/users/users.schema';
import { CreateWorkspacePermissionDto } from 'src/workspace-permission/dto/create-workspace-permission.dto';
import { Public } from 'src/decorator/isPublic.decorator';

@Controller('/workspaces')
export class WorkspacesController {
  constructor(
    private workspaceService: WorkspacesService,
    private userService: UsersService,
    private workspacePermissionService: WorkspacePermissionService,
    private mailService: MailService,
  ) {}
  @ApiBody({ type: createWorkspaceDTO })
  @Post('/create')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async create(@Req() req, @Body() createWorkspaceDTO: createWorkspaceDTO) {
    const workspace = await this.workspaceService.create(
      req.user._id,
      createWorkspaceDTO,
    );
    const WorkspacePermissionDTO: CreateWorkspacePermissionDto = {
      user: new Types.ObjectId(req.user._id),
      owner: new Types.ObjectId(req.user._id),
      workspace: new Types.ObjectId(workspace._id),
      roles: [UserRole.ADMIN, UserRole.MANAGER],
    };

    this.workspacePermissionService.create(WorkspacePermissionDTO);
    return workspace;
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
  @Get('/permission/findByUserId')
  findPermissionByUserId(@Req() req) {
    return this.workspacePermissionService.findByUserId(req.user._id);
  }

  @Get('/getMembers')
  getMembers(@Query('workspaceId') workspaceId: string) {
    return this.workspacePermissionService.getMembersByWorkspaceId(workspaceId);
  }
  @Put('/update')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  update(
    @Req() req,
    @Query('workspaceId') workspaceId: string,
    @Body() updateWorkspaceDTO: updateWorkspaceDTO,
  ) {
    return this.workspaceService.update(
      req.user._id,
      workspaceId,
      updateWorkspaceDTO,
    );
  }

  @Post('/invite-member')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async assignMember(
    @Req() req,
    @Query('workspaceId') workspaceId: string,
    @Query('userId') userId: string,
  ) {
    const WorkspacePermissionDTO: CreateWorkspacePermissionDto = {
      user: new Types.ObjectId(userId),
      owner: new Types.ObjectId(req.user._id),
      workspace: new Types.ObjectId(workspaceId),
      roles: [UserRole.MEMBER],
      isAccessInvite: false,
    };

    const newPermission = await this.workspacePermissionService.create(
      WorkspacePermissionDTO,
    );
    await this.mailService.sendAccessInvite(
      'trungdev26072001@gmail.com',
      newPermission._id,
    );
    return newPermission;
  }

  @Get('/access-invite')
  @Public()
  async accessInvite(
    @Query('workspacePermissionId') workspacePermissionId: string,
  ) {
    return await this.workspacePermissionService.update(workspacePermissionId, {
      isAccessInvite: true,
    });
  }

  // @Roles(UserRole.ADMIN,User.MANAGER)
  // @ApiBody({ type: updateWorkspaceDTO})
}
