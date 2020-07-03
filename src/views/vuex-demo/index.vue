<style scoped>
   .mytitle{
       color :red
   }
</style>
<template>
    <div>
  
       <h1 class = "mytitle">Vuex测试结论：不适合在投保录入使用</h1>
           <p>1、严格模式中，对于字段多的项目双向绑定复杂，
                 非严格模式又不能控制人为直接修改值的问题，很尴尬。
           </p>
           <p>2、方法的调用太多vuex的api（必须action方式调用），不利于以后换框架。
           </p>
           <p>3、学习和理解起来有一定的成本，不利于管理。
           </p>
           <p>4、vueX适合场景：全局组件公共信息多，比如页面全局配置、用户信息、全局样式切换等。
               <br>
                 vueX不适合场景：大量字段需要双向绑定
           </p>
        <h1 class = "mytitle">  ---------------------------------------------------------------------------</h1>
        <br>

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