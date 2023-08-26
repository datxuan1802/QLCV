import { Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/decorator/isPublic.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/enums/role.enum';
import { Controller } from 'src/decorator/customController.decorator';
@Controller('/task')
export class TaskController {
  @Public()
  @Get()
  getAllTask() {
    return 'get all task';
  }

  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @Get('/admin')
  getTaskAdmin() {
    return 'get task admin';
  }
}
