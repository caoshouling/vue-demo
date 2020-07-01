<template>
 <div id="demo">
  <test-model v-model="inputValue"></test-model>
  <span>{{inputValue}}</span>
</div>
</template>
<script>
    import testModel from 'src/components/testModel'
    export default {
      data(){
            return{
                 inputValue: "inputValue"
           }
       },
        components: {
            testModel,
        }
    }
</script>

<style lang="scss" scoped>
</style>