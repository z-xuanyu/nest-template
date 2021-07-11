import { BasicPageParams } from '@/api/BasicResponseModel'

export interface DictItemModel {
  category: string
  createdAt: string
  description: string
  id: number
  label: string
  updatedAt: string
}

export interface DictListModel extends BasicPageParams {
  data: DictItemModel[]
}
