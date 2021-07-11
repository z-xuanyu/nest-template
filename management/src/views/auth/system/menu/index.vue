<template>
  <div class="menu-picon">
    <a-table
      rowKey="_id"
      bordered
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
    >
      <!-- 表头添加按钮插槽 -->
      <template #title>
        <a-button
          v-permission="{ action: 'create', effect: 'disabled' }"
          @click="handleAddMenu"
          type="primary"
        >
          添加
        </a-button>
        <a-button style="margin-left: 20px" v-permission="{ action: 'delete' }" type="primary">
          删除
        </a-button>
      </template>
      <!-- 图标插槽 -->
      <template #icon="{ record }">
        <IconFont :type="record.icon"></IconFont>
      </template>
      <!-- 操作栏 按钮插槽 -->
      <template #action="{ record }">
        <a-button
          v-permission="{ action: 'create', effect: 'disabled' }"
          size="small"
          type="primary"
          @click="handleEditMenu(record)"
        >
          编辑
        </a-button>
        <a-button
          style="margin-left: 20px"
          v-permission="{ action: 'delete' }"
          @click="handleDelMenu(record)"
          size="small"
          type="danger"
        >
          删除
        </a-button>
      </template>
      <!-- 创建时间 -->
      <template #createdAt="{ record }">
        {{ formatDate(record.createdAt) }}
      </template>
      <!-- 更新时间 -->
      <template #updatedAt="{ record }">
        {{ formatDate(record.updatedAt) }}
      </template>
    </a-table>

    <!-- 添加/编辑菜单 -->
    <a-modal
      v-model:visible="addMenuVisible"
      :title="menuForm._id ? '编辑菜单' : '新增菜单'"
      @ok="onSubmit"
    >
      <a-form
        :label-col="formLabelCol"
        :wrapper-col="formWrapperCol"
        :rules="formRules"
        :model="menuForm"
        ref="formRef"
      >
        <a-form-item label="菜单名称" name="name">
          <a-input v-model:value="menuForm.name" placeholder="请输入菜单名" />
        </a-form-item>
        <a-form-item label="上级菜单" name="parentId">
          <a-select placeholder="请选择上级菜单" v-model:value="menuForm.parentId">
            <a-select-option :value="null">无上级</a-select-option>
            <a-select-option v-for="item in allMenuList" :key="item._id" :value="item._id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="路径" name="url">
          <a-input v-model:value="menuForm.url" placeholder="请输入菜单路径" />
        </a-form-item>
        <a-form-item label="小图标" name="icon">
          <a-input v-model:value="menuForm.icon" placeholder="请输入菜单图标" />
        </a-form-item>
        <a-form-item label="排序">
          <a-input type="number" v-model:value="menuForm.sort" />
        </a-form-item>
        <a-form-item label="KeepAlive">
          <a-select placeholder="请选择类型" v-model:value="menuForm.keepAlive">
            <a-select-option :value="1">是</a-select-option>
            <a-select-option :value="0">否</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { createVNode, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { columns } from './columns'
import { DataItem } from './type'
import { addMenu, delMenu, getMenuList, updateMenu } from '@/api/system/menu/index'
import { IconFont } from '@/components/iconfont'
import { formatDate } from '@/utils/common'
import { Modal, message, Select } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'SystemMenu',
  components: {
    IconFont,
    [Select.name]: Select,
    aSelectOption: Select.Option
  },
  setup() {
    // 列表转树
    const list2tree = (items, parentId = null) => {
      return items
        .filter((item) => item.parentId == parentId)
        .map((item) => {
          if (list2tree(items, item._id).length) {
            return {
              ...item,
              title: item.name,
              children: list2tree(items, item._id)
            }
          } else {
            return {
              ...item,
              title: item.name,
            }
          }
        })
    }
    const formRef = ref<any>(null)
    // 表格列表数据
    const state = reactive({
      addMenuVisible: false,
      data: [],
      menuForm: {
        name: '',
        parentId: null,
        url: '',
        icon: '',
        sort: 0,
        keepAlive: 1
      },
      allMenuList: [],
      formRules: {
        name: [
          {
            required: true,
            message: '请输入菜单名称'
          }
        ],
        url: [
          {
            required: true,
            message: '请输入您的菜单路径'
          }
        ]
      }
    })
    // 获取列表数据
    const getMenus = async () => {
      const menuRes: DataItem[] = await getMenuList()
      state.allMenuList = menuRes as any
      state.data = list2tree(menuRes)
    }
    onMounted(() => getMenus())

    // 添加菜单弹出层
    const handleAddMenu = () => {
      state.addMenuVisible = true
    }

    // 编辑菜单弹出层
    const handleEditMenu = (item) => {
      state.menuForm = JSON.parse(JSON.stringify(item))
      state.addMenuVisible = true
    }
    // 添加或者编辑提交
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          if ((state.menuForm as any)._id) {
            // 编辑菜单
            updateMenu((state.menuForm as any)._id, state.menuForm)
          } else {
            // 新增菜单
            await addMenu(state.menuForm)
          }
          // 添加成功重置表单
          formRef.value.resetFields()
          getMenus()
          state.addMenuVisible = false
        })
        .catch(() => {})
    }

    // 删除菜单
    const handleDelMenu = (record: DataItem) => {
      if (record.children?.length) {
        return message.warning('该分类含有子分类，不能删除！')
      }
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionCircleOutlined),
        content: '您确定要删除该菜单吗？',
        onOk: async () => {
          await delMenu(record._id as string)
          getMenus()
          message.success('删除成功')
        }
      })
    }

    // 表格的列选中或者全选
    const rowSelection = {
      onChange: (selectedRow_ids: (string | number)[], selectedRows: DataItem[]) => {
        console.log(`selectedRow_ids: ${selectedRow_ids}`, 'selectedRows: ', selectedRows)
      },
      onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
        console.log(record, selected, selectedRows)
      },
      onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
        console.log(selected, selectedRows, changeRows)
      }
    }
    return {
      ...toRefs(state),
      columns,
      rowSelection,
      formatDate,
      handleDelMenu,
      handleAddMenu,
      handleEditMenu,
      onSubmit,
      formLabelCol: { span: 4 },
      formWrapperCol: { span: 20 },
      formRef
    }
  }
})
</script>

<style lang="scss" scoped></style>
