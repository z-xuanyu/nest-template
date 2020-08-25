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
  @prop({ required: true, unique: true })
  phone: string;

  @ApiProperty({ title: '密码' })
  @prop({
    required: true,
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;
}
