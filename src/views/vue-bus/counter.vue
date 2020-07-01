<template>
    <div>
      
       counter组件 <button @click="handleAddRandom">随机增加</button>
       <br>
         counter组件数字-------： {{ number }}

         <child1 message = "counter组件"> </child1>
    </div>
</template>
<script>
    import child1 from './child1.vue';
    export default {
        props: {
            number: {
                type: Number
            }
        },
        components: {
            child1
        },
        methods: {
            handleAddRandom () {
                // 随机获取 1-100 中的数
                const num = Math.floor(Math.random () * 100 + 1);
                this.$bus.emit('add', num);
            }
        }
    };
</script>