<template>
  <dynamic-table
    ref="tableRef"
    :columns="columns"
    :get-list-func="getAdminAccess"
    rowKey="_id"
    :row-selection="rowSelection"
    @expand="expand"
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
    <template #name="{ record }">
      <span :ref="(el) => (itemRefs[record._id] = el)">
        {{ record.name }}
      </span>
    </template>
  </dynamic-table>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, createVNode, computed, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { DynamicTable } from '@/components/dynamic-table'
import { delAdminAccess, getAdminAccess } from '@/api/system/access'
import AddModal from './add-modal.vue'
import { columns } from './columns'
import { useExpandLoading } from '@/components/dynamic-table/hooks'
import { useCreateModal } from '@/hooks'

export default defineComponent({
  name: 'SystemAccess',
  components: {
    DynamicTable
  },
  setup() {
    const tableRef = ref<any>(null)

    const state = reactive({
      itemRefs: {},
      expandedRowKeys: [] as string[],
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
          await delAdminAccess(state.rowSelection.selectedRowKeys.toString())
          await tableRef.value.refreshTableData()
          state.rowSelection.selectedRowKeys = []
        }
      })
    }
    // 添加资源
    const addItem = () => {
      useCreateModal(AddModal, {
        callback: () => {
          tableRef.value.refreshTableData()
        }
      })
    }

    // 是否禁用批量删除按钮
    const isDisabled = computed(() => state.rowSelection.selectedRowKeys.length == 0)

    // 点击展开图标
    const expand = async (expanded, record) => {
      const expandItemEl = state.itemRefs[record._id]
      // 点击展开图标loading
      const result = await useExpandLoading({
        expanded,
        record,
        expandItemEl,
        asyncFunc: getAdminAccess,
        params: { _id: record._id, limit: 100 }
      })
      if (result?.data) {
        record.children = result.data
      }
    }

    return {
      ...toRefs(state),
      columns,
      tableRef,
      expand,
      getAdminAccess,
      isDisabled,
      addItem,
      deleteItems
    }
  }
})
</script>

<style lang="scss">
.loading-icon {
  border: none;

  &.ant-table-row-expanded::after {
    content: none;
  }
}
</style>
