/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-16 10:14:38
 * @LastEditTime: 2021-07-26 10:46:33
 * @Description: Modify here please
 */
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Admin } from 'libs/db/models/admin.model';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    } as StrategyOptions);
  }

  // 校验token
  async validate(payload) {
  
    return await this.adminModel.findById(payload.id);
  }
}
