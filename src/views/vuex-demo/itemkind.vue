<template>
    <div >
        itemkind组件
        <br>
        <button @click="add">添加</button>
        <button @click="remove_Itemkind">删除</button>
        <div v-for = 'itemkind in prpItemkindList' :key="itemkind.kindCode" >
           险别名称： {{itemkind.kindName}}<br>
        </div>
      

    </div>
</template>
<script>
   import { mapState, mapActions } from 'vuex'
    export default {
        data(){
            return {
                count :1
            }
        },
        components: {
           
        },
        computed:{
            ...mapState({
                prpItemkindList:state => state.itemkind.prpItemkindList //prpItemkindList//名字一样可以省略，等价于 prpItemkindList: state => state.prpItemkindList
            }),
        //    ...mapState([
        //        'prpItemkindList' //prpItemkindList//名字一样可以省略，等价于 prpItemkindList: state => state.prpItemkindList
        //    ])
        },
        methods: {
            ...mapActions('itemkind', [
                'add_Itemkind','remove_Itemkind'
            ]),
            add () {
                console.log("添加-itemkind ");
                //this.add_Itemkind
                 let itemkind = {};

                 itemkind.kindCode = "A"+this.count ++;
                 itemkind.kindName = "险别"+this.count ++;
                 itemkind.premium = 100,
                 itemkind.amount = 1000
                 //两种方法均可，第一种方法
                 //方法一
                 //this.$store.dispatch('itemkind/add_Itemkind',itemkind)
                 //方法二
                 //this.add_Itemkind(itemkind);
                 //方法三：
                 this.prpItemkindList.push(itemkind);
                
            },
            remove () {
                console.log("删除+itemkind");
               
            }
        },
        
        created () {
        
        },
        beforeDestroy () {
            
        }
    };
</script>