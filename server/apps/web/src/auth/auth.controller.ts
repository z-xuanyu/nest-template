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

class regDto {
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

  // 用户注册
  @Post('RegUser')
  @ApiOperation({ summary: '用户注册' })
  async userReg(@Body() regDto: regDto) {
    try {
      await this.userModel.create(regDto);
      return { code: 1, message: '注册成功' };
    } catch (error) {
      if (error.code == 11000) return { code: 0, message: '用户已存在！' };
    }
  }
  // 用户登录
  @Post('LoginUser')
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
