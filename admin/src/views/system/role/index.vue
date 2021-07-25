<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-19 12:10:57
 * @LastEditTime: 2021-07-19 14:13:01
 * @Description: Modify here please
-->
<template>
  <div class="role-page">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加角色 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './role.data';
  import { getAdminRole, delRole } from '/@/api/system/role';
  import { useModal } from '/@/components/Modal';
  import RoleModal from './RoleModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'Account',
    components: {
      BasicTable,
      TableAction,
      RoleModal
    },
    setup() {
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '角色列表',
        api: getAdminRole,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      const handleSuccess = () => {
        reload();
      };
      // 添加
      const handleCreate = () => {
        openModal(true, {
          isUpdate: false,
        });
      };
      // 编辑
      const handleEdit = (record: Recordable) => {
        openModal(true, {
          record,
          isUpdate: true,
        });
      };
      // 删除
      const handleDelete = async (record: Recordable) => {
        await delRole(record._id)
        reload();
        createMessage.success("删除成功")
      };
      return { registerTable,registerModal, handleCreate, handleSuccess, handleEdit, handleDelete };
    },
  });
</script>
