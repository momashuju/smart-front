<template>
  <div class="whole">
    <el-calendar class="calendar" v-model="dateValue">
    </el-calendar>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>

        </div>
        <h1>{{username}}的个人空间</h1>
        <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
      </div>
      <div class="text item">
        这个用户还没有留下任何信息~
      </div>
    </el-card>
  </div>
</template>

<script>

  export default {
    name: 'UserPage',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        dateValue:new Date(),
        uid:1,
        username:"魔码数据",
        password:"123456"
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .whole{
    width: 100%;
    padding-top: 20px;
    padding-left: 10%;
    display: flex;
    flex-direction: row;

    .calendar{
      width: 40%;
    }

    .box-card{
      padding-top: 20px;
      width: 60%;

      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }

      .clearfix:after {
        clear: both
      }
    }
  }
</style>
