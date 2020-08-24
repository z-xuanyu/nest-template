import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Admin } from 'libs/db/models/admin.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: Admin,
  routes: {
    find: {
      decorators: [ApiOperation({ summary: '管理员列表' })],
    },
    create: {
      decorators: [ApiOperation({ summary: '添加管理员' })],
    },
    findOne: {
      decorators: [ApiOperation({ summary: '查看管理员信息' })],
    },
    update: {
      decorators: [ApiOperation({ summary: '更新管理员信息' })],
    },
    delete: {
      decorators: [ApiOperation({ summary: '删除管理员' })],
    },
  },
})
@Controller('Admin')
@ApiTags('Admin管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AdministratorController {
  constructor(
    @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>,
    @InjectModel(Admin) private model,
  ) {}
}
