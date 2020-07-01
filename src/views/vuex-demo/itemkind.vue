<template>
    <div >
       itemkind组件
       <div v-for = 'itemkind in prpItemkindList' :key="itemkind.kindCode" >
           险别名称： {{itemkind.name}}
        </div>

    </div>
</template>
<script>
   import { mapState, mapActions } from 'vuex'
    export default {
      
        components: {
           
        },
        computed:{
           ...mapState({
               prpItemkindList:state => state.prpItemkindList //prpItemkindList//名字一样可以省略，等价于 prpItemkindList: state => state.prpItemkindList
           }),
        },
        methods: {
            handleAddRandom () {
                console.log("child1 ++");
               
            }
        },
        created () {
        
        },
        beforeDestroy () {
            
        }
    };
</script>