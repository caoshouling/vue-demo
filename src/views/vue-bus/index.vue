<style scoped>
   .mytitle{
       color :red
   }
</style>
<template>
    <div>
        <h1>首页</h1>
        {{ count }}
        <button @click="handleIncrement">+1</button>
        <button @click="handleDecrease">-1</button>
        <button @click="handleIncrementMore">+5</button>
        <div>{{ list }}</div>
        <div>{{ listCount }}</div>
        <button @click="handleActionIncrement">action +1</button>
        <button @click="handleAsyncIncrement">async +1</button>
       
       <h1 class = "mytitle">Index页面：  下面是vue-bus测试：通过事件的方式传递数据。由于是消息总线，所有监听了该消息的组件均可以接受到消息，包括父子、相邻、子孙甚至任何没有关系的组件。</h1>
        
        <Counter :number="number"></Counter>
        ------------------------------------------
        <div> <Counter1 ></Counter1> </div>
         ------------------------------------------
        
    </div>
</template>
<script>
    import Counter from './counter.vue';
    import Counter1 from './Counter1.vue';

    export default {
        components: {
            Counter,
            Counter1
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
            this.$bus.on('add', this.handleAddRandom);
        },
        beforeDestroy () {
            this.$bus.off('add', this.handleAddRandom);
        }
    }
</script>