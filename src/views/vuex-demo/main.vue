<template>
    <div>
      
       main组件 <button @click="handleComCode">清空各个字段</button>
       <br>
        main.comCode: {{main.comCode}}
         <br>
         main.comCode:<input v-model="main.comCode" > <br>

        
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        computed: {
            ...mapState({
               main: state => state.main.main
            }),
            // ...mapGetters('cart', {
            //     products: 'cartProducts',
            //     total: 'cartTotalPrice'
            // })
        },
        methods: {
            //清空各个字段
            handleComCode () {
            
               this.main.comCode = '44000000'

            },
            ...mapActions([
                'clearSumPremium' // 将 `this.clearSumPremium()` 映射为 `this.$store.dispatch('clearSumPremium')`
            ])
        
        }
    };
</script>