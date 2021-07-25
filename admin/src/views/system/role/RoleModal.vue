<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #menuIds="{ model, field }">
        <BasicTree v-model:value="model[field]" :treeData="menuList" :replaceFields="{ title: 'name', key: '_id' }" checkable />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref, toRefs, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTree } from '/@/components/Tree/index';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getMenuList } from '/@/api/system/menu';
  import { addRole, updateRole } from '/@/api/system/role';
  import { formSchema } from './role.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'RoleModal',
    components: {
      BasicModal,
      BasicForm,
      BasicTree,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      // 列表转树
      const list2tree = (items, parentId = null) => {
        return items
          .filter((item) => item.parentId == parentId)
          .map((item) => {
            return {
                ...item,
                children: list2tree(items, item._id),
              };
          });
      };
      const { createMessage } = useMessage();
      const state = reactive({
        roleId:'',
        menuList: [],
      });
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 80,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        if(!state.menuList.length){
          const menuListRes = await getMenuList();
          state.menuList = list2tree(menuListRes)
        }
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          state.roleId = data.record._id;
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '添加角色' : '编辑角色'));
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // 新增
          if (!unref(isUpdate)) {
            await addRole(values)
            createMessage.success("添加成功")
          } else {
            // 编辑
            await updateRole(state.roleId, values)
            createMessage.success("更新成功")
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { ...toRefs(state), registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>

<style></style>
