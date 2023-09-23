import { AuthService } from './../auth/auth.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from './workspaces.schema';
import { Model } from 'mongoose';
import { createWorkspaceDTO } from './dto/createWorkspaceDTO';
import { updateWorkspaceDTO } from './dto/updateWorkspaceDTO';
import { getObjectId } from 'src/utils/helper';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>,
  ) {}

  async create(
    ownerId: string,
    workspace: createWorkspaceDTO,
  ): Promise<Workspace> {
    return this.workspaceModel.create({
      ...workspace,
      owner: getObjectId(ownerId),
    });
  }
  async findAll(): Promise<Workspace[]> {
    return this.workspaceModel.find().exec();
  }
  async findByOwnerId(ownerId: string): Promise<Workspace[]> {
    return this.workspaceModel.find({ ownerId }).exec();
  }
  async findById(workspaceId: string): Promise<Workspace> {
    return this.workspaceModel.findById(workspaceId).exec();
  }
  async update(
    owner: string,
    workspaceId: string,
    workspace: updateWorkspaceDTO,
  ): Promise<Workspace> {
    const targetWorkspace = await this.workspaceModel
      .findById(workspaceId)
      .exec();
    if (owner !== targetWorkspace.owner.toString()) {
      throw new BadRequestException('You are not owner of this workspace');
    }
    return this.workspaceModel.findByIdAndUpdate(workspaceId, workspace).exec();
  }
  async delete(workspaceId: string): Promise<Workspace> {
    return this.workspaceModel.findByIdAndDelete(workspaceId).exec();
  }
}
