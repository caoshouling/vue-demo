<style scoped>
</style>

<template>
  <div>
  <el-container>
  <el-aside width="200px">
       <app-nav></app-nav>
  </el-aside>
  <el-container>
    <el-header>
        <app-head></app-head>
    </el-header>
    <el-main>
        <app-main></app-main>
    </el-main>
    <el-footer>
        <app-foot></app-foot>
    </el-footer>
  </el-container>

</el-container>

  </div>
</template>

  <script>

import nav from "./components/nav.vue";
import main from "./components/main.vue";
import head from "./components/head.vue";
import foot from "./components/foot.vue";

export default {
  components:{
     appNav:nav,
     appMain:main,
     appHead:head,
     appFoot:foot,
  },
  computed: {
    key() {
      return this.$router.path;
    }
  }
};
</script>