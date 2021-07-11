import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from 'libs/db/models/user.model';

export class JwtStrategy extends PassportStrategy(Strategy,'jwt-web') {
  constructor(
    @InjectModel(User) private adminModel: ReturnModelType<typeof User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    } as StrategyOptions);
  }

  // 校验token
  async validate(id) {
    return await this.adminModel.findById(id);
  }
}
