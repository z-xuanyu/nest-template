import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Admin } from 'libs/db/models/admin.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { loginDto } from './dto/loginDto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
@Controller('Auth')
@ApiTags('管理员Auth')
@UseGuards(AuthGuard('local-admin'))
export class AuthController {
  constructor(
    @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>,
    private jwtService: JwtService,
  ) {}

  @Post('AdminLogin')
  @ApiOperation({ summary: 'Admin登录' })
  async adminLogin(@Body() loginDto: loginDto, @Req() req) {
    const token = this.jwtService.sign(String(req.user._id));
    return {
      code: 1,
      data: { token },
      message: '登录成功',
    };
  }

  @Get('getAdminInfo')
  @ApiOperation({ summary: '管理信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getAdminInfo() {
    return {};
  }
}
