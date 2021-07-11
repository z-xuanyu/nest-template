import type { ColumnProps, TableProps } from 'ant-design-vue/lib/table/interface'
import type { PaginationProps } from 'ant-design-vue/lib/pagination/Pagination'

export interface Columns extends ColumnProps {
  actions?: any
  dataIndex: string
}

export type pageOption = Partial<typeof PaginationProps>

export interface Props extends Omit<TableProps, 'columns'> {
  columns: Columns[]
  rowKey: string | ((record: any) => string)
  pageOption: pageOption
  getListFunc: (prams) => any
}
