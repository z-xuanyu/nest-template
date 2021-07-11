import { prop, ModelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Role } from './role.model';
export type AdminDocument = DocumentType<Admin>;
// 添加创建时间、更新时间字段
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Admin {
  @ApiProperty({ title: '名称' })
  @prop({ required: true })
  name: string;

  @ApiProperty({ title: '邮箱' })
  @prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ title: '管理员头像' })
  @prop({ default: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640' })
  avatar: string;

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

  @ApiProperty({ title: '关联的角色' })
  @prop({ ref: 'Role' })
  roleIds: Ref<Role>[] | [];

  @ApiProperty({ title: '是否超级管理员', example: false, default: false })
  @prop({ default: false })
  isSuper: boolean;

  @ApiProperty({ title: '管理员状态', example: false, default: true })
  @prop({ default: true })
  status: boolean;
}
