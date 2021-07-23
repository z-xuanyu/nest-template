<template>
  <div class="menu-picon">
    <a-table rowKey="_id" :dataSource="data" :columns="columns" :row-selection="rowSelection" />
  </div>
</template>

<script lang="ts">
  import { createVNode, defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
  import { columns } from './columns';
  import { DataItem } from './type';
  import { addMenu, delMenu, getMenuList, updateMenu } from '/@/api/system/menu/index';
  import { Modal, message, Table, TableColumn } from 'ant-design-vue';
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'Menu',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
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
                children: list2tree(items, item._id),
              };
            } else {
              return {
                ...item,
                title: item.name,
              };
            }
          });
      };
      const formRef = ref<any>(null);
      // 表格列表数据
      const state = reactive({
        addMenuVisible: false,
        data: [],
        menuForm: {
          _id: 0,
          name: '',
          parentId: null,
          url: '',
          icon: '',
          sort: 0,
          keepAlive: 1,
        },
        allMenuList: [] as any,
        formRules: {
          name: [
            {
              required: true,
              message: '请输入菜单名称',
            },
          ],
          url: [
            {
              required: true,
              message: '请输入您的菜单路径',
            },
          ],
        },
      });
      // 获取列表数据
      const getMenus = async () => {
        const menuRes: any = await getMenuList();
        state.allMenuList = menuRes as any;
        state.data = list2tree(menuRes);
      };
      onMounted(() => getMenus());
      // 添加菜单弹出层
      const handleAddMenu = () => {
        state.addMenuVisible = true;
      };
      // 编辑菜单弹出层
      const handleEditMenu = (item) => {
        state.menuForm = JSON.parse(JSON.stringify(item));
        state.addMenuVisible = true;
      };
      // 添加或者编辑提交
      const onSubmit = () => {
        formRef.value
          .validate()
          .then(async () => {
            if ((state.menuForm as any)._id) {
              // 编辑菜单
              updateMenu((state.menuForm as any)._id, state.menuForm);
            } else {
              // 新增菜单
              await addMenu(state.menuForm);
            }
            // 添加成功重置表单
            formRef.value.resetFields();
            getMenus();
            state.addMenuVisible = false;
          })
          .catch(() => {});
      };
      // 删除菜单
      const handleDelMenu = (record: DataItem) => {
        if (record.children?.length) {
          return message.warning('该分类含有子分类，不能删除！');
        }
        Modal.confirm({
          title: '提示',
          icon: createVNode(QuestionCircleOutlined),
          content: '您确定要删除该菜单吗？',
          onOk: async () => {
            await delMenu(record._id as string);
            getMenus();
            message.success('删除成功');
          },
        });
      };
      // 表格的列选中或者全选
      const rowSelection = {
        onChange: (selectedRow_ids: (string | number)[], selectedRows: DataItem[]) => {
          console.log(`selectedRow_ids: ${selectedRow_ids}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
          console.log(selected, selectedRows, changeRows);
        },
      };
      return {
        ...toRefs(state),
        columns,
        rowSelection,
        handleDelMenu,
        handleAddMenu,
        handleEditMenu,
        onSubmit,
        formLabelCol: { span: 4 },
        formWrapperCol: { span: 20 },
        formRef,
      };
    },
  });
</script>

<style lang="less" scoped>
  .menu-picon {
    padding: 20px;
  }
</style>
