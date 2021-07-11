// create-api.ts
import { createVNode, render, VNode } from 'vue'
import FormModal from './form-modal.vue'

interface ModalInstance {
  remove(): void
  $updateProps(props: any): void
}

interface Options {
  handleOk: (modelRef: any, state) => Promise<any> // 点击提交表单
  formSchema: FormSchema // 表单描述属性
  fields?: object // 字段默认填充值，一般编辑表单是传入
  hiddenFields?: string[] // 需要隐藏的表单项
  [key: string]: any
}

/**
 * 创建表单模态框
 * @param modalOptions
 * @param formOptions
 */
export const useFormModal = (options: Options): VNode<ModalInstance> => {
  // 组件实例
  let formModal
  const container = document.createElement('div')
  // 移除组件
  const remove = () => {
    formModal = null
    render(null, container)
    container.remove()
  }
  formModal = createVNode(FormModal, { ...options, remove })
  render(formModal, container)
  return formModal
}
