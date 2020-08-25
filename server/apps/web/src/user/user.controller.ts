import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: User,
  routes: {
    find: {
      decorators: [ApiOperation({ summary: '用户列表' })],
    },
    create: {
      decorators: [ApiOperation({ summary: '添加用户' })],
    },
    findOne: {
      decorators: [ApiOperation({ summary: '查看用户信息' })],
    },
    update: {
      decorators: [ApiOperation({ summary: '更新用户信息' })],
    },
    delete: {
      decorators: [ApiOperation({ summary: '删除用户' })],
    },
  },
})
@Controller('user')
@ApiTags('用户')
@UseGuards(AuthGuard('jwt-web'))
@ApiBearerAuth()
export class UserController {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
    @InjectModel(User) private model,
  ) {}
}
