import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacePermissionService } from './workspace-permission.service';

describe('WorkspacePermissionService', () => {
  let service: WorkspacePermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspacePermissionService],
    }).compile();

    service = module.get<WorkspacePermissionService>(WorkspacePermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
