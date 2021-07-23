<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-19 12:10:57
 * @LastEditTime: 2021-07-19 14:13:01
 * @Description: Modify here please
-->
<template>
  <div> 角色管理 </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'Account',
    setup() {
      const loading = ref(true);

      setTimeout(() => {
        loading.value = false;
      }, 1500);
      return { loading };
    },
  });
</script>
