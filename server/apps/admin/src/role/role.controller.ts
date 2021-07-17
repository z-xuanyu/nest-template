import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Query,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { addRoleDto } from './Dto/addRoleDto';
import { getRoleListDto } from './Dto/getRoleListDto';
import { editRoleDto } from './Dto/updateRoleDto';
import { RoleService } from './role.service';

@Controller('role')
@ApiTags('角色管理')
@UseGuards(AuthGuard('jwt-admin'))
@ApiBearerAuth()
export class RoleController {
  constructor(private roleService: RoleService) {}

  /**
   * 添加角色
   */
  @Post()
  @ApiOperation({ summary: '添加角色' })
  async addRole(@Body() addRoleForm: addRoleDto) {
    const result = await this.roleService.addRole(addRoleForm);
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
    const result = await this.roleService.getRoleList(getRoleQuery);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  /**
   *  通过角色获取菜单列表
   */
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '角色id',
  })
  @ApiOperation({ summary: '通过角色获取菜单列表' })
  async getRoleMenuList(@Param('id') id: string) {
    const result = await this.roleService.getRoleInfo(id);
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
  @ApiParam({
    name: 'id',
    description: '角色id',
  })
  @ApiOperation({ summary: '编辑更新角色信息' })
  async updateRole(@Body() editRoleForm: editRoleDto, @Param('id') id: string) {
    if (editRoleForm.menuIds.includes('')) {
      editRoleForm.menuIds = [];
    }
    const result = await this.roleService.updateRole(editRoleForm, id);

    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }


  /** 
   * 删除角色 
   */
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '角色id',
  })
  async delRole(@Param('id') id: string) {
    const result = await this.roleService.delRole(id);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }
}
