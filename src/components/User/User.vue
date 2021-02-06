<template>
<div class="user">
  <div class="header" >
    <Header v-on:changeRoute="changeRoute"/>
  </div>
  <div class="mid">
    <WorkSpace v-if="index===1" />
    <WorkHistory v-if="index===2"/>
    <UserPage v-if="index===3"/>
  </div>
  <div class="bottom"></div>
</div>
</template>

<script>
  import Header from '../Common/Header'
  import WorkSpace from './WorkSpace'
  import WorkHistory from './WorkHistory'
  import UserPage from '../Common/UserPage'
  export default {
    name: "User",
    components:{Header,WorkSpace,WorkHistory,UserPage},
    data(){
      return{
        role:"user",
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
