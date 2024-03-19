<script setup>
import myRequest from '../req/index.js'
import { ref, inject, onBeforeMount } from 'vue'
let users = ref([])
let resp = ref('管理账号')
onBeforeMount(() => {
    myRequest.get('/getUser').then(res => {
        console.log(res)
        if (Array.isArray(res?.data)) {
            users.value = res.data
        } else {
            resp.value = res.data
        }
    })
})

</script>

<template>
    <div class="secret-router">
        {{ resp }}
        <table v-if="users.length">
            <thead>
                <tr>
                    <th>用户名</th>
                    <th>密码</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user._id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.password }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.click-hack{
  height: 100%;
  width: 100%;
}
</style>
