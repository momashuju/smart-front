<template>
  <div class="work-history">
    <div class="title">
        <el-page-header @back="back" content="任务详情" v-if="ifInfo">
        </el-page-header>
    </div>
    <div class="content">
      <el-table v-if="!ifInfo"
        :data="tasks"
        style="width: 100%;font-size: 16px">
        <el-table-column
          prop="time"
          label="创建日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="任务名称"
          width="180">
        </el-table-column>

        <el-table-column
          prop="subnames"
          label="相关子任务"
          width="300">
        </el-table-column>
        <el-table-column
          prop="state"
          label="任务状态"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
        width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="medium">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <TaskInfo class="taskinfo" :task_id="selectedId" v-else/>
    </div>
  </div>
</template>

<script>

  import imgUrl from "../../assets/img.png"
  import TaskInfo from '../Common/TaskInfo'
  export default {
    name: 'WorkHistory',
    data() {
      return {
        msg: 'Welcome to Work History',
        imgUrl:imgUrl,
        log_index:-1,
        ifInfo:false,
        tasks:[
          {
            id:1,
            time:"2020-11-1",
            name:"天气预测",//取对应的TaskTemplate的name
            subnames:"数据预处理 回报检验",
            state:"待审核"
          },
          {
            id:2,
            time:"2020-11-2",
            name:"天气预测",//取对应的TaskTemplate的name
            subnames:"数据预处理 回报检验",
            state:"待审核"
          },
          {
            id:3,
            time:"2020-11-3",
            name:"天气预测",//取对应的TaskTemplate的name
            subnames:"数据预处理 回报检验",
            state:"待审核"
          }
        ],
        selectedId:-1,
      }
    },
    components:{TaskInfo},
    methods: {
      handleClick(row){
        //console.log(row);
        this.ifInfo=true;
        this.selectedId=row.id;
      },
      back(){
        this.ifInfo=false;
      }
    }
  }
</script>

<style scoped lang="less">

  .work-history{
    width: 90%;
    display: flex;
    flex-direction: column;
    padding-left: 10%;

    .title{
      width: 100%;
      padding-top: 20px;
      font-size: 22px;

      .el-breadcrumb{
        font-size: 22px;
      }
    }

    .content{
      width: 80%;
      max-height: 75vh;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;

      .taskinfo{
        font-size: 18px;
      }
    }
  }



















</style>
