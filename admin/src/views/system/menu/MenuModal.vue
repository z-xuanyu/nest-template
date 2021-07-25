<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-20 10:38:11
 * @LastEditTime: 2021-07-23 17:49:35
 * @Description: Modify here please
-->
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, reactive, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { getMenuTree, addMenu, updateMenu } from '/@/api/system/menu';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'AccountModal',
    components: {
      BasicModal,
      BasicForm,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const state = reactive({
        menuId: '',
        menuList: [] as any,
      });
      const { createMessage } = useMessage();
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 80,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          state.menuId = data.record._id;
          setFieldsValue({
            ...data.record,
          });
        }

        const menuTree = await getMenuTree();
        updateSchema({
          field: 'parentId',
          componentProps: { treeData: menuTree},
        });
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // 新增
          if (!unref(isUpdate)) {
            await addMenu(values)
            createMessage.success("添加成功!")
          } else {
            // 编辑
            await updateMenu(state.menuId,values)
            createMessage.success("编辑成功!")
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
