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
    const res = await this.adminModel.create(regDto);
    if (res) return { code: 1, message: '注册成功' };
  }

  // 管理员登录
  @Post('AdminLogin')
  @ApiOperation({ summary: 'Admin登录' })
  @UseGuards(AuthGuard('local-admin'))
  async adminLogin(@Body() loginDto: loginDto, @Req() req) {
    const token = this.jwtService.sign(String(req.user._id));
    return {
      code: 1,
      data: { token },
      message: '登录成功',
    };
  }
  // 管理员信息
  @Get('getAdminInfo')
  @ApiOperation({ summary: '管理信息' })
  @UseGuards(AuthGuard('jwt-admin'))
  @ApiBearerAuth()
  async getAdminInfo(@CurrentUser() user: AdminDocument) {
    return user;
  }
}
