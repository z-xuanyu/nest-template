import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { getAdminDto } from './Dto/getAdminListDto';
import { addAdminDto } from './Dto/addAdminDto';
import { editAdminDto } from './Dto/editAdminDto';
import { AdministratorService } from './administrator.service';
import { changeAdminStatusDto } from './Dto/changeAdminStatusDto';



@Controller('Admin')
@ApiTags('Admin管理')
@UseGuards(AuthGuard('jwt-admin'))
@ApiBearerAuth()
export class AdministratorController {
  constructor(private adminService: AdministratorService) {}

  /**
   * 获取管理员列表
   */
  @Get()
  @ApiOperation({ summary: '管理员列表' })
  async getAdminList(@Query() getAdminQuery: getAdminDto) {
    const result = await this.adminService.getAdminList(getAdminQuery);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  /**
   * 添加管理员
   */
  @Post()
  @ApiOperation({ summary: '添加管理员' })
  async addAdmin(@Body() addAdminForm: addAdminDto) {
    const result = await this.adminService.createAdmin(addAdminForm);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  /**
   * 更新管理员信息
   */
  @Patch(':id')
  @ApiOperation({ summary: '编辑管理员' })
  @ApiParam({ name: 'id', description: '管理员id' })
  async updateAdmin(
    @Body() editAdminForm: editAdminDto,
    @Param('id') id: string,
  ) {
    const result = await this.adminService.updateAdmin(editAdminForm, id);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  /**
   * 删除管理员
   */
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '管理员id',
  })
  @ApiOperation({ summary: '删除管理员' })
  async delAdmin(@Param('id') id: string) {
    const result = await this.adminService.deleteAdmin(id);
    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }

  /**
   * 改变管理员状态
   */

  @Put('/changeStatus')
  @ApiOperation({ summary: '改变管理员状态' })
  async changeAdminStatus(@Body() adminForm: changeAdminStatusDto) {
    console.log(adminForm, 5454);
    const result = await this.adminService.changeAdminStatus(
      adminForm.adminId,
      adminForm.status,
    );

    return {
      code: 1,
      message: '请求成功',
      result,
    };
  }
}