import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesGateway } from './workspaces.gateway';

describe('WorkspacesGateway', () => {
  let gateway: WorkspacesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspacesGateway],
    }).compile();

    gateway = module.get<WorkspacesGateway>(WorkspacesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
