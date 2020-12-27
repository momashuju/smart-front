<template>
  <div>
    <div>
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="选择选择执行的功能">
          <a-radio-group v-model="form.type" @change="handleSelect" default-value="0">
            <a-radio-button v-for="(config,i) in configs" :value="i" v-bind:key="i">{{config.desc}}</a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item v-for="(param,i) in params" :label="param.desc" v-bind:key="i">
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
        <a-button type="primary" @click="submit">
          确认
        </a-button>
        <a-button type="primary" @click="getResult">展示结果</a-button>
      </a-form-model>
    </div>

    <div>
      <img :src="imgUrl">
    </div>
  </div>
</template>

<script>

  import AFormItem from "ant-design-vue/es/form/FormItem";
  import AFormModelItem from "ant-design-vue/es/form-model/FormItem";
  import ARadioGroup from "ant-design-vue/es/radio/Group";
  import ARadioButton from "ant-design-vue/es/radio/RadioButton";
  export default {
    name: 'HelloWorld',
    components: {ARadioButton, ARadioGroup, AFormModelItem, AFormItem},
    data() {
      return {
        labelCol: {span: 4},
        wrapperCol: {span: 12},
        msg: 'Welcome to Your Vue.js App',
        imgUrl: null,
        configs: [
          {
            "name": "test.sh",
            "desc": "测试专用",
            "target": "/resource/{}.png",
            "params": [
              {
                "name": "test",
                "desc": "文件名",
                "type": "string"
              },
              {
                "name": "test-select",
                "desc": "test-select",
                "type": "select",
                "key_values": [
                  {
                    "key": "DDJ",
                    "value": "三月"
                  },
                  {
                    "key": "3",
                    "value": "4"
                  }
                ]
              }
            ]
          },
          {
            "name": "month2sea.ncl",
            "desc": "1. 数据预处理",
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
            "desc": "2. 回报检验",
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
            "desc": "3. 预报",
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
    created() {
      this.init();
    }
    ,
    methods: {
      init: function () {
        let _this = this
        this.$axios.get('/init').then(e => {
          //console.log(e)
          _this.configs = e.data.content

        })
      },

      handleSelect: function (e) {
        //console.log(e);
        //console.log(this.form);
        e = e.target.value;
        this.imgUrl = null;
        this.form.params = [];
        this.params = this.configs[e].params;
        this.form.name = this.configs[e].name;
        this.form.desc = this.configs[e].desc;
        this.form.target = this.configs[e].target;
        console.log(this.form)
      },
      submit: function (e) {
        e.preventDefault();
        console.log("post:",this.form);
        this.$message.success("成功提交计算任务，请等待片刻查看结果");
        this.$axios.post('/run', this.form).then(e => {
          console.log("get",e);
        });
      },
      getResult: function (e) {
        e.preventDefault()
        console.log("post",this.form);
        let _this = this
        this.$axios.post('/get_result', this.form).then(e => {
          console.log("get",e)
          if(e.data.content.startsWith('data:'))
          {
            _this.imgUrl = e.data.content
          }else{
            _this.$message.info(e.data)
          }
        })
      }
      ,
      next: function () {
        this.imgUrl = null;
        this.form.params = [];
        let i = 0;
        for (; i < this.configs.length; i++) {
          if (this.configs[i].name === this.form.name) {
            break;
          }
        }

        if (i + 1 < this.configs.length) {
          this.form.name = this.configs[i + 1].name;
          this.form.desc = this.configs[i + 1].desc;
          this.params = this.configs[i + 1].params;
        }
      },
      previous: function () {
        let i = 0;
        this.imgUrl = null;
        this.form.params = [];
        for (; i < this.configs.length; i++) {
          if (this.configs[i].name === this.form.name) {
            break;
          }
        }

        if (i - 1 >= 0) {
          this.form.name = this.configs[i - 1].name;
          this.form.desc = this.configs[i - 1].desc;
          this.params = this.configs[i - 1].params;
        }
      },

    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
