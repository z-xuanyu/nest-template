import { ApiProperty } from "@nestjs/swagger"
import { ModelOptions, prop, Ref } from "@typegoose/typegoose"
import { Menu } from "./menu.model";
// 创建时间，更新时间
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Role {
  @ApiProperty({ title: '角色名' })
  @prop()
  name: string;

  @ApiProperty({ title: '角色描述' })
  @prop()
  description: string;

  @ApiProperty({ title: "关联的菜单" })
  @prop({ ref: 'Menu' ,default: []})
  menuIds: Ref<Menu | void>[];
}

