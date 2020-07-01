<template>

<div id = 'app-container'>
    
   <div >
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
     
  
 </div>
 
 
 
 
</template>
   
<script>

export default {
  data () {
    return {
      msg: '入口文件!'
    }
  },
  methods:{
      goto(path){
        console.log(path);
        
        this.$router.push({path:path})
      }

  }
}
</script>

<style >
.example {
  color: red;
}
</style>