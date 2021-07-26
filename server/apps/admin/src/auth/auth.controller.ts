/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-16 10:14:38
 * @LastEditTime: 2021-07-26 10:52:42
 * @Description: Modify here please
 */
import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Admin, AdminDocument } from 'libs/db/models/admin.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { loginDto } from './dto/loginDto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';
import { regDto } from './dto/regDto';
@Controller('Auth')
@ApiTags('管理员Auth')
export class AuthController {
  constructor(
    @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>,
    private jwtService: JwtService,
  ) {}

  // 注册管理员

  @Post('RegAdmin')
  @ApiOperation({ summary: 'Admin注册' })
  async regAdmin(@Body() regDto: regDto) {
    try {
      await this.adminModel.create(regDto as Admin);
      return { code: 1, message: '注册成功' };
    } catch (error) {
      if (error.code == 11000) return { code: 0, message: '邮箱已存在！' };
    }
  }

  // 管理员登录
  @Post('AdminLogin')
  @ApiOperation({ summary: 'Admin登录' })
  @UseGuards(AuthGuard('local-admin'))
  async adminLogin(@Body() loginDto: loginDto, @Req() req) {
    const token = this.jwtService.sign(String(req.user._id),{ expiresIn: process.env.JWT_EXPIRESIN });
    return {
      code: 1,
      result: { 
       token,
       userInfo:{
         avatar:req.user.avatar,
         email:req.user.email,
         name:req.user.name,
         expiresIn: process.env.JWT_EXPIRESIN
       }
       },
      message: '登录成功',
    };
  }
  // 管理员信息
  @Get('getAdminInfo')
  @ApiOperation({ summary: '管理信息' })
  @UseGuards(AuthGuard('jwt-admin'))
  @ApiBearerAuth()
  async getAdminInfo(@CurrentUser() user: AdminDocument) {
    return {
      code: 1,
      result: user,
      message: '请求成功'
    };
  }
}
