import { ApiProperty } from '@nestjs/swagger';

export class MenuParamDto {
  @ApiProperty({ title: '页数' })
  id: string | object
}
