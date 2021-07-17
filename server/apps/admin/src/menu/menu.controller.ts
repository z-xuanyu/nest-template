import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'apps/web/src/auth/current-user.decorator';
import { AdminDocument } from 'libs/db/models/admin.model';
import { AddMenuDto } from './Dto/addMenuDto';
import { UpdateMenuDto } from './Dto/updateMenuDto';
import { MenuService } from './menu.service';

@Controller('menu')
@ApiTags('菜单管理')
@UseGuards(AuthGuard('jwt-admin'))
@ApiBearerAuth()
export class MenuController {
  constructor(
    private menuService: MenuService,
  ) {}

  /**
   * 获取登录人权限菜单列表
   */
  @Get('roleMenus')
  @ApiOperation({ summary: '获取登录人权限菜单列表' })
  async menus(@CurrentUser() user: AdminDocument) {
    const result = await this.menuService.getMenuListByRoleAndAdmin(user._id);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  /**
   * 获取角色列表下菜单列表
   */
  @Get('list')
  @ApiOperation({ summary: '获取菜单列表' })
  async getMenuList() {
    const result = await this.menuService.getMenuList();
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  /**
   * 添加菜单栏导航
   */
  @Post()
  @ApiOperation({ summary: '添加菜单' })
  async addMenu(@Body() addMenuForm: AddMenuDto) {
    if (!addMenuForm.parentId) {
      addMenuForm.parentId = null;
    }
    const result = await this.menuService.addMenu(addMenuForm);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  /**
   * 编辑更新菜单
   */
  @Patch(':id')
  @ApiOperation({ summary: '编辑更新菜单' })
  @ApiParam({
    name: 'id',
    description: '菜单id',
  })
  async updateMenu(
    @Param('id') id: string,
    @Body() updateMenuForm: UpdateMenuDto,
  ) {
    const result = await this.menuService.updateMenu(updateMenuForm, id);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  /**
   * 删除菜单
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除菜单' })
  @ApiParam({
    name: 'id',
    description: '菜单id',
  })
  async delMenu(@Param('id') id: string) {
    const result = await this.menuService.delMenu(id);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }
}
