<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: '第二个vue文件加载成功------>!'
    }
  }
}
</script>

<style>
.example {
  color: green;
  font-size: 20px;
}
</style>