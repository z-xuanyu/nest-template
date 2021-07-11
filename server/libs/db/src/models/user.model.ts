import { ApiProperty } from '@nestjs/swagger';
import { prop, ModelOptions, DocumentType } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';

export type UserDocument = DocumentType<User>;
// 创建时间，更新时间
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @ApiProperty({ title: '手机号' })
  @prop({ unique: true })
  phone: string;

  @ApiProperty({ title: '密码' })
  @prop({
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;

  @ApiProperty({ title: '微信openid' })
  @prop({ select: false, required: true, unique: true })
  openid: string;

  @ApiProperty({ title: '用户头像' })
  @prop()
  avatar: string;

  @ApiProperty({ title: '用户性别', example: 1 })
  @prop()
  gender: number;

  @ApiProperty({ title: '用户呢称' })
  @prop()
  nickName: string;
}
