<template>
    <div >
    <h1>itemcar子组件</h1>
    <h3 style = "color:red">----------------------VueX的严格模式下：不能使用v-model 和 value + @input 错误的两种情况-------------------------</h3>
     <h4> v-model 双向绑定  </h4>
    v-model  vinNo :<input v-model="itemcar.vinNo" >  <br>

     <h4>value + @input改变本身数据 </h4>
    licenseNo: <input :value="itemcar.licenseNo" @input="e => itemcar.licenseNo = e.target.value" @change="changeLicenseNo" >  <br>
    licenseNo: {{itemcar.licenseNo}} <br>
    licenseNo2:<input v-model="itemcar2.licenseNo"  > <br>
    licenseNo2: {{itemcar2.licenseNo}} <br>
    <br>

    <h3 style="color: green">----------------------VueX的严格模式下：两种解决方案------------------------</h3>

   
     <h4> 一、 v-model + set get 的方式 </h4>
    carkindCode: <input v-model="carkindCode"  >  <br>
    carkindCode: {{itemcar.carkindCode}} <br>
    carkindCode2: {{itemcar2.carkindCode}}
    <br>

    <h4>二、:value + @input 改变vuex的方式 </h4>
     engineNo: <input :value="itemcar.engineNo"  @input="updateEngineNo"> <br>
     engineNo: {{itemcar.engineNo}}<br>
     engineNo2: {{itemcar2.engineNo}}
     <br>
  

    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import proposal from 'mock/bean/proposal.js'
    export default {
        data(){
           return {
               itemcar2:proposal.prpItemcar,

           }
        },
        computed:{
           ...mapState({
                itemcar : state => state.itemcar.itemcar,
                main: state =>  state.main.main
            }),
            
            'carkindCode': {
                get(){
                    console.log('--carkindCode get方法---')
                    return this.itemcar.carkindCode;
                },
                set(value){
                    console.log('--carkindCode set方法---')
                    this.setCarkindCode(value);
                }
            }
        },
        methods: {
             ...mapActions('itemcar', [
                'chgEngineNo',//映射 this.chgEngineNo() 为 this.$store.dispatch('chgEngineNo')
                'setEngineNo', //映射 this.setEngineNo() 为 this.$store.dispatch('setEngineNo')
                'setCarkindCode'
            ]),
           changeLicenseNo(e){
                 console.log('--changeLicenseNo--' + this.itemcar.licenseNo)
           
            },
            updateEngineNo(e){
                 console.log('--updateEngineNo--' + this.itemcar.engineNo)
              this.setEngineNo(e.target.value);
            }
        },
        created () {
            
        },
        beforeDestroy () {
            
        }
    };
</script>