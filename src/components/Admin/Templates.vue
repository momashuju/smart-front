<template>
  <div class="whole">
    <div class="title" >
      <div v-if="ifInfo" class="title-buttons">
        <div class="back-button">
          <el-page-header @back="back" content="模板详情" >
          </el-page-header>
        </div>
        <div class="save-button">
          <el-button
            type="primary"
            icon="el-icon-document-checked"
            :disabled="ifChildrenChanged"
            size="mini"
            @click="save">保存</el-button>
        </div>


      </div>
    </div>
    <div class="content">
      <div class="templates" v-if="!ifInfo">
        <div class="templates-list">
          <el-table
            :data="taskTemplates"
            style="width: 100%">
            <el-table-column
              label="任务名称"
              width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>{{ scope.row.name }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="描述"
              width="500"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="add-button">
          <el-button type="primary" @click="handleAdd" icon="el-icon-circle-plus">新增</el-button>
        </div>
      </div>
      <div class="template" v-else>
        <div class="template-title">
          <div class="title-info">
            <el-table
              :data="template_title"
              style="width: 100%">
              <el-table-column
                label="模板名称"
                width="180">
                <template slot-scope="scope">
                  <el-input v-model="template_info.name"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="描述"
                width="500">
                <template slot-scope="scope">
                  <el-input v-model="template_info.description"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="title-button">
            <el-button type="danger" @click="open" size="mini">删除模板</el-button>
            <el-popover
              v-if="childrenTaskTemplates.length===0"
              placement="right"
              width="400"
              trigger="click">
              <el-table :data="baseTemplates" @current-change="(val)=>addChild(val,-1)">
                <el-table-column width="100" property="name" label="子任务"></el-table-column>
                <el-table-column width="300" property="description" label="描述"></el-table-column>
              </el-table>
              <el-button slot="reference" size="mini" style="pointer-events: auto;">增加</el-button>
            </el-popover>
          </div>


        </div>
        <div class="childTemplates">
          <div v-for="(data,index) in childrenTaskTemplates" class="childTemplate" :key="index+'?'+childrenTaskTemplates.length">
            <el-table
              :data="data"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="子任务名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="description"
                label="描述"
                width="200"
              >
              </el-table-column>
              <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteChild(index)">删除</el-button>
                  <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
                    <el-table :data="baseTemplates" @current-change="(val)=>addChild(val,index)">
                      <el-table-column width="100" property="name" label="子任务"></el-table-column>
                      <el-table-column width="300" property="description" label="描述"></el-table-column>
                    </el-table>
                    <el-button slot="reference" size="mini" style="pointer-events: auto;">增加</el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </div>

      </div>
    </div>
  </div>

</template>

<script>
    export default {
      name: "Templates",
      data() {
          return {
            taskTemplates:[
            ],
            baseTemplates:[],
            ifInfo:false,
            childrenTaskTemplates:[],
            ifChildrenChanged:false,
            selectedIndex:-1,
            selectedId:-1,
            selectedRow:{},
            template_info:{
              name:"",
              description:""
            },
            template_title:[]
          }
        },
      methods: {
        //列表页面
        init(){
            this.getTaskTemplate();
            this.getBaseTaskTemplate();
          },
        getTaskTemplate(){
          this.$axios.get('/tasktemplate/getTaskTemplates').then(
            (res)=>{
              if(res.data.success){
                this.taskTemplates=res.data.content;
              }
            }
          ).catch();
        },
        getBaseTaskTemplate(){
          this.baseTemplates=[
            {
              id:1,
              name:"数据预处理",
              description:"根据参数进行预处理操作",
              params:"start_year end_year last_time area"
            },
            {
              id:2,
              name:"回报检验",
              description:"根据参数进行回报检验操作",
              params:"start_year end_year area season"
            },
            {
              id:3,
              name:"预测",
              description:"根据参数进行预测操作",
              params:"fcntl area season"
            }]
          this.$axios.get('/tasktemplate/getBaseTaskTemplates').then(
            (res)=>{
              if(res.data.success){
                this.baseTemplates=res.data.content;
              }
            }
          ).catch();
        },
        beforeEdit(row){
          if(row){
            this.template_title=[
              {
                name:row.name,
                description:row.description
              }
            ]
          }
          else{
            this.template_title=[
              {
                name:"",
                description:""
              }
            ]
          }
          this.template_info=this.template_title[0]

        },
        handleEdit(index, row) {
          console.log(row)
            this.beforeEdit(row);
            this.selectedIndex=index;
            this.selectedRow=row;
            let id=row.id;
            this.selectedId=id;
            //根据ID取得具体信息
            this.$axios.get('/tasktemplate/getTaskTemplateInfo',{params:{id:id}}).then(
              (res)=>{
                if(res.data.success){
                  let data=res.data.content.childrenTaskTemplates;
                  let list=[];
                  for(var i=0;i<data.length;i++){
                    delete data[i]["index"];
                    list.push([data[i]])
                  }
                  console.log(list)
                  this.childrenTaskTemplates=list;
                  this.ifInfo=true;
                }
              }
            ).catch();
          },
        open(){
          this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.handleDelete(this.selectedIndex,this.selectedRow)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        handleDelete(index,row) {
            this.$axios.delete('/tasktemplate/deleteTaskTemplate',{params:{id:row.id}}).then(
              (response)=>{
                if(response.data.success){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  if(!this.ifInfo){
                    this.taskTemplates.splice(index,1);
                  }else{
                    this.ifInfo=false;
                  }
                }
              }
            );
          },
        handleAdd(){
          this.beforeEdit();
          this.childrenTaskTemplates=[];
          this.ifInfo=true;
        },
        //详情页面
        back(){
          this.ifInfo=false;
          this.selectedId=-1;
          this.getTaskTemplate();
        },
        addChild(val,index) {
          val.baseId=val.id;
          let newChild=[val];
          this.childrenTaskTemplates.splice(index+1,0,newChild)
        },
        deleteChild(index){
          this.childrenTaskTemplates.splice(index,1)
        },
        save(){
          if(!this.template_info.name){
            this.$message.error('模板名不能为空');
            return
          }
          if(!this.template_info.description){
            this.$message.error('模板描述不能为空');
            return
          }
          if(this.childrenTaskTemplates.length===0){
            if(this.selectedId===-1){
              this.$message({
                type: 'warning',
                message: '你需要为这个模板增加子任务'
              });
            }else{
              this.$confirm('该模板子任务为空，将被删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.handleDelete(this.selectedIndex,this.selectedRow)
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });

            }
          }
          else{
            let baseTasks=[];
            for(var i=0;i<this.childrenTaskTemplates.length;i++){
              baseTasks.push(this.childrenTaskTemplates[i][0].baseId)
            }
            let str=baseTasks.join(",");
            if(this.selectedId===-1){
              let data={
                name:this.template_info.name,
                description:this.template_info.description,
                baseTasks:str
              };
              console.log(data)
              this.$axios.post('/tasktemplate/addTaskTemplate',data).then(
                (res)=>{
                  if(res.data.success){
                    this.$message({
                      type: 'success',
                      message: '已保存'
                    });
                    this.back();
                  }
                }
              )
            }
            else{
              let data={
                id:this.selectedId,
                name:this.template_info.name,
                description:this.template_info.description,
                baseTasks:str
              };
              this.$axios.post('/tasktemplate/updateTaskTemplate',data).then(
                (res)=>{
                  if(res.data.success){
                    this.$message({
                      type: 'success',
                      message: '已保存'
                    });
                    this.back();
                  }
                }
              )

            }
          }
        }
        },
      mounted() {
        this.getTaskTemplate();
        this.getBaseTaskTemplate();
      }

    }
</script>

<style scoped lang="less">
  .whole{
    width: 90%;
    display: flex;
    flex-direction: column;
    padding-left: 10%;

    .title{
      width: 100%;
      padding-top: 20px;
      font-size: 22px;
      .title-buttons{
        display: flex;
        flex-direction: row;
        .back-button{
          width: 20%;
          padding-top: 10px;
        }

        .save-button{
          text-align: left;
          width: 50%;
        }
      }
    }

    .content{
      width: 100%;
      max-height: 75vh;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;

      .templates{
        display: flex;
        flex-direction: row;
        width: 100%;

        .templates-list {
          width: 80%;
        }

        .add-button{
          width: 10%;
          padding-left: 20px;
        }
      }

      .template{
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;

        .template-title{
          width: 100%;
          display: flex;
          flex-direction: row;
          .title-info{
            width: 70%;
          }
          .title-button{
            width: 20%;
          }
        }

        .childTemplates{
          width: 100%;
        }


      }


    }
  }
</style>
