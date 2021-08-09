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
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiProperty,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { getAdminDto } from './Dto/getAdminListDto';
import { addAdminDto } from './Dto/addAdminDto';
import { editAdminDto } from './Dto/editAdminDto';
import { AdministratorService } from './administrator.service';
import { changeAdminStatusDto } from './Dto/changeAdminStatusDto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseResponseResult, TableResponseResult } from '../BaseResponseResult';
import { Admin } from 'libs/db/models/admin.model';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}


@Controller('Admin')
@ApiTags('Admin管理')
@UseGuards(AuthGuard('jwt-admin'))
@ApiBearerAuth()
export class AdministratorController {
  constructor(private adminService: AdministratorService) { }

  /**
   * 获取管理员列表
   */
  @Get()
  @ApiOperation({ summary: '管理员列表' })
  async getAdminList(@Query() getAdminQuery: getAdminDto):Promise<BaseResponseResult<TableResponseResult<Admin>>> {
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
  async addAdmin(@Body() addAdminForm: addAdminDto):Promise<BaseResponseResult<Admin>> {
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
  ):Promise<BaseResponseResult<Admin>> {
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
  async delAdmin(@Param('id') id: string):Promise<BaseResponseResult<Admin>> {
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
  async changeAdminStatus(@Body() adminForm: changeAdminStatusDto):Promise<BaseResponseResult<Admin>> {
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

  /**
   * 上传头像
   */
  @Post('avatarUpload')
  @ApiOperation({ summary: '头像上传' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '头像上传',
    type: FileUploadDto,
  })
  async avatarUpload(@UploadedFile() file: any) {
    return file;
  }
}