
export const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: 'url',
    dataIndex: 'url'
  },
  {
    title: 'icon图标',
    dataIndex: 'icon',
    slots: {
      customRender: 'icon'
    }
  },
  {
    title: '排序',
    dataIndex: 'sort'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    slots: {
      customRender: 'createdAt'
    },
  },
  {
    title: '最后更新时间',
    dataIndex: 'updatedAt',
    slots: {
      customRender: 'updatedAt'
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 400,
    slots: {
      customRender: 'action'
    }
  }
]