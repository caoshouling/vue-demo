<template>
    <div >
     {{message}} 的子组件-------------------数字：{{number}}
        
    </div>
</template>
<script>
    export default {
        props: {
            message: {
                type: String
            }
        },
        data(){
           return{
               number: 10
            }
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