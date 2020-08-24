import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { Admin } from 'libs/db/models/admin.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy) {
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
      throw new BadRequestException('用户名不正确');
    }
    if (!compareSync(password, admin.password)) {
      throw new BadRequestException('密码不正确');
    }
    return admin;
  }
}
