<style scoped>
</style>
  

<template>
  <div >head页面
   <button @click="request" name="request">aaaaa</button>


  </div>
</template>

  <script>
import   request from 'utils/request';
export default {

 methods: {
     
      request(){
         let _this =this;
         request('/main/getMenu')
        .then(function (response) {
          console.log(response);
          _this.menuData = response;
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },

};
</script>