import { changeAdminStatus, delAdminAccount, patchAdminAccount } from '@/api/system/account'
import { formatDate } from '@/utils/common'
import { useFormModal } from '@/hooks/useFormModal'
import { getFormSchema } from './form-schema'
import { Modal } from 'ant-design-vue'
export const columns: TableColumn[] = [
  // 账号列表
  {
    title: '用户名',
    dataIndex: 'name'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '所属角色',
    dataIndex: 'roleIds',
    slots: {
      customRender: 'roleIds'
    },
    slotsType: 'format',
    slotsFunc: (roleIds) => roleIds.map((it) => it.name).join(', ')
  },
  {
    title: '状态',
    dataIndex: 'status',
    slots: {
      customRender: 'status'
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    slots: {
      customRender: 'createdAt'
    },
    slotsType: 'format',
    slotsFunc: (val) => formatDate(val)
  },
  {
    title: '最后更新时间',
    dataIndex: 'updatedAt',
    slots: {
      customRender: 'updatedAt'
    },
    slotsType: 'format',
    slotsFunc: (val) => formatDate(val)
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 250,
    slots: {
      customRender: 'action'
    },
    actions: [
      {
        type: 'button', // 控制类型，默认为a,可选： select | button | text
        text: '编辑',
        permission: {
          // 权限
          action: 'update',
          effect: 'disabled'
        },
        props: {
          type: 'warning'
        },
        func: ({ record }, refreshTableData) =>
          useFormModal({
            title: '编辑账号',
            fields: { ...record, roleIds: record?.roleIds.map((item) => item._id) },
            hiddenFields: ['password', 'email'],
            formSchema: getFormSchema(),
            handleOk: async (modelRef, state) => {
              const { name, roleIds } = modelRef

              // 处理参数格式问题
              let newRoleIds: Array<string> = []
              if (roleIds.toString().includes(',')) {
                newRoleIds = roleIds.toString().split(',')
              } else {
                newRoleIds.push(roleIds.toString())
              }
              const params = {
                name,
                roleIds: newRoleIds
              }
              return await patchAdminAccount(record._id, params).then(() => refreshTableData())
            }
          })
      },
      {
        type: 'button',
        text: '修改状态',
        permission: {
          // 权限
          action: 'update',
          effect: 'disabled'
        },
        props: {
          type: 'primary'
        },
        func: async ({ record }, refreshTableData) => {
          Modal.confirm({
            title: `您确认要${record.status ? '禁用' : '开启'}该账号？`,
            onOk: async () => {
              await changeAdminStatus({ adminId: record._id, status: !record.status}).then(() =>
                refreshTableData()
              )
            },
            onCancel() {}
          })
        }
      },
      {
        type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
        text: '删除',
        permission: {
          // 权限
          action: 'delete',
          effect: 'disabled'
        },
        props: {
          type: 'danger'
        },
        func: async ({ record }, refreshTableData) =>
          await delAdminAccount(record._id).then(() => refreshTableData())
      }
    ]
  }
]
