<script setup>
import myRequest from '../req/index.js'
import myRouter from '../router.js'
import { ref, inject } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'



defineProps({
  msg: String,
})


const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
  // if (key === '/xss') {
    // myRequest.post('/login', {
    // }).then(res => {
    //   console.log(res)
    // })
  // }
  // myRouter.push({
  //   path: '/xss',
  //   query: {
  //     search: '<img src="x" onerror="alert(\'XSS Attack!\')">',
  //   }
  // })

  myRequest.get('/test').then(res => {
    console.log(res)
  })
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

</script>

<template>
  <div class="menu-wrapper">
    <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          router
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/xss">
            <el-icon><icon-menu /></el-icon>
            <span>Xss</span>
          </el-menu-item>
          <el-menu-item index="/csrf">
            <el-icon><document /></el-icon>
            <span>csrf</span>
          </el-menu-item>
          <el-menu-item index="/clickjacking">
            <el-icon><document /></el-icon>
            <span>Clickjacking</span>
          </el-menu-item>
          <el-menu-item index="/nosql">
            <el-icon><location /></el-icon>
            <span>NoSqlInjection</span>
          </el-menu-item>
          <el-menu-item index="/unsafe-file">
            <el-icon><location /></el-icon>
            <span>unsafe-file</span>
          </el-menu-item>
          <!-- <el-menu-item index="/click-hack">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item> -->
    </el-menu>
  </div>
</template>

<style scoped>
.menu-wrapper {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
