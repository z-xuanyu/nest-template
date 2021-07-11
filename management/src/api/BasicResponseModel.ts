export interface BasicResponseModel<T = any> {
  code: number
  message: string
  result: T
}
export interface BasicPageParams {
  pageNumber: number
  pageSize: number
  total: number
}
