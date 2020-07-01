<template>
<el-row class="tac">
  <el-col :span="16">
    <el-menu
      id = "menu"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :router ="true"
      >
      <!-- <el-submenu index="1">  v-loading="loading"
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-submenu index="2">
          <template slot="title">选项1</template>
          <el-menu-item index="/page1" >选项1-1</el-menu-item>
          <el-menu-item index="/page2" >选项1-2</el-menu-item>
        </el-submenu>
        <el-submenu index="/page2">
          <template slot="title">选项2</template>
          <el-menu-item index="/page2" >选项2</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/page2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item> -->

       <template v-for ="menu  in menuData"  > 
          <template v-if="menu.children" >  
            <el-submenu :index="menu.index"   :key="menu.index">
            <template slot="title">
              <i :class="menu.class"></i>
              <span>{{menu.title}}</span>
            </template>

            <template v-for= "item in menu.children" > 
               <template v-if="item.children"  >  
                  <el-submenu    :index="item.index" :key = "item.index">
                    <template slot="title">{{item.title}}</template>
                    <el-menu-item :index="element.index" v-for= "element in item.children"  :key = "element.index">{{element.title}}</el-menu-item>
                  </el-submenu>
               </template>
                <template v-else>
                     <el-menu-item :index="item.index" :key = "item.index" >{{item.title}}</el-menu-item>
                </template>
            </template> 

            </el-submenu>
          </template>
          <template v-else> 
              <el-menu-item   :index="menu.index"  :key="menu.index">
                <i :class="menu.class"></i>
                <span slot="title">{{menu.title}}</span>
              </el-menu-item>
          </template>
       </template> 

    </el-menu>

    
  </el-col>

</el-row>
        
</template>

<script>


import   request from 'utils/request';

  export default {
    data(){

      return {
         menuData: [],
         loading :true

      }
    },
    
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      request(){
        let _this =this;
         request('/main/getMenu',{params:{LoadingID:"#menu"}})
        .then(function (response) {
          _this.loading = false;
          console.log(response);
          _this.menuData = response;
        })
        .catch(function (error) {
          _this.loading = false;
          console.log(error);
        });
      }
    },
    mounted(){
      this.request();
    }
  }
</script>