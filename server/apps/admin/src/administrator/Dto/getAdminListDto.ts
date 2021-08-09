/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-16 10:14:38
 * @LastEditTime: 2021-08-09 11:59:46
 * @Description: Modify here please
 */
import { ApiProperty } from '@nestjs/swagger';

export class getAdminDto {
  @ApiProperty({ title: '页数', default: 10,required: false })
  pageNumber: number;

  @ApiProperty({ title: '条数', default: 1, required: false })
  pageSize: number;

  @ApiProperty({ title: '名称',required: false })
  name: string

  @ApiProperty({ title: '状态', required: false })
  status: boolean
}