import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorator/isPublic.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/enums/role.enum';
@Controller('/task')
export class TaskController {
  @Public()
  @Get()
  getAllTask() {
    return 'get all task';
  }

  @Roles(UserRole.ADMIN)
  @Get('/admin')
  getTaskAdmin() {
    return 'get task admin';
  }
}
