<template>
    <div >
       counter组件相邻组件Counter1-------------------数字：{{number}}
        <child1 message = "counter组件相邻组件Counter1"> </child1>

    </div>
</template>
<script>
    import child1 from './child1.vue';
    export default {
        data(){
           return{
               number: 20
            }
        },
        components: {
            child1
        },
        methods: {
            handleAddRandom () {
                console.log("child1 ++");
                this.number++;
            }
        },
        created () {
            this.$bus.on('add', this.handleAddRandom);
        },
        beforeDestroy () {
            this.$bus.off('add', this.handleAddRandom);
        }
    };
</script>