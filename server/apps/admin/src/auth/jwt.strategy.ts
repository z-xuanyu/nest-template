import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Admin } from 'libs/db/models/admin.model';

export class JwtStrategy extends PassportStrategy(Strategy,'jwt-admin') {
  constructor(
    @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'xuanyu',
    } as StrategyOptions);
  }

  // 校验token
  async validate(id) {
    return await this.adminModel.findById(id);
  }
}
