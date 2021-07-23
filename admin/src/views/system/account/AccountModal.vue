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
      <template #roleIds="{ model, field }">
        <a-checkbox-group class="w-full" v-model:value="model[field]">
          <a-row>
            <a-col :span="8" v-for="item in roleList" :key="item._id">
              <a-checkbox :value="item._id">{{ item.name }}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, reactive, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './account.data';
  import { getAdminRole } from '/@/api/system/role';
  import { addAdmin, updateAdmin } from '/@/api/system/account';
  import { CheckboxGroup, Row, Col, Checkbox } from 'ant-design-vue';
  export default defineComponent({
    name: 'AccountModal',
    components: {
      BasicModal,
      BasicForm,
      [CheckboxGroup.name]: CheckboxGroup,
      [Row.name]: Row,
      [Col.name]: Col,
      [Checkbox.name]: Checkbox,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const state = reactive({
        adminId: '',
        roleList: [] as any,
      });
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 80,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        updateSchema({
          field: 'password',
          required: true,
          show: true,
        });
        state.adminId = data.record._id;
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        const roleListRes = await getAdminRole();
        state.roleList = roleListRes;
        if (unref(isUpdate)) {
          // data.record.roleIds = data.record.roleIds.map((item: any) => item._id);
          // 如果编辑不显示密码输入框
          updateSchema({
            field: 'password',
            required: false,
            show: false,
          });
          setFieldsValue({
            ...data.record,
            roleIds: roleListRes.map((item: any) => item._id),
          });
        }
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // 新增
          if (!unref(isUpdate)) {
            await addAdmin(values);
          } else {
            // 编辑
            const data = {
              name: values.name,
              email: values.email,
              roleIds: values.roleIds,
            };
            await updateAdmin(state.adminId, data);
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
