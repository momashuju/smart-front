<template>
  <div class="whole">
    <div class="title">
      <el-page-header @back="back" content="用户详情" v-if="ifInfo">
      </el-page-header>
    </div>
    <div class="content">
      <div class="userList" v-if="!ifInfo">
        <div class="search">
          <el-radio-group v-model="userState" @change="changeState">
            <el-radio-button label="3">全部</el-radio-button>
            <el-radio-button label="1">正常</el-radio-button>
            <el-radio-button label="2">已冻结</el-radio-button>
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
        <div class="user-content">
          <div class="users-data">
            <el-table
              :data="users"
              style="width: 100%"
            >
              <el-table-column
                prop="username"
                label="用户名"
                width="200"
              >
              </el-table-column>
              <el-table-column
                prop="string_state"
                label="用户状态"
                width="200"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
              >
                <template slot-scope="scope" >
                  <el-button  @click="forbidUser(2,scope.row)" size="medium" v-if="scope.row.state===1">冻结账户</el-button>
                  <el-button @click="forbidUser(1,scope.row)" type="danger" size="medium" v-if="scope.row.state===2">解除冻结</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="add-button">
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <el-form :model="newUserForm" status-icon :rules="rules" ref="newUserForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model.number="newUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="newUserForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="newUserForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('newUserForm')">提交</el-button>
                  <el-button @click="resetForm('newUserForm')">重置</el-button>
                </el-form-item>
              </el-form>
              <el-button type="primary" icon="el-icon-circle-plus" slot="reference">新增用户</el-button>
            </el-popover>

          </div>
        </div>

      </div>
      <div class="userInfo" v-else>
        <TaskInfo class="userinfo" :user_id="selectedId" />
        <el-button type="danger" @click="forbidUser(selectedId)">冻结此用户</el-button>

      </div>

    </div>
  </div>


</template>

<script>
    import UserPage from '../Common/UserPage'
    export default {
      name: "Users",
      data() {
        var checkName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空'));
          }
          callback()
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.newUserForm.checkPass !== '') {
              this.$refs.newUserForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.newUserForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ifInfo:false,
          users:[
          ],
          selectedId:-1,
          userState:3,
          searchText:"",
          newUserForm:{
            username:"",
            pass: '',
            checkPass: ''
          },
          rules: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            username: [
              { validator: checkName, trigger: 'blur' }
            ]
          }
        }
      },
      components:{UserPage},
      methods: {
        getUsers(){
          console.log("searchText:",this.searchText,"state",this.userState)
          this.$axios.get('/user/getAllUsers',{params:{searchText:this.searchText,state:this.userState}}).then(
            (res)=>{
              if(res.data.success){
                let users=res.data.content;
                console.log(users);
                for(var i=0;i<users.length;i++){
                  let string_state="已冻结";
                  if(users[i].state===1){
                    string_state="正常"
                  }
                  users[i].string_state=string_state;
                }
                this.users=users;
              }
              else{
                this.$message({
                  message: res.data.message,
                  type: 'error',
                  duration:2000,
                });
              }
            }
          ).catch()
        },
        forbidUser(state,row){
          let id=row.id;
          let data={
            id:id,
            state:state
          };
          this.$axios.post('/user/changeState',data).then(
            (res)=>{
              if(res.data.success){
                this.$message({
                  message: state===0?"解除冻结成功":"冻结成功",
                  type: 'success',
                  duration:2000,
                });
              }
              else{
                this.$message({
                  message: res.data.message,
                  type: 'error',
                  duration:2000,
                });
              }
            }
          ).catch().finally(
            this.getUsers()
          );

        },
        changeState:function(s){
          this.getUsers();
        },
        BindEnter() {
          this.getUsers();
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let data={
                username:this.newUserForm.username,
                password:this.newUserForm.pass
              };
              this.$axios.post('/user/addUser',data).then(
                (res)=>{
                  if(res.data.success){
                    this.$message({
                      message: "添加用户成功",
                      type: 'success',
                      duration:1000,
                    });
                  }
                  else{
                    this.$message({
                      message: res.data.message,
                      type: 'error',
                      duration:1000,
                    });
                  }
                }
              ).catch().finally(
                this.getUsers
              )
            } else {
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      },
      created() {
        this.getUsers();
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
    }

    .content{
      width: 100%;
      max-height: 75vh;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;


      .userList{
        width: 100%;
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

        .user-content{
          width: 100%;
          display: flex;
          flex-direction: row;
          .users-data{
            width: 50%;
          }

          .add-button{
            width: 10%;
          }
        }
      }


    }
  }

</style>
