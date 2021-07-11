import {
  Controller,
  Get,
  HttpException,
  Body,
  Param,
  Post,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Menu } from 'libs/db/models/menu.model';
import { Role } from 'libs/db/models/role.model';
import { InjectModel } from 'nestjs-typegoose';
import { addRoleDto } from './Dto/addRoleDto';
import { getRoleListDto } from './Dto/getRoleListDto';
import { editRoleDto } from './Dto/updateRoleDto';

@Controller('role')
@ApiTags('角色管理')
@UseGuards(AuthGuard('jwt-admin'))
@ApiBearerAuth()
export class RoleController {
  constructor(
    @InjectModel(Role) private roleModel: ReturnModelType<typeof Role>,
    @InjectModel(Menu) private menuModel: ReturnModelType<typeof Menu>,
  ) {}

  /**
   * 添加角色
   */
  @Post()
  @ApiOperation({ summary: '添加角色' })
  async addRole(@Body() addRoleForm: addRoleDto) {
    const result = await this.roleModel.create(addRoleForm as any);
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  /**
   * 获取角色列表
   */
  @Get()
  @ApiOperation({ summary: '角色列表' })
  async getRoleList(@Query() getRoleQuery: getRoleListDto) {
    const { pageNumber, pageSize } = getRoleQuery;
    const info = await this.roleModel
      .find()
      .limit(Number(pageSize || 10))
      .populate('roleIds')
      .skip(Number((pageNumber - 1) * pageSize))
      .exec();

    return {
      code: 1,
      message: '请求成功',
      result: info,
    };
  }

  /**
   *  通过角色获取菜单列表
   */
  @Get(':id')
  @ApiOperation({ summary: '通过角色获取菜单列表' })
  async getRoleMenuList(@Param() params) {
    const result = await this.roleModel
      .findById({ _id: params.id })
      .populate('menuIds');
    return {
      code: 1,
      message: '请求成功',
      result: result,
    };
  }

  /**
   * 更新角色信息
   */
  @Patch(':id')
  @ApiOperation({ summary: '编辑更新角色信息' })
  async updateRole(@Body() editRoleForm: editRoleDto, @Param('id') id: string) {
    if (editRoleForm.menuIds.includes('')) {
      editRoleForm.menuIds = [];
    }
    const result = await this.roleModel.findByIdAndUpdate(
      id,
      editRoleForm as any,
    );
    if (!result) {
      throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
    }

    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }
}
