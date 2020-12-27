<template>
  <div class="workspace">
    <div class="main">
      <div class="task-progress-bar">
        <a-steps :current="step_index-1">
          <a-step>
            <!-- <span slot="title">Finished</span> -->
            <template slot="title">
              选择脚本
            </template>
            <span slot="description"></span>
          </a-step>
          <a-step title="输入参数"  description="" />
          <a-step title="获取结果" description="" />
        </a-steps>
      </div>
      <div class="progress">
        <div class="task-scripts" v-if="step_index===1">
          <div class="task-scripts-title">
            选择调用的脚本
          </div>
          <div class="task-scripts-items">
            <div  v-for="(item ,index) in configs" :class="setClass(index)" @click="selectScript(index)">
                <div class="item-index">{{index+1}}&nbsp</div>
                <div class="item-name" @click="go_next(index)">{{item.name}}</div>
                <div class="item-desc">一些相关描述，{{item.desc}}</div>
            </div>
          </div>

        </div>
        <div class="task-param-form" v-if="step_index===2">
          <div class="form-title">已选择{{configs[script_index].desc}},请输入参数</div>
          <div class="form">
            <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item v-for="(param,i) in configs[script_index].params" :label="param.desc" v-bind:key="i">
                <a-input v-if="param.type==='string'" v-model="form.params[i]"/>
                <a-input-number v-if="param.type==='number'" v-model="form.params[i]"/>
                <a-auto-complete v-if="param.type==='list'" v-model="form.params[i]" :data-source="param.values">
                </a-auto-complete>
                <a-select v-if="param.type==='select'"  v-model="form.params[i]">
                  <a-select-option v-for="obj in param.key_values" :value="obj.key" :key="obj.key">
                    {{obj.value}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-form-model>
          </div>
          <div class="bottom">
            <div style="position: relative">
              <div class="prev-button" v-if="step_index>1" @click="prev()">上一步</div>
              <div class="next-button" v-if="step_index<3" @click="next()">下一步</div>
            </div>
          </div>
        </div>
        <div class="task-result" v-if="step_index===3">
          <div class="result-loading" v-if="ifLoading">
            结果正在计算，稍等片刻可<a href="javascript:void(0);" v-on:click="getImage()">加载结果</a>
          </div>
          <div class="result-loading" v-if="!ifLoading">
            结果加载完成，可<a href="javascript:void(0);" v-on:click="getImage()">下载结果</a>或
            <a href="javascript:void(0);" v-on:click="prev()">返回</a>
          </div>
          <div class="result-img">
            <img class="result-img-div" v-if="ifLoading" :src="loadingImg">
            <img class="result-img-div" v-if="!ifLoading" :src="imgUrl">
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import AFormModelItem from "ant-design-vue/es/form-model/FormItem";
  import ARadioGroup from "ant-design-vue/es/radio/Group";
  import ARadioButton from "ant-design-vue/es/radio/RadioButton";
  import imgUrl from "../assets/img.png"
  import loading from "../assets/loading.gif"

  export default {
    name: 'WorkSpace',
    components: {ARadioButton, ARadioGroup, AFormModelItem, AFormItem},
    data() {
      return {
        msg: 'Welcome to WorkSpace',
        current: ['mail'],
        openKeys: ['sub1'],
        ifLoading:true,
        imgUrl:imgUrl,
        loadingImg:loading,
        labelCol: {span: 4},
        wrapperCol: {span: 12},
        step_index:1,
        script_index:-1,
        configs: [
          {
            "name": "month2sea.ncl",
            "desc": "数据预处理",
            "params": [
              {
                "name": "eyear",
                "desc": "预测年份",
                "type": "list",
                "values": [
                  "2000",
                  "2001",
                  "2002",
                  "2003",
                  "2004",
                  "2005",
                  "2006",
                  "2007",
                  "2008",
                  "2009",
                  "2010",
                  "2011",
                  "2012",
                  "2013",
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019",
                  "2020"
                ]
              },
              {
                "name": "varname",
                "desc": "变量",
                "type": "list",
                "values": [
                  "temp",
                  "rainfall"
                ]
              },
              {
                "name": "season",
                "desc": "数据季节",
                "type": "list",
                "values": [
                  "JFM",
                  "FMA",
                  "MAM",
                  "AMJ",
                  "MJJ",
                  "JJA",
                  "JAS",
                  "ASO",
                  "SON",
                  "OND",
                  "NDJ",
                  "DJF"
                ]
              }
            ]
          },
          {
            "name": "select_optimum_modes.ncl",
            "desc": "回报检验",
            "params": [
              {
                "name": "fyear",
                "desc": "预测年份",
                "type": "list",
                "values": [
                  "2000",
                  "2001",
                  "2002",
                  "2003",
                  "2004",
                  "2005",
                  "2006",
                  "2007",
                  "2008",
                  "2009",
                  "2010",
                  "2011",
                  "2012",
                  "2013",
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019",
                  "2020"
                ]
              },
              {
                "name": "fcstseason",
                "desc": "预测季节",
                "type": "list",
                "values": [
                  "JFM",
                  "FMA",
                  "MAM",
                  "AMJ",
                  "MJJ",
                  "JJA",
                  "JAS",
                  "ASO",
                  "SON",
                  "OND",
                  "NDJ",
                  "DJF"
                ]
              },
              {
                "name": "baseseason",
                "desc": "起报时间",
                "type": "list",
                "values": [
                  "JFM",
                  "FMA",
                  "MAM",
                  "AMJ",
                  "MJJ",
                  "JJA",
                  "JAS",
                  "ASO",
                  "SON",
                  "OND",
                  "NDJ",
                  "DJF"
                ]
              }
            ]
          },
          {
            "name": "model.forecast.ncl",
            "desc": "预报",
            "params": [
              {
                "name": "fyear",
                "desc": "预测年份",
                "type": "list",
                "values": [
                  "2000",
                  "2001",
                  "2002",
                  "2003",
                  "2004",
                  "2005",
                  "2006",
                  "2007",
                  "2008",
                  "2009",
                  "2010",
                  "2011",
                  "2012",
                  "2013",
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019",
                  "2020"
                ]
              },
              {
                "name": "fcstseason",
                "desc": "预测季节",
                "type": "list",
                "values": [
                  "JFM",
                  "FMA",
                  "MAM",
                  "AMJ",
                  "MJJ",
                  "JJA",
                  "JAS",
                  "ASO",
                  "SON",
                  "OND",
                  "NDJ",
                  "DJF"
                ]
              },
              {
                "name": "baseseason",
                "desc": "起报时间",
                "type": "list",
                "values": [
                  "JFM",
                  "FMA",
                  "MAM",
                  "AMJ",
                  "MJJ",
                  "JJA",
                  "JAS",
                  "ASO",
                  "SON",
                  "OND",
                  "NDJ",
                  "DJF"
                ]
              },
              {
                "name": "varname",
                "desc": "变量",
                "type": "list",
                "values": [
                  "temp",
                  "rainfall"
                ]
              },
              {
                "name": "subReg",
                "desc": "预测区域",
                "type": "list",
                "values": [
                  "BJRCC",
                  "SYRCC"
                ]
              },
              {
                "name": "olr",
                "desc": "OLR模态数",
                "type": "list",
                "values": [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20"
                ]
              },
              {
                "name": "hgt",
                "desc": "HGT模态数字",
                "type": "list",
                "values": [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20"
                ]
              }
            ]
          },
          {
            "name": "month2sea.ncl",
            "desc": "脚本4",
            "params": [
              {
                "name": "eyear",
                "desc": "预测年份",
                "type": "list",
                "values": [
                  "2000",
                  "2001",
                  "2002",
                  "2003",
                  "2004",
                  "2005",
                  "2006",
                  "2007",
                  "2008",
                  "2009",
                  "2010",
                  "2011",
                  "2012",
                  "2013",
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019",
                  "2020"
                ]
              },
              {
                "name": "varname",
                "desc": "变量",
                "type": "list",
                "values": [
                  "temp",
                  "rainfall"
                ]
              },
              {
                "name": "season",
                "desc": "数据季节",
                "type": "list",
                "values": [
                  "JFM",
                  "FMA",
                  "MAM",
                  "AMJ",
                  "MJJ",
                  "JJA",
                  "JAS",
                  "ASO",
                  "SON",
                  "OND",
                  "NDJ",
                  "DJF"
                ]
              }
            ]
          },
          {
            "name": "month2sea.ncl",
            "desc": "脚本5",
            "params": [
              {
                "name": "eyear",
                "desc": "预测年份",
                "type": "list",
                "values": [
                  "2000",
                  "2001",
                  "2002",
                  "2003",
                  "2004",
                  "2005",
                  "2006",
                  "2007",
                  "2008",
                  "2009",
                  "2010",
                  "2011",
                  "2012",
                  "2013",
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019",
                  "2020"
                ]
              },
              {
                "name": "varname",
                "desc": "变量",
                "type": "list",
                "values": [
                  "temp",
                  "rainfall"
                ]
              },
              {
                "name": "season",
                "desc": "数据季节",
                "type": "list",
                "values": [
                  "JFM",
                  "FMA",
                  "MAM",
                  "AMJ",
                  "MJJ",
                  "JJA",
                  "JAS",
                  "ASO",
                  "SON",
                  "OND",
                  "NDJ",
                  "DJF"
                ]
              }
            ]
          },
          {
            "name": "month2sea.ncl",
            "desc": "脚本6",
            "params": [
              {
                "name": "eyear",
                "desc": "预测年份",
                "type": "list",
                "values": [
                  "2000",
                  "2001",
                  "2002",
                  "2003",
                  "2004",
                  "2005",
                  "2006",
                  "2007",
                  "2008",
                  "2009",
                  "2010",
                  "2011",
                  "2012",
                  "2013",
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019",
                  "2020"
                ]
              },
              {
                "name": "varname",
                "desc": "变量",
                "type": "list",
                "values": [
                  "temp",
                  "rainfall"
                ]
              },
              {
                "name": "season",
                "desc": "数据季节",
                "type": "list",
                "values": [
                  "JFM",
                  "FMA",
                  "MAM",
                  "AMJ",
                  "MJJ",
                  "JJA",
                  "JAS",
                  "ASO",
                  "SON",
                  "OND",
                  "NDJ",
                  "DJF"
                ]
              }
            ]
          },
          {
            "name": "month2sea.ncl",
            "desc": "脚本7",
            "params": [
              {
                "name": "eyear",
                "desc": "预测年份",
                "type": "list",
                "values": [
                  "2000",
                  "2001",
                  "2002",
                  "2003",
                  "2004",
                  "2005",
                  "2006",
                  "2007",
                  "2008",
                  "2009",
                  "2010",
                  "2011",
                  "2012",
                  "2013",
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019",
                  "2020"
                ]
              },
              {
                "name": "varname",
                "desc": "变量",
                "type": "list",
                "values": [
                  "temp",
                  "rainfall"
                ]
              },
              {
                "name": "season",
                "desc": "数据季节",
                "type": "list",
                "values": [
                  "JFM",
                  "FMA",
                  "MAM",
                  "AMJ",
                  "MJJ",
                  "JJA",
                  "JAS",
                  "ASO",
                  "SON",
                  "OND",
                  "NDJ",
                  "DJF"
                ]
              }
            ]
          },
          {
            "name": "month2sea.ncl",
            "desc": "脚本8",
            "params": [
              {
                "name": "eyear",
                "desc": "预测年份",
                "type": "list",
                "values": [
                  "2000",
                  "2001",
                  "2002",
                  "2003",
                  "2004",
                  "2005",
                  "2006",
                  "2007",
                  "2008",
                  "2009",
                  "2010",
                  "2011",
                  "2012",
                  "2013",
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019",
                  "2020"
                ]
              },
              {
                "name": "varname",
                "desc": "变量",
                "type": "list",
                "values": [
                  "temp",
                  "rainfall"
                ]
              },
              {
                "name": "season",
                "desc": "数据季节",
                "type": "list",
                "values": [
                  "JFM",
                  "FMA",
                  "MAM",
                  "AMJ",
                  "MJJ",
                  "JJA",
                  "JAS",
                  "ASO",
                  "SON",
                  "OND",
                  "NDJ",
                  "DJF"
                ]
              }
            ]
          }
        ],
        params: [],
        form: {
          name: '',
          desc: '',
          params: [],
          target: '',
        },
        tempInput: '',
      }
    },
    watch: {
      openKeys(val) {
        console.log('openKeys', val);
      },
    },
    methods: {
      handleClick(e) {
        console.log('click', e);
      },
      titleClick(e) {
        console.log('titleClick', e);
      },
      setClass(index){
        if(index%2===0){
          return "task-scripts-item"
        }
        return "task-scripts-item even"
      },
      getImage(){
        this.ifLoading=false
      },
      selectScript(index){
        this.script_index=index
      },
      prev(){
        this.step_index-=1;
      },
      next(){
        if(this.step_index===1){
          if(this.script_index===-1){
            this.$message.info('请选择脚本');
          }
          else{
            this.step_index=2;
          }
        }
        else if(this.step_index===2){
          let i=0;
          let judge=false;
          for(i;i<this.configs[this.script_index].params.length;i++){
            if(this.form.params[i]){

            }
            else{
              judge=true;
              break
            }
          }
          if(judge){
            this.$message.info('请输入完整的参数');
          }
          else{
            this.ifLoading=true
            this.step_index=3
          }
        }

      },
      go_next(index){
        this.selectScript(index);
        this.next();
      }
    }
  }
</script>

<style scoped>
  .workspace{
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .task-progress-bar{
    width: 100%;
  }

  .main{
    width: 70%;
    min-height: 75vh;
    position: relative;
    padding-top: 20px;
  }

  .progress{
    padding-top: 20px;
  }

  .task-scripts{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding-left: 15%;
  }

  .task-scripts-title{
    width: 100%;
    height: 20px;
    font-size: 16px;
    box-shadow: 0 2px 8px #f0f1f2;
    text-align: left;
  }

  .task-scripts-items{
    min-width: 100%;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .task-scripts-item{
    position: relative;
    height: 30px;
    padding: 20px;
  }

  .task-scripts-item:hover{
    height: 50px;
    border: 2px solid green;
  }

  .even{
    background-color:whitesmoke;
  }

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
    width: 30%;
    text-align:left;
    position: absolute;
    left: 40%;
    top:10px;
  }
  .item-desc:hover{
  }


  .task-param-form{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding-left: 15%;

  }

  .form-title{
    width: 100%;
    height: 20px;
    font-size: 16px;
    box-shadow: 0 2px 8px #f0f1f2;
    margin-left: 10%;
    text-align: left;
  }

  .form{
    width: 100%;
    padding-top: 5%;
    text-align: left;
  }

  .task-result{

  }

  .result-loading{
    width: 30%;
    height: 20px;
    font-size: 16px;
    box-shadow: 0 2px 8px #f0f1f2;
    position: absolute;
    top: 15%;
    left: 30%;
    text-align: left;
  }

  .result-img{
    width: 100%;
    height: 80%;
    position: absolute;
    top: 20%;
    left: 13%;

  }

  .result-img-div{
    max-width: 100%;
    max-height: 100%;
  }



  .bottom{
    width: 100%;
    padding-top: 5%;
  }

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
</style>
