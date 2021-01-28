<template>
  <div class="whole" v-if="ifLogged">
    <div class="title">
      <h1 @click="goto(1)">Smart Forecast</h1>
    </div>
    <div class="main" v-if="role==='user'">
      <div class="menu-item">
        <a href="javascript:void(0);" :class="setclass(1)" v-on:click="goto(1)">工作区</a>
      </div>
      <div class="menu-item">
        <a href="javascript:void(0);" :class="setclass(2)" v-on:click="goto(2)">历史记录</a>
      </div>
      <div class="menu-item">
        <a href="javascript:void(0);" :class="setclass(3)" v-on:click="goto(3)">我的信息</a>
      </div>
    </div>
    <div class="main" v-else>
      <div class="menu-item">
        <a href="javascript:void(0);" :class="setclass(1)" v-on:click="goto(1)">工作区</a>
      </div>
      <div class="menu-item">
        <a href="javascript:void(0);" :class="setclass(2)" v-on:click="goto(2)">模板管理</a>
      </div>
      <div class="menu-item">
        <a href="javascript:void(0);" :class="setclass(3)" v-on:click="goto(3)">用户管理</a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Header',
    data() {
      return {
        role:"user",
        ifLogged:false,
        menu_index:1
      }
    },
    mounted(){
      this.setLogState()
    },
    methods: {
      setLogState(){
        if(sessionStorage.getItem("userInfo")){
          this.ifLogged=true;
          console.log(sessionStorage.getItem("userInfo"));
          const userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
          // console.log(userInfo.uid)
          this.role=userInfo.role
          // this.imageLink=userInfo.imageLink
          // this.token=userInfo.token;
        }
        else{
          this.ifLogged=false
        }
      },
      goto(type) {
        switch (type) {
          case 1:
            this.menu_index=1;
            this.$emit('changeRoute',1);
            break;
          case 2:
            this.menu_index=2;
            this.$emit('changeRoute',2);
            break;
          case 3:
            this.menu_index=3;
            this.$emit('changeRoute',3);
            break;
          default:
            break;

        }

      },
      setclass (index) {
        let menu_index=this.menu_index;
        if(index===menu_index){
          return "menu-button selected"
        }
        return "menu-button"
      }
  },
  }
</script>

<style scoped>
  .whole{
    position: relative;
    width: 100%;
    height: 70px;
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
  }

  .title{
    position: absolute;
    left: 50px;
    top:20px;
    cursor:pointer;
  }

  .title h1{
    color: #8cc8ff;
    font-size: 40px;
  }

  .main{
    position: absolute;
    left: 30%;
    top:40px;
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .menu-item{
    width: 30%;
    font-size: 20px;

  }

</style>
