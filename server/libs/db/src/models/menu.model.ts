import { ApiProperty } from '@nestjs/swagger';
import { ModelOptions, prop, Ref } from '@typegoose/typegoose';

// 创建时间，更新时间
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Menu {
  @ApiProperty({ title: '菜单名称' })
  @prop()
  name: string;

  @ApiProperty({ title: '菜单栏icon' })
  @prop()
  icon: string;

  @ApiProperty({ title: '是否缓存', example: 0, default: 0 })
  @prop({ default: 0 })
  keepAlive: number;

  @ApiProperty({ title: '上级id', default: null })
  @prop({ ref: () => Menu, default: null })
  parentId: Ref<Menu> | null;

  @ApiProperty({ title: '排序', example: 0, default: 0 })
  @prop()
  sort: number;

  @ApiProperty({ title: '菜单url' })
  @prop()
  url: string;
}
