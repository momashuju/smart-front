<template>
  <div class="user">
    <div class="header" >
      <Header v-on:changeRoute="changeRoute"/>
    </div>
    <div class="mid">
      <WorkSpace v-if="index===1" />
      <Templates v-if="index===2"/>
      <Users v-if="index===3"/>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
  import Header from '../Common/Header'
  import WorkSpace from './WorkSpace'
  import Templates from './Templates'
  import Users from './Users'
  export default {
    name: "Admin",
    components:{Header,WorkSpace,Templates,Users},
    data(){
      return{
        index:1
      }
    },
    methods:{
      changeRoute:function(index){
        this.index=index
      }
    }
  }
</script>

<style lang="less" scoped>
  .user{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .header{}
    .mid{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
    }
    .bottom{}
  }
</style>
