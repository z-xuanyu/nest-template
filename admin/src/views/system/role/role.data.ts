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
import dayjs from 'dayjs';
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 160,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm')
    }
  },
];

//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    labelWidth: 100,
    colProps: { span: 4 },
  },
];

// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入角色名称',
    }
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
    required: true,
    componentProps: {
      placeholder: '请输入角色的描述',
    }
  },
  {
    field: 'menuIds',
    label: '菜单',
    component: 'Input',
    slot: 'menuIds'
  }
];
