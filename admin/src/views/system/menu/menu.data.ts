/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-20 10:39:58
 * @LastEditTime: 2021-07-23 16:44:45
 * @Description: Modify here please
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import dayjs from 'dayjs';
import { Icon } from '/@/components/Icon';
export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 80,
    align: 'left',
  },
  {
    title: 'url',
    dataIndex: 'url',
    width: 80,
    align: 'left',
  },
  {
    title: 'icon',
    dataIndex: 'icon',
    width: 80,
    align: 'left',
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '组件名称',
    dataIndex: 'componentName',
    width: 80,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 80,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
    customRender: ({ record }) => {
      return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm');
    },
  },
];

//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 4 },
  },
];
// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入菜单名称',
    }
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      placeholder: '请选择上级',
      replaceFields: {
        title: 'name',
        key: '_id',
        value: '_id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'url',
    label: '路由URL',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入路由URL',
    }
  },
  {
    field: 'componentName',
    label: '组件名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入菜单关联组件名称',
    }
  },
  {
    field: 'icon',
    label: '菜单图标',
    component: 'IconPicker',
    required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    componentProps: {
      placeholder: '请输入排序',
    }
  },
  {
    field: 'keepAlive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
  },
];
