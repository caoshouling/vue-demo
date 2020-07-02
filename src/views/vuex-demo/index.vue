<style scoped>
   .mytitle{
       color :red
   }
</style>
<template>
    <div>
        <h1>Vuex测试 </h1>
  
        <button @click="handleAsyncIncrement">async +1</button>
       
       <h1 class = "mytitle">Vuex测试 </h1>

        <div> <main_edit ></main_edit> </div>
        <br>
        -----------------------------<br>
        <itemcar ></itemcar>
        <br>
        ------------------------------------------
        <br>
        <div> <itemkind ></itemkind> </div>
         ------------------------------------------
         
        
    </div>
</template>
<script>
    import itemcar from './itemcar.vue';
    import itemkind from './itemkind.vue';
    import main_edit from './main.vue';
    export default {
        components: {
            itemcar,
            itemkind,
            main_edit
        },
        computed: {
            count () {
                //return this.$store.state.count;
            },
            list () {
                //return this.$store.getters.filteredList;
            },
            listCount () {
                //return this.$store.getters.listCount;
            }
        },
        methods: {
            handleIncrement () {
                // this.$store.commit('increment');
            },
            handleDecrease () {
                // this.$store.commit('decrease');
            },
            handleIncrementMore () {
                // this.$store.commit('increment', 5);
            },
            handleActionIncrement () {
                // this.$store.dispatch('increment')
            },
            handleAsyncIncrement () {
                // this.$store.dispatch('asyncIncrement').then(() => {
                //     console.log(this.$store.state.count);
                // });
            },
            handleAddRandom (num) {
                console.log('handleAddRandom');
                this.number += num;
            }
        },
        data () {
            return {
                number: 0
            }
        },
        created () {
           
        },
        beforeDestroy () {
            
        }
    }
</script>