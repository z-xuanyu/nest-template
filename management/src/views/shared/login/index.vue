<template>
  <div class="login-box">
    <div class="login-logo">
      <!--      <svg-icon name="logo" />-->
      <img src="~@/assets/images/logo.png" alt="" />
      <h1>后台登录系统</h1>
    </div>
    <a-form layout="horizontal" :model="formInline" @submit="handleSubmit">
      <a-form-item>
        <a-input v-model:value="formInline.email" size="large" placeholder="请输入您的邮箱">
          <template #prefix><user-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formInline.password"
          size="large"
          type="password"
          placeholder="请输入密码"
          autocomplete="new-password"
        >
          <template #prefix><lock-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" size="large" :loading="loading" block>
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
// import md5 from 'blueimp-md5'
// ~@/assets/logo.png
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'

import { SvgIcon } from '@/components/svg-icon'

export default defineComponent({
  name: 'Login',
  components: { UserOutlined, LockOutlined, SvgIcon },
  setup() {
    const state = reactive({
      loading: false,
      formInline: {
        email: '',
        password: ''
      }
    })

    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const handleSubmit = async () => {
      const { email, password } = state.formInline
      if (email.trim() == '' || password.trim() == '')
        return message.warning('用户名或密码不能为空！')
      message.loading('登录中...', 0)
      state.loading = true
      console.log(state.formInline)
      const params = {
        email,
        password
      }
      // params.password = md5(password)
      const { code, message: msg } = await store.dispatch('user/login', params).finally(() => {
        state.loading = false
        message.destroy()
      })
      if (code == 1) {
        const toPath = decodeURIComponent((route.query?.redirect || '/') as string)
        message.success('登录成功！')
        router.replace(toPath).then((_) => {
          if (route.name == 'login') {
            router.replace('/')
          }
        })
      } else {
        message.info(msg || '登录失败')
      }
    }
    return {
      ...toRefs(state),
      handleSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  padding-top: 240px;
  flex-direction: column;
  align-items: center;
  background: url('../../../assets/login.svg');
  background-size: 100%;

  .login-logo {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .svg-icon {
      font-size: 48px;
    }

    img {
      height: 48px;
    }
    h1 {
      margin-left: 10px;
      margin-bottom: 0;
    }
  }

  ::v-deep(.ant-form) {
    width: 400px;

    .ant-col {
      width: 100%;
    }
    .ant-form-item-label {
      padding-right: 6px;
    }
  }
}
</style>
