import { Injectable } from '@nestjs/common';
import { CreateWorkspacePermissionDto } from './dto/create-workspace-permission.dto';
import { UpdateWorkspacePermissionDto } from './dto/update-workspace-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WorkspacePermission } from './workspace-permission.schema';
import { Model, Types } from 'mongoose';
import { getObjectId } from 'src/utils/helper';

@Injectable()
export class WorkspacePermissionService {
  constructor(
    @InjectModel(WorkspacePermission.name)
    private workspacePermissionModel: Model<WorkspacePermission>,
  ) {}
  create(createWorkspacePermissionDto: CreateWorkspacePermissionDto) {
    return this.workspacePermissionModel.create({
      ...createWorkspacePermissionDto,
    });
  }

  findAll() {
    return `This action returns all workspacePermission`;
  }
  findOne(id: number) {
    return `This action returns all workspacePermission`;
  }

  findByUserId(userId: string) {
    return this.workspacePermissionModel
      .find({ user: getObjectId(userId) })
      .populate({
        path: 'workspace', // Populate the 'workspaceId' reference
        populate: {
          path: 'boards', // Populate the 'boardIds' array inside the workspace
          model: 'Board', // The model to use for populating boards
        },
      })
      .exec();
  }

  update(
    id: number,
    updateWorkspacePermissionDto: UpdateWorkspacePermissionDto,
  ) {
    return `This action updates a #${id} workspacePermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspacePermission`;
  }
}
