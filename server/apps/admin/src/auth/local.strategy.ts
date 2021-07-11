import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { Admin } from 'libs/db/models/admin.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy,'local-admin') {
  constructor(
    @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  // 校验密码
  async validate(email: string, password: string) {
    const admin = await this.adminModel.findOne({ email }).select('+password');

    if (!admin) {
      throw new HttpException('用户不存在,请联系管理员', HttpStatus.OK);
    }
    if (!compareSync(password, admin.password)) {
      throw new HttpException('密码不正确', HttpStatus.OK);
    }
    if (!admin.status) {
      throw new HttpException('您的账号已被禁用，请联系管理员', HttpStatus.OK);
    }
    return admin;
  }
}
