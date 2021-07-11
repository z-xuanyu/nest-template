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
import axios from 'axios';
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


class wxLoginDto {
  @ApiProperty({ title: '微信用户code' })
  code: string;

  @ApiProperty({ title: '用户名称' })
  nickName: string;

  @ApiProperty({ title: '用户头像' })
  avatar: string;
}
@Controller('Auth')
@ApiTags('用户Auth')
export class AuthController {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService,
  ) {}

  // 小程序登录

  @Post('wxLogin')
  @ApiOperation({ summary: '小程序登录' })
  async wxLogin(@Body() wxLoginDto: wxLoginDto) {
    // 小程序appId
    const appId = 'wx38e9ca4801b37264';
    // 小程序秘钥
    const appSecret = '6c19ad691115d8bc3d25753b3376c2ac';
    // 获取用户登录唯一标识openid
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${wxLoginDto.code}&grant_type=authorization_code`;
    const res: any = await axios.get(url);
    // 查询openid是否已经存在，，
    const openid = res.data.openid;
    // 检查是否合法openid

    if (!openid) {
      return { code: 0, message: 'openid不合法！' };
    }
      // const session_key = res.data.session_key;
      const userInfo: any = await this.userModel
        .findOne({
          openid: openid,
        })
        .select('+openid');
    // 如果微信用户不存在，创建一个新的用户
    if (!userInfo) {
      const newUser = await this.userModel.create({
        openid,
        nickName: wxLoginDto.nickName,
        avatar: wxLoginDto.avatar
      } as any);
      // 生产用户token
      if (newUser) {
        return {
          code: 1,
          token: this.jwtService.sign(newUser.id),
          data: newUser,
          message: '登录成功',
        };
      }
    } else {
      // 如果用户已经存在直接生成token令牌
      return {
        code: 1,
        data: userInfo,
        token: this.jwtService.sign(userInfo.id),
        message: '登录成功',
      };
    }
  }
  // 用户注册
  @Post('RegUser')
  @ApiOperation({ summary: '用户注册' })
  async userReg(@Body() regDto: regDto) {
    try {
      await this.userModel.create(regDto as any);
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
