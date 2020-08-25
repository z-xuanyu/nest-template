import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { User } from 'libs/db/models/user.model';

export class LocalStrategy extends PassportStrategy(Strategy,'local-web') {
  constructor(
    @InjectModel(User) private adminModel: ReturnModelType<typeof User>,
  ) {
    super({
      usernameField: 'phone',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  // 校验密码
  async validate(phone: string, password: string) {
    const user = await this.adminModel.findOne({ phone }).select('+password');

    if (!user) {
      throw new BadRequestException('用户名不正确');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确');
    }
    return user;
  }
}
