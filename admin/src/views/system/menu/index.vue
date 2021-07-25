<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-19 12:10:57
 * @LastEditTime: 2021-07-23 10:26:47
 * @Description: Modify here please
-->
<template>
  <div class="menu-page">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
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
    <MenuModal @register="registerModal" @success="handleSuccess"/>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './menu.data';
  import { getMenuTree, delMenu } from '/@/api/system/menu';
  import { useModal } from '/@/components/Modal';
  import MenuModal from './MenuModal.vue'
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'Account',
    components: { BasicTable, TableAction, MenuModal },
    setup() {
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '账号列表',
        api: getMenuTree,
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
      // 编辑
      const handleEdit = (record: Recordable) => {
        openModal(true, {
          record,
          isUpdate: true,
        });
      };
      // 添加
      const handleCreate = () => {
        openModal(true, {
          isUpdate: false,
        });
      };

      const handleSuccess = () => {
        reload();
      };
      // 处理删除
      const handleDelete = async (record: Recordable) => {
        await delMenu(record._id)
        reload();
        createMessage.success("删除成功!")
      };
      return {
        handleEdit,
        handleDelete,
        registerModal,
        handleSuccess,
        handleCreate,
        registerTable,
      };
    },
  });
</script>
<style lang="less" scoped>
  .account-page {
    padding: 20px;
  }
</style>
