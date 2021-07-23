/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-19 14:59:18
 * @LastEditTime: 2021-07-19 17:54:03
 * @Description: Modify here please
 */
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
export const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: 'url',
    dataIndex: 'url',
  },
  {
    title: 'icon图标',
    dataIndex: 'icon',
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    slots: {
      customRender: 'createdAt',
    },
  },
  {
    title: '最后更新时间',
    dataIndex: 'updatedAt',
    slots: {
      customRender: 'updatedAt',
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 400,
    slots: {
      customRender: 'action',
    },
  },
];
