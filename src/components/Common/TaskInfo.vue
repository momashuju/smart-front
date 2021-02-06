<template>
  <div class="whole">
    <div class="info">
      <el-table
        :data="info"
      >
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
          prop="state"
          label="任务状态"
          width="180">
        </el-table-column>
      </el-table>
    </div>

    <div class="tableDatas">
      <div v-for="(tableData,index) in tableDatas" class="tableData">
        <el-table
          :data="tableData.params"
          highlight-current-row
          border
        >
          <el-table-column
            type="index"
            width="40">
          </el-table-column>
          <el-table-column
            :label="tableData.templateName"
            width="360">
            <el-table-column
              prop="name"
              label="参数名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="value"
              label="参数值"
              width="180">
            </el-table-column>
          </el-table-column>

        </el-table>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
      name: "TaskInfo",
      data() {
        return {
          msg:"任务",
          ifLogged: false,
          id:-1,
          state: 0,
          info: [],
          tableDatas: [
          ]
        };
      },
      props: ["task_id"],
      created() {
        this.id=this.task_id;
        this.init();
      },
      methods: {
        init() {
          //根据this.task_id来初始化tableData和info
          console.log(this.id)
          this.$axios.get('/adminworkspace/getTaskInfo',{params:{id:this.id}})
            .then(response=>{
              let resdata=response.data;
              console.log(resdata)
              if(resdata.success){
                let data=resdata.content;
                let string_state="";
                switch (data.state) {
                  case 0:
                    string_state="等待审批";
                    break;
                  case 1:
                    string_state="执行中";
                    break;
                  case 2:
                    string_state="执行完成";
                    break;
                  case -1:
                    string_state="拒绝";
                    break;
                }
                this.info=[
                  {
                    time: data.time,
                    name: data.name,
                    state: string_state
                  }
                ];
                this.tableDatas=data.allParams;
              }
              else{
              }
            })
            .catch(error=>{
              console.log(error);
            });
        }
      }
    }
</script>

<style scoped lang="less">
 .whole{
   width: 100%;

   .info{
     padding-left: 40px;
   }

   .tableDatas{
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;;

     .tableData{
       flex: 0;
       padding-left: 20px;
     }
   }
 }
</style>
