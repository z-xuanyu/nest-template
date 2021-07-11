<template>
  <dynamic-table
    ref="tableRef"
    :columns="columns"
    :get-list-func="getAdminAccount"
    rowKey="_id"
    :row-selection="rowSelection"
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
    <!-- 角色 -->
    <template #roleIds="{ record }">
      <a-tag v-for="item in record.roleIds" :key="item._id" color="#66DE93">{{ item.name }} </a-tag>
    </template>
    <!-- 状态 -->
    <template #status="{ record }">
      <a-tag :color="record.status ? '#108ee9' : '#f50'">{{
        record.status ? '开启' : '禁用'
      }}</a-tag>
    </template>
  </dynamic-table>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, createVNode, computed, ref } from 'vue'
import { Modal, Tag } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { DynamicTable } from '@/components/dynamic-table'
import { delAdminAccount, getAdminAccount, postAdminAccount } from '@/api/system/account'
import { columns } from './columns'
import { useFormModal } from '@/hooks/useFormModal'
import { getFormSchema } from './form-schema'

export default defineComponent({
  name: 'SystemAccount',
  components: {
    DynamicTable,
    [Tag.name]: Tag
  },
  setup() {
    const tableRef = ref<any>(null)

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
          await delAdminAccount(state.rowSelection.selectedRowKeys.toString())
          tableRef.value.refreshTableData()
          state.rowSelection.selectedRowKeys = []
        }
      })
    }
    // 添加账号
    const addItem = () => {
      useFormModal({
        title: '添加账号',
        formSchema: getFormSchema(),
        handleOk: async (modelRef, state) => {
          const { name, email, password, roleIds } = modelRef

          let newRoleIds: Array<string> = []
          if (roleIds.toString().includes(',')) {
            newRoleIds = roleIds.toString().split(',')
          } else {
            newRoleIds.push(roleIds.toString())
          }
          const params = {
            name,
            email,
            password,
            roleIds: newRoleIds
          }
          await postAdminAccount(params)
          tableRef.value.refreshTableData()
        }
      })
    }
    const isDisabled = computed(() => state.rowSelection.selectedRowKeys.length == 0)

    return {
      ...toRefs(state),
      columns,
      tableRef,
      getAdminAccount,
      isDisabled,
      addItem,
      deleteItems
    }
  }
})
</script>
