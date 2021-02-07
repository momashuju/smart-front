<template>
  <div class="work-history">
    <div class="title">
        <el-page-header @back="back" content="任务详情" v-if="ifInfo">
        </el-page-header>
    </div>
    <div class="content">
      <div class="taskList" v-if="!ifInfo">
        <div class="search">
          <el-radio-group v-model="taskState" @change="changeState">
            <el-radio-button label="3">全部</el-radio-button>
            <el-radio-button label="0">待审核</el-radio-button>
            <el-radio-button label="1">执行中</el-radio-button>
            <el-radio-button label="2">已完成</el-radio-button>
            <el-radio-button label="-1">被拒绝</el-radio-button>
          </el-radio-group>
          <el-input
            class="searchInput"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchText"
            @keyup.enter.native="BindEnter()"
          >
          </el-input>
        </div>

        <el-table
          :data="tasks"
          @sort-change="changeTableSort"
          style="width: 100%">
          <el-table-column
            prop="time"
            label="创建日期"
            width="180"
            :sortable="'custom'"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="任务名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="subnames"
            label="相关子任务"
            width="300">
          </el-table-column>
          <el-table-column
            prop="string_state"
            label="任务状态"
            width="180"
          >
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="medium">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="taskInfo" v-else>
        <TaskInfo class="taskinfo" :task_id="selectedId" />
        <div class="verify" v-if="selectedTaskState===2">
          <el-button  @click="get_result" :loading="ifLoading">查看结果</el-button>
          <el-button type="primary" @click="download_result">下载结果</el-button>
        </div>
        <div class="img" v-if="get_Res">
          <el-image
            :src="imgUrl"
            :fit="fit"></el-image>
        </div>
      </div>
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
        tasks:[],
        selectedId:-1,
        selectedTaskState:0,
        searchText:"",
        sortType:"",
        taskState:3,
        get_Res:false,
        ifLoading: false,
      }
    },
    components:{TaskInfo},
    mounted(){
      this.getUserTasks();
    },
    methods: {
      getUserTasks(){
        const userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
        let uid=userInfo.uid;
        let data={
          uid:uid,
          searchText:this.searchText,
          state:parseInt(this.taskState),
          sortType:this.sortType
        };
        console.log(data);
        this.$axios.post('/history/getUserTasks',data).then(
          (response)=>{
            console.log(response.data)
            if(response.data.success){
              let tasks=response.data.content;
              for(var i=0;i<tasks.length;i++){
                let string_state="";
                switch (tasks[i].state) {
                  case 0:
                    string_state="待审批";
                    break;
                  case 1:
                    string_state="执行中";
                    break;
                  case 2:
                    string_state="已完成";
                    break;
                  case -1:
                    string_state="被拒绝";
                    break;
                  default:
                    break;
                }
                tasks[i].string_state=string_state;
              }
              this.tasks=tasks;
            }

          }
        ).catch().finally(
        );

      },
      handleClick(row){
        this.ifInfo=true;
        this.selectedId=row.taskInstanceId;
        this.selectedTaskState=row.state;
      },
      back(){
        this.ifInfo=false;
        this.get_Res=false;
      },
      changeState:function(s){
        this.getUserTasks();
      },
      changeTableSort(column) {
        console.log(column);
        //获取字段名称和排序类型
        var fieldName = column.prop;
        var sortingType = column.order;
        if(fieldName==="time"){
          if(sortingType==="ascending"){
            this.sortType="time";
          }else{
            this.sortType="time-reverse";
          }
        }
        this.getUserTasks();
      },
      BindEnter() {
        this.getUserTasks();
      },
      //根据taskInstance的id获取结果,todo
      get_result(){
        this.ifLoading=true;
        this.ifLoading=false;
        this.$axios.get('/history/getResult',{params:{id:this.selectedId}})
          .then(response=>{
            console.log(response.data);
          })
          .catch(error=>{
            console.log(error);
          });
        this.get_Res=true;

      },
      //下载结果.todo
      download_result(){

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
      width: 100%;
      max-height: 75vh;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;


      .taskList{
        display: flex;
        flex-direction: column;

        .search{
          display: flex;
          flex-direction: row;


          .searchInput{
            margin-left: 20px;
            width: 30%;
          }
        }
      }

      .taskInfo{
        .taskinfo{
          font-size: 18px;
        }

        .verify{
          width: 50%;
          padding-left: 40px;
          text-align: left;
        }

        .img{
          width: 100%;
          text-align: left;
        }
      }


    }
  }



















</style>
