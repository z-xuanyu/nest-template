export interface DataItem {
  _id: string | object | number
  name: string
  icon: string
  keepAlive: boolean
  sort: number
  createdAt: string
  updatedAt: string,
  parentId?: string | null
  children?: DataItem[] | null
}