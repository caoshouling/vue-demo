<template>
<span>
      <input
        ref="input"
        :value="value"
        @input="$emit('ababab', $event.target.value)"
      >
    </span>
</template>
<script>

    export default {
        data(){
            return{
            }
        },
        props: ["value"],
        model: {
            prop: 'value',
            //这个事件名可以随意写，它实际上是规定了子组件要更新父组件值需要注册的方法
            event: 'ababab'
        }
    }
</script>
<style lang="scss" scoped>
</style>











