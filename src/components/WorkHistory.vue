<template>
  <div class="work-history">
    <div class="title">
      点击可查看任务详情
    </div>
    <div class="content">
      <div class="content-labels">
        <div class="label-index">序号</div>
        <div class="label-time">执行时间</div>
        <div class="label-name">名称</div>
        <div class="label-script">相关脚本</div>
        <div class="label-status">执行状态</div>
      </div>
      <div  v-for="(item ,index) in logs" :class="setClass(index)" @click="selectLog(index)">
        <div class="item-info">
          <div class="item-index">{{index+1}}&nbsp</div>
          <div class="item-time">{{item.time}}</div>
          <div class="item-name">{{item.name}}</div>
          <div class="item-script">{{item.script}}</div>
          <div :class="setSuccessClass(item.status)">{{item.status}}</div>
        </div>
        <div style="display: flex;flex-direction: row" v-if="index===log_index">
          <div class="item-params" >
            <div class="item-param" v-for="param of item.params">
              <div class="param-name">{{param.name}}:</div>
              <div class="param-value">{{param.value}}</div>
            </div>
            <div class="img-button" v-if="item.status==='success'">
              <a href="javascript:void(0);" v-on:click="getImage()">下载结果</a>
            </div>
          </div>
          <div class="res-img" v-if="item.status==='success'">
            <img class="result-img-div" :src="imgUrl">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  import imgUrl from "../assets/img.png"
  export default {
    name: 'WorkHistory',
    data() {
      return {
        msg: 'Welcome to Work History',
        imgUrl:imgUrl,
        log_index:-1,
        logs:[
          {
            time:"2020.12.26 19:30",
            name:"脚本1",
            script:"month2sea.ncl",
            params:[
              {
                "name": "eyear",
                "value":"2000"
              },
              {
                "name": "varname",
                "value":"rainfall"
              },
              {
                "name": "season",
                "value": "JFM",
              }
            ],
            status:"success"
          },
          {
            time:"2020.12.26 19:30",
            name:"脚本2",
            script:"month2sea.ncl",
            params:[
              {
                "name": "eyear",
                "value":"2000"
              },
              {
                "name": "varname",
                "value":"rainfall"
              },
              {
                "name": "season",
                "value": "JFM",
              }
            ],
            status:"success"
          }
          ,          {
            time:"2020.12.26 19:30",
            name:"脚本3",
            script:"month2sea.ncl",
            params:[
              {
                "name": "eyear",
                "value":"2000"
              },
              {
                "name": "varname",
                "value":"rainfall"
              },
              {
                "name": "season",
                "value": "JFM",
              }
            ],
            status:"success"
          },
          {
            time:"2020.12.26 19:30",
            name:"脚本4",
            script:"month2sea.ncl",
            params:[
              {
                "name": "eyear",
                "value":"2000"
              },
              {
                "name": "varname",
                "value":"rainfall"
              },
              {
                "name": "season",
                "value": "JFM",
              }
            ],
            status:"success"
          }
        ],
      }
    },
    methods: {
      setClass(index){
        if(index%2===0){
          return "log-item"
        }
        return "log-item even"
      },
      setSuccessClass(text){
        if(text==="success"){
          return "item-status success"
        }
        return "item-status fail"
      },
      selectLog(index){
        if(this.log_index===index){
          index=-1;
        }
        this.log_index=index
      },
    }
  }
</script>

<style scoped>

  .work-history{
    width: 100%;
    margin-top: 5%;
    position: relative;
  }
  .title{
    width: 30%;
    height: 20px;
    font-size: 16px;
    box-shadow: 0 2px 8px #f0f1f2;
    position: absolute;
    top: 15%;
    left: 22%;
    text-align: left;
  }

  .content{
    width: 80%;
    max-height: 75vh;
    position: absolute;
    left: 20%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .content-labels{
    position: relative;
    padding: 20px;
  }

  .label-index{
    width: 5%;
    position: absolute;
    left: 0;
    font-size: 16px;
    top:10px;
    text-align: center;
  }

  .label-time{
    width: 20%;
    text-align:  center;
    font-size: 16px;
    position: absolute;
    left: 5%;
    top:10px;
  }

  .label-name{
    width: 10%;
    text-align:  center;
    font-size: 16px;
    position: absolute;
    left: 30%;
    top:10px;
  }

  .label-script{
    width: 10%;
    text-align:  center;
    font-size: 16px;
    position: absolute;
    left: 40%;
    top:10px;
  }

  .label-status{
    width: 10%;
    text-align:  center;
    font-size: 16px;
    position: absolute;
    left: 50%;
    top:10px;
  }

  .log-item{
    background-color:white;
    display: flex;
    max-height: 100%;
    flex-direction: column;

  }

  .log-item:hover{
    border: 2px solid green;
  }

  .even{
    background-color:whitesmoke;
  }

  .item-info{
    width: 100%;
    height: 10%;
    position: relative;
    padding: 20px;
  }

  .item-index{
    width: 5%;
    position: absolute;
    left: 0;
    font-size: 16px;
    top:10px;
    text-align: center;
  }

  .item-time{
    width: 20%;
    text-align:  center;
    font-size: 16px;
    position: absolute;
    left: 5%;
    top:10px;
  }

  .item-name{
    width: 10%;
    text-align:  center;
    font-size: 16px;
    position: absolute;
    left: 30%;
    top:10px;
  }

  .item-script{
    width: 10%;
    text-align:  center;
    font-size: 16px;
    position: absolute;
    left: 40%;
    top:10px;
  }

  .item-status{
    width: 10%;
    text-align:  center;
    font-size: 16px;
    position: absolute;
    left: 50%;
    top:10px;
  }

  .item-params{
    width: 20%;
    margin-left: 11%;
    max-height: 90%;
    text-align:  center;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

  }

  .res-img{
    width: 80%;
    max-height: 70%;
    text-align: left;
  }

  .result-img-div{
    max-width: 70%;
    max-height: 70%;
  }

  .item-param{
    width: 100%;
    height: 20px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .img-button{
    width: 100%;
    height: 30px;
    padding-top: 10px;
    font-size: 16px;
    text-align: left;

  }

  .param-name{
    width: 50%;
    text-align: left;
    font-size: 16px;
  }

  .param-value{
    font-size: 16px;
    width: 50%;
    text-align: left;
  }



  .success{
    color: green;
  }

  .fail{
    color: red;
  }





</style>
