import { BasicPageParams } from '@/api/BasicResponseModel'

export interface AccessItem {
  _id: number
  createdAt: string
  updatedAt: string
  name: string
  icon: string
  url: string
  parentId: string | null
  sort: number
  keepAlive: number
  description: string | null
  children?: boolean
}

export interface AccessResultModel extends BasicPageParams {
  data: AccessItem[]
}

export interface ModuleItem {
  id: number
  moduleName: string
}
