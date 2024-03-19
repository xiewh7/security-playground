<script setup>
import myRequest from '../req/index.js'
import { ref, inject } from 'vue'
    const handleClick = () => {
        alert('click')
    }

</script>

<template>
  <div class="click-hack right-part">
    <div style="position: absolute;height: 100%;width: 100%;" @click="handleClick"></div>
    <!-- <iframe src="https://www.52tt.com/" height="100%" width="100%">
    </iframe> -->
    <iframe src="http://localhost:3000/clickJacking" height="100%" width="100%">
    </iframe>
  </div>
</template>

<style scoped>
.click-hack{
  height: 100%;
  width: 100%;
}
</style>
