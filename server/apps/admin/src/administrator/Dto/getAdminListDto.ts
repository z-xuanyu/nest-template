import { ApiProperty } from '@nestjs/swagger';

export class getAdminDto {
  @ApiProperty({ title: '页数' })
  pageNumber?: number;

  @ApiProperty({ title: '条数' })
  pageSize?: number;
}
