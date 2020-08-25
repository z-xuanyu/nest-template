import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiProperty,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from 'libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from 'apps/admin/src/auth/current-user.decorator';
class loginDto {
  @ApiProperty({ title: '手机号码' })
  phone: string;

  @ApiProperty({ title: '密码' })
  password: string;
}

@Controller('Auth')
@ApiTags('用户Auth')
export class AuthController {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService,
  ) {}

  // 用户登录
  @Post('Login')
  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('local-web'))
  async userLogin(@Body() loginDto: loginDto, @Req() req) {
    return {
      code: 1,
      data: {
        token: this.jwtService.sign(String(req.user._id)),
      },
      message: '登录成功',
    };
  }

  // 获取用户信息
  @Get()
  @ApiOperation({ summary: '用户信息' })
  @UseGuards(AuthGuard('jwt-web'))
  @ApiBearerAuth()
  async getUserInfo(@CurrentUser() user: UserDocument) {
    return user;
  }
}
