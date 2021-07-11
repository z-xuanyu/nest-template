<template>
  <a-select v-model:value="modelValue" v-bind="formItem.props" v-on="formItem.eventObject">
    <template v-for="option in formItem.options" :key="option.value">
      <Option :value="option.value">
        {{ option.label }}
      </Option>
    </template>
  </a-select>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Select } from 'ant-design-vue'

export default defineComponent({
  name: 'SchemaFormSelect',
  components: {
    [Select.name]: Select,
    [Select.Option.name]: Select.Option
  },
  emits: ['update:value'],
  props: {
    formItem: {
      // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({})
    },
    value: undefined as any // 表单项值
  },
  setup(props, { attrs, emit }) {
    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    })

    return {
      modelValue
    }
  }
})
</script>
