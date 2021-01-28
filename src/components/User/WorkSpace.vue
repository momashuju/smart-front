<template>
  <div class="workspace">
    <div class="main">
      <div class="task-progress-bar">
        <!--<a-steps :current="step_index-1">-->
          <!--<a-step title="新建任务"  description="" />-->
          <!--<a-step title="输入参数"  description="" />-->
          <!--<a-step title="获取结果" description="" />-->
        <!--</a-steps>-->
        <el-steps :active="step_index-1" finish-status="success" simple style="margin-top: 20px">
          <el-step title="选择模板" ></el-step>
          <el-step title="输入参数" ></el-step>
          <el-step title="确认新建" ></el-step>
        </el-steps>

      </div>
      <div class="progress">
        <div class="task-scripts" v-if="step_index===1">
          <!--<div class="task-scripts-title">-->
            <!--选择任务模板-->
          <!--</div>-->
          <el-table
            ref="singleTable"
            :data="taskTemplates"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              property="name"
              label="任务名称"
              width="120">
            </el-table-column>
            <el-table-column
              property="description"
              label="描述信息">
            </el-table-column>
          </el-table>
        </div>
        <div class="task-param-form" v-if="step_index===2">
          <!--<div class="forms-title">请为以下子任务设定参数</div>-->
          <div class="form">
            <a-form-model  v-for=" (item,index) in childrenTaskTemplates" :model="forms[index]" :label-col="labelCol" :wrapper-col="wrapperCol" v-bind:key="index">
              <div class="form-title">{{item.name}}</div>
              <a-form-model-item v-for="(param,i) in item.param" :label="param.name" v-bind:key="i">
                <!--<a-input v-if="param.type==='string'" v-model="forms[index].params[i]"/>-->
                <!--<a-input-number v-if="param.type==='number'" v-model="forms[index].param[i]"/>-->
                <a-auto-complete v-model="forms[index].param[i]" :data-source="param.value"/>
                <!--<a-select v-if="param.type==='select'"  v-model="forms[index].params[i]">-->
                  <!--<a-select-option v-for="obj in param.key_values" :value="obj.key" :key="obj.key">-->
                    <!--{{obj.value}}-->
                  <!--</a-select-option>-->
                <!--</a-select>-->
              </a-form-model-item>
            </a-form-model>
          </div>

        </div>
        <div class="task-confirm" v-if="step_index===3">
          <!--<div class="confirm-title">请确认任务信息</div>-->
          <div>
            <el-table
              :data="info"
              style="width: 100%">
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
            </el-table>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="task"
                label="所属任务"
                width="180">
              </el-table-column>
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
            </el-table>
          </div>
        </div>

      </div>
    </div>
    <div class="bottom">
        <el-button v-if="step_index>1" @click="prev()">上一步</el-button>
        <el-button v-if="step_index<3" @click="next()">下一步</el-button>
        <el-button v-if="step_index===3"  type="primary" @click="generateTask">确认</el-button>
    </div>
  </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import AFormModelItem from "ant-design-vue/es/form-model/FormItem";
  import ARadioGroup from "ant-design-vue/es/radio/Group";
  import ARadioButton from "ant-design-vue/es/radio/RadioButton";
  import imgUrl from "../../assets/img.png"
  import loading from "../../assets/loading.gif"

  export default {
    name: 'WorkSpace',
    components: {ARadioButton, ARadioGroup, AFormModelItem, AFormItem},
    data() {
      return {
        msg: 'Welcome to WorkSpace',
        ifLoading:true,
        imgUrl:imgUrl,
        loadingImg:loading,
        labelCol: {span: 4},
        wrapperCol: {span: 12},
        step_index:1,
        script_index:-1,
        params: [],
        forms: [],
        tempInput: '',
        taskTemplates:[
          {
            id:1,
            name:"天气预测",
            description:"进行局部范围内的天气预测，需要进行数据预处理等工作"
          },
          {
            id:2,
            name:"气温预测",
            description:"进行局部范围内的气温预测，需要进行数据预处理等工作"
          },
          {
            id:3,
            name:"降水量预测",
            description:"进行局部范围内的降水量预测，需要进行数据预处理等工作"
          }
        ],
        childrenTaskTemplates:[],
        info:[{
          time:"2016-05-02",
          name:"天气预测",
          description:"一些相关描述"
        }],
        tableData: [{
          task:"子任务一",
          name: 'start-year',
          value: '2001'
        }, {
          task:"子任务一",
          name: 'end-year',
          value: '2002'
        },{
          task:"子任务一",
          name:"val",
          value:"true"
        }]
      }
    },
    methods: {
      handleCurrentChange(val) {
        let id=val.id;
        let tasks=this.taskTemplates;
        let i;
        for(i=0;i<tasks.length;i++){
          if(tasks[i].id===id){
            this.script_index = i;
            break;
          }
        }
        console.log(this.script_index)
      },
      prev(){
        this.step_index-=1;
      },
      next(){
        if(this.step_index===1){
          if(this.script_index===-1){
            this.$message.info('请选择一个任务模板用来新建任务');
          }
          else{
            let id=this.taskTemplates[this.script_index].id;
            this.getChildrenTaskTemplates(id);
          }
        }
        else if(this.step_index===2){
          let i,j;
          let judge=false;
          for(i=0;i<this.childrenTaskTemplates.length;i++){
            let len=this.childrenTaskTemplates[i].param.length;
            let len2=this.forms[i].param.length;
            if(len!==len2){
              judge=true;
              break;
            }
            for(j=0;j<len;j++){
              if(this.forms[i].param[j]){

              }
              else{
                judge=true;
                break
              }
            }

          }
          if(judge){
            this.$message.info('请输入完整的参数');
          }
          else{
            this.beforeConfirm();
            this.step_index=3
          }
        }

      },
      go_next(index,id){
        this.selectScript(index);
        this.getChildrenTaskTemplates(id);
      },
      getTaskTemplates(){

      },
      getChildrenTaskTemplates(id){
        console.log("getChildrenTaskTemplates by id",id);
        let childrenTaskTemplates=[
          {
            id:1,
            name:"数据预处理",
            description:"按照输入参数进行数据预处理",
            index:1,
            script:"dataPreProcess.ncl",
            param:[
              {
                name:"year",
                value:"2001 2002 2003 2004"
              },
              {
                name:"area",
                value:"South North East West"
              },
              {
                name:"variety",
                value:"True False"
              }
            ]
          },
          {
            id:2,
            name:"回报检验",
            description:"按照输入参数进行回报检验",
            index:2,
            script:"select_optimum_modes",
            param:[
              {
                name:"fyear",
                value:"2001 2002 2003 2004 2005"
              },
              {
                name:"fseason",
                value:"JFM FMA MAM AMJ MJJ JJA JAS ASO SON OND NDJ DJF"
              },
              {
                name:"variety",
                value:"True False"
              }
            ]
          }
        ];
        let forms=[];
        let i,j;
        for(i=0;i<childrenTaskTemplates.length;i++){
          let params=childrenTaskTemplates[i].param;
          let list=[];
          for(j=0;j<params.length;j++){
            let param={
              name:params[j].name,
              value:params[j].value.split(" ")
            };
            list.push(param);
          }
          childrenTaskTemplates[i].param=list;
          forms.push({
            param:[]
          })
        }
        // console.log(childrenTaskTemplates)
        this.childrenTaskTemplates=childrenTaskTemplates;
        this.forms=forms;
        this.step_index=2;
      },
      generateTask(){},
      beforeConfirm(){
        console.log(this.forms);
        let myDate = new Date();
        let time=myDate.toLocaleDateString();
        let task=this.taskTemplates[this.script_index];
        let info=[{
          time:time,
          name:task.name,
          description:task.description
        }];
        console.log("info",info);
        let childrenTasks=this.childrenTaskTemplates;
        let forms=this.forms;
        let i,j;
        let data=[];
        for(i=0;i<childrenTasks.length;i++){
          let name=childrenTasks[i].name;
          let params=childrenTasks[i].param;
          let values=forms[i].param;
          for(j=0;j<params.length;j++){
            data.push({
              task:name,
              name: params[j].name,
              value: values[j]
            })
          }

        }
        console.log("data",data);
        this.tableData=data;
        this.info=info;
      }


    }
  }
</script>

<style scoped lang="less">
  .workspace{
    width: 100%;
    display: flex;
    flex-direction: column;


    .main{
      width: 80%;
      position: relative;
      padding-top: 20px;

      .task-progress-bar{
        width: 100%;
        padding-left: 15%;
      }

      .progress{
        padding-top: 20px;

        .task-scripts{
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          padding-left: 20%;
          .task-scripts-title{
            width: 100%;
            height: 22px;
            font-size: 18px;
            box-shadow: 0 2px 8px #f0f1f2;
            margin-left: 10%;
            text-align: left;
          }

          .task-scripts-items{
            min-width: 100%;
            padding-top: 10px;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;

            .even{
              background-color:whitesmoke;
            }

            .task-scripts-item{
              position: relative;
              height: 30px;
              padding: 20px;


              .item-index{
                width: 5%;
                position: absolute;
                left: 0;
                top:10px;
                text-align: center;
              }

              .item-name{
                width: 30%;
                text-align: left;
                font-size: 16px;
                position: absolute;
                left: 5%;
                top:10px;
                cursor: pointer;

              }

              .item-name:hover{
                color: #8cc8ff;
                font-size: 18px;
              }

              .item-desc{
                width: 40%;
                text-align:left;
                position: absolute;
                left: 30%;
                top:10px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .item-desc:hover{
              }

              .item-selected{
                width: 5%;
                color: green;
                text-align:left;
                font-size: 18px;
                position: absolute;
                left: 80%;
                top:10px;
              }
            }

            .task-scripts-item:hover{
              height: 50px;
              border: 2px solid green;
            }
          }
        }

        .task-param-form{
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          padding-left: 15%;

          .forms-title{
            width: 100%;
            height: 22px;
            font-size: 18px;
            box-shadow: 0 2px 8px #f0f1f2;
            margin-left: 10%;
            text-align: left;
          }

          .form{
            width: 100%;
            padding-top: 5%;
            text-align: left;

            .form-title{
              width: 80%;
              text-align: center;
              font-size: 16px;
            }
          }

        }


        .task-confirm{


          padding-left: 20%;

          .confirm-title{
            width: 100%;
            height: 22px;
            font-size: 18px;
            box-shadow: 0 2px 8px #f0f1f2;
            text-align: left;
          }
        }
      }

    }
  }



  .bottom{
    width: 100%;
    padding-top: 5%;

    .prev-button{
      position: absolute;
      cursor: pointer;
      left: 20%;
      font-size: 16px;
    }

    .prev-button:hover{
      color: #8cc8ff;
      font-size: 18px;
    }

    .next-button{
      position: absolute;
      left: 50%;
      cursor: pointer;
      font-size: 16px;
    }

    .next-button:hover{
      color: #8cc8ff;
      font-size: 18px;
    }
  }


</style>
