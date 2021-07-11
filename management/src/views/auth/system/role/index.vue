<template>
  <dynamic-table
    ref="tableRef"
    :columns="columns"
    :get-list-func="getAdminRole"
    rowKey="_id"
    :row-selection="rowSelection"
    @change="paginationChange"
  >
    <template #title>
      <a-button
        v-permission="{ action: 'create', effect: 'disabled' }"
        type="primary"
        @click="addItem"
      >
        添加
      </a-button>
      <a-button
        v-permission="{ action: 'delete' }"
        :disabled="isDisabled"
        type="primary"
        @click="deleteItems"
      >
        删除
      </a-button>
    </template>
  </dynamic-table>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, createVNode, computed, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { DynamicTable } from '@/components/dynamic-table'
import { delAdminRole, getAdminRole, postAdminRole } from '@/api/system/role'
import { columns } from './columns'
import { hasPermission } from '@/utils/permission/hasPermission'
import { useFormModal } from '@/hooks/useFormModal'
import { getFormSchema } from './form-schema'

export default defineComponent({
  name: 'SystemRole',
  components: {
    DynamicTable
  },
  setup() {
    const tableRef = ref<any>(null)

    const paginationChange = (pagination, filters, sorter, { currentDataSource }) => {
      console.log(pagination, filters, sorter, { currentDataSource }, '分页改变了！')
    }

    const state = reactive({
      tableLoading: false,
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          state.rowSelection.selectedRowKeys = selectedRowKeys
        },
        selectedRowKeys: []
      }
    })

    // 删除多项
    const deleteItems = () => {
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionCircleOutlined),
        content: '您确定要删除所有选中吗？',
        onOk: async () => {
          await delAdminRole(state.rowSelection.selectedRowKeys.toString())
          tableRef.value.refreshTableData()
          state.rowSelection.selectedRowKeys = []
        }
      })
    }
    // 添加角色
    const addItem = () => {
      useFormModal({
        title: '添加角色',
        formSchema: getFormSchema(),
        handleOk: async (modelRef, state) => {
          const { description, name, menuIds } = modelRef

          let newMenuIds:Array<string> = [] 
          if(menuIds.toString().includes(",")){
            newMenuIds = menuIds.toString().split(",")
          }else{
            newMenuIds.push(menuIds.toString())
          }
          const params = {
            description,
            name,
            menuIds: newMenuIds
          }
          await postAdminRole(params)
          tableRef.value.refreshTableData()
        }
      })
      // useCreateModal(OperateModal, {
      //   callback: () => tableRef.value.refreshTableData()
      // })
    }
    const isDisabled = computed(() => state.rowSelection.selectedRowKeys.length == 0)

    return {
      ...toRefs(state),
      columns,
      tableRef,
      isDisabled,
      getAdminRole,
      paginationChange,
      addItem,
      deleteItems
    }
  }
})
</script>
