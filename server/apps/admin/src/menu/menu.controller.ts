import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { ReturnModelType } from '@typegoose/typegoose';
import { CurrentUser } from 'apps/web/src/auth/current-user.decorator';
import { Admin, AdminDocument } from 'libs/db/models/admin.model';
import { Menu } from 'libs/db/models/menu.model';
import { Role } from 'libs/db/models/role.model';
import { InjectModel } from 'nestjs-typegoose';
import { AddMenuDto } from './Dto/addMenuDto';
import { UpdateMenuDto } from './Dto/updateMenuDto';

@Controller('menu')
@ApiTags('菜单管理')
@UseGuards(AuthGuard('jwt-admin'))
@ApiBearerAuth()
export class MenuController {
  constructor(
    @InjectModel(Menu) private menuModel: ReturnModelType<typeof Menu>,
    @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>,
    @InjectModel(Role) private roleModel: ReturnModelType<typeof Role>,
  ) {}

  @Get('roleMenus')
  @ApiOperation({ summary: '根据角色获取菜单列表' })
  async menus(@CurrentUser() user: AdminDocument) {
    // 通过admin查询该管理员的角色
    const roles = await this.adminModel
      .findById({ _id: user._id })
      .populate('roleIds');
    // 获取角色的菜单
    let menus: any = [];
    for (let key in roles.roleIds) {
      let rolesItem: any = roles.roleIds[key];
      const menuListRes = await this.roleModel
        .findById({ _id: rolesItem._id })
        .populate('menuIds');

      menus = menus.concat(menuListRes.menuIds);
    }

    // 菜单去重
    let MenuObj = {};
    const allMenus = menus.reduce((cur, next) => {
      MenuObj[next._id] ? '' : (MenuObj[next._id] = true && cur.push(next));
      return cur;
    }, []);
    return {
      code: 1,
      message: '请求成功',
      result: allMenus,
    };
  }

  /**
   * 获取角色列表下菜单列表
   */
  @Get('list')
  @ApiOperation({ summary: '获取菜单列表' })
  async getMenuList() {
    const result = await this.menuModel.find();
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
    const result = await this.menuModel.create(addMenuForm as any);
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
    const result = await this.menuModel.findByIdAndUpdate(id, updateMenuForm as any);
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
   * 删除菜单
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除菜单' })
  @ApiParam({
    name: 'id',
    description: '菜单id',
  })
  async delMenu(@Param('id') id: string) {
    const result = await this.menuModel.findByIdAndDelete({ _id: id });
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
