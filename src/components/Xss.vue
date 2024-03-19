<script setup>
import { ref, onBeforeMount } from 'vue'
import myRequest from '../req/index.js'

defineProps({
  msg: String,
})
// 存储型XSS由服务器存储的数据触发
// 反射型XSS由服务器返回的数据触发
// dom型XSS
// ?search=<img src='x' onerror='alert("XSS Attack!")'>

let result = ref('')
let commentList = ref([])
let name = ref('')
let inputComment = ref('')
// 获取URL参数
var params = new URLSearchParams(window.location.search)
// 获取'search'参数
result = params.get('search') || ''
onBeforeMount(() => {
  getComment()
})
const getComment = () => {
  myRequest.get('/getComment').then(res => {
    commentList.value = res?.data
  })
}
const escapeHTML = (str) => {
  var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return str?.replace(/[&<>"']/g, function(m) { return map[m] })
}
const addComment = () => {
  myRequest.post('/addComment', {
      comment: name.value,
      name: inputComment.value,
    }).then(res => {
      console.log(res)
      getComment()
    })
}
</script>

<template>
  <div>
    <div class="">
      <h1>搜索</h1>
      <div>你的搜索结果是：
        <div class="search-result" v-html="escapeHTML(result)"></div>
      </div>
    </div>
    <div class="input-comment">
      <div>
        昵称：<input v-model="name">
      </div>
      <div>
        评论：<textarea v-model="inputComment"></textarea>
      </div>
      <el-button @click="addComment">提交</el-button>
    </div>
    <div class="comment-list">
      <table class="comment-table" v-if="commentList.length" border="1">
          <thead>
              <tr>
                  <th>姓名</th>
                  <th>评论</th>
              </tr>
          </thead>
          <tbody>
              <tr class="comment" v-for="item in commentList" :key="item._id">
                  <td class="name">{{ item.name }}</td>
                  <td class="comment" v-html="escapeHTML(item.comment)"></td>
              </tr>
          </tbody>
      </table>
      <!-- <div class="comment" v-for="item in commentList" :key="item._id">
        姓名：<div class="name">{{ item.name }}</div>
        评论：<div class="comment" v-html="escapeHTML(item.comment)"></div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.search-result {
  min-width: 80px;
  min-height: 40px;
  border: 1px solid gray;
}
.comment-table {
  max-height: 100%;
  width: 95%;
  margin: 0 auto;
  table-layout: fixed;
  border-spacing: 0px;
  border: 1px solid gray;
  color: rgb(184, 177, 177);
}
</style>
