import type { TableProps } from 'ant-design-vue/lib/table/interface'

/**
 * 表格行拖拽
 * @param dataSource table数据集合
 * @returns customRow 行属性方法
 */
export function useDragRow<T>(dataSource: Array<T>): TableProps['customRow'] {
  let dragItem: T
  let targItem: T
  const customRow = (record: T) => {
    return {
      draggable: true,
      ondrag(e: DragEvent) {
        dragItem = record
      },
      ondrop(e: DragEvent) {
        targItem = record
      },
      ondragend(e: DragEvent) {
        if (dragItem !== targItem) {
          const dragItemIndex = dataSource.indexOf(dragItem)
          const targItemIndex = dataSource.indexOf(targItem)
          // 解构交换
          ;[dataSource[dragItemIndex], dataSource[targItemIndex]] = [
            dataSource[targItemIndex],
            dataSource[dragItemIndex]
          ]
        }
      },
      ondragover(e: DragEvent) {
        return false
      }
    }
  }
  return customRow
}
