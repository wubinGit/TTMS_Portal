<template>
  <el-container>
      <el-main>
        <div class="top">
          <div class="title03">
            <p class="title" style="color:#B3C0D1">信息面板</p>
          </div>
          <div class="title02">
            <span>待办事处<p>7</p></span>
            <el-divider direction="vertical"></el-divider>
            <span>最新通知<p>8</p></span>
            <el-divider direction="vertical"></el-divider>
            <span>最新消息<p>2</p></span>
          </div>
        </div>

        <div class="body" style="width:100%;height:100%">

           <el-row :gutter="24">
             <el-col :span="12"><div class="left-top">
               <el-row :gutter="20">
                 <el-col :span="5"><div class="grid-content"><i class="el-icon-tickets"></i><span><b>您的通知</b></span></div></el-col>
                 <el-col :span="14"><div class="grid-content "><span>&nbsp;</span></div></el-col>
                 <el-col :span="1"><div class="grid-content "><span><el-button type="primary" plain v-show="tableData.length == 6">更多</el-button>
</span></div></el-col>
               </el-row>
               <el-table
               :data="tableData"
               style="width: 100%">
               <el-table-column
                 prop="title"
                 label="通知标题"
                 width="150">
               </el-table-column>
               <el-table-column
                 prop="content"
                 label="通知内容"
                 width="250">
               </el-table-column>
               <el-table-column
                 prop="publishTime"
                 label="时间"
                 width="150">
               </el-table-column>
             </el-table>
             </div></el-col>
             <el-col :span="12"><div class="right-top">
               <el-row :gutter="20">
               <el-col :span="5"><div class="grid-content "><i class="el-icon-tickets"></i><span><b>最新消息</b></span></div></el-col>
               <el-col :span="14"><div class="grid-content "><span>&nbsp;</span></div></el-col>
               <el-col :span="1"><div class="grid-content "><span><el-button type="primary" plain v-show="last.length ==  6">更多</el-button>
</span></div></el-col>
             </el-row>
               <el-table
                 :data="last"
                 style="width: 120%">
                 <el-table-column
                   prop="title"
                   label="标题"
                   width="100">
                 </el-table-column>
                 <el-table-column
                   prop="info"
                   label="消息"
                   width="300">
                 </el-table-column>
                 <el-table-column
                   prop="publishTime"
                   label="发布时间"
                   width="140">
                 </el-table-column>
               </el-table>
             </div></el-col>
           </el-row>
           <el-row :gutter="22">
             <v-container fluid grid-list-md>
               <v-layout row wrap>
                 <v-flex xs10 md6>
                   <v-card>
                     <v-card-text class="px2">
                       <div ref="sale" style="width: 100%;height:350px"></div>
                     </v-card-text>
                   </v-card>
                 </v-flex>

                 <v-flex xs10 md6>
                   <v-card >
                     <v-card-text class="px2">
                       <div ref="pie" style="width: 100%;height:350px"></div>
                     </v-card-text>
                   </v-card>
                 </v-flex>
               </v-layout>
             </v-container>
           </el-row>
        </div>

      </el-main>
  </el-container>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/pie');

  export default {
    name: 'InfoManage',
    data() {
      return {
        tableData: [],  //我的通知
        last: [],         //最新系统消息
      }
    },
    methods: {
      loadYourNotify(){
        this.tableData=[];
        this.$http.get("/messagePanel/ofme").then(resp=>{
          resp.data.forEach(item=>{
            var temp={};
            temp.title = item.messagetitle ;
            temp.content =item.messagecontent;
            temp.publishTime = new Date(item.sendtime).format("yyyy-MM-dd hh:mm:ss");
            this.tableData.push(temp);
          })
        }).catch(error=>{
          this.$message.error(error.message);
        })
      },
      loadSystemMessage(){
        this.last = [];
        this.$http.get("/messagePanel/querynewsbysize").then(resp=>{
          resp.data.forEach(item=>{
            var temp={};
            temp.title = item.messagetitle ;
            temp.info =item.messagecontent.substring(0,10)+(item.messagecontent.length<10?"":"...");
            temp.publishTime = new Date(item.sendtime).format("yyyy-MM-dd hh:mm:ss");
            this.last.push(temp);
          })
        }).catch(error=>{
          this.$message.error(error.message);
        })
      }
    },
    created(){
      //加载面板上的一些消息
      this.loadYourNotify();
      this.loadSystemMessage();
    },
    mounted(){
      this.$nextTick(() => {
        var sale = echarts.init(this.$refs.sale);

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '销售统计'
          },
          tooltip: {},
          legend: {
            data:['销量']
          },
          xAxis: {
            data: ["国内游","国外游","欧美游","日本游","韩国游","港澳台游"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        sale.setOption(option);

        const pie = echarts.init(this.$refs.pie);

        pie.setOption({
          roseType: 'angle',
          title: {
            text: '访问来源'
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              data:[
                {value:235, name:'视频广告'},
                {value:274, name:'联盟广告'},
                {value:310, name:'邮件营销'},
                {value:335, name:'直接访问'},
                {value:400, name:'搜索引擎'}
              ]
            }
          ],
          itemStyle: {
            emphasis: {
              // 阴影的大小
              shadowBlur: 200,
              // 阴影水平方向上的偏移
              shadowOffsetX: 0,
              // 阴影垂直方向上的偏移
              shadowOffsetY: 0,
              // 阴影颜色
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        })
      })
    }
  };




</script>

<style>
  html,body {

    overflow:hidden;

    margin:0px;

    width:100%;

    height:100%;

  }
  .el-main {

    color: #333;
    text-align: center;
    height:700px;
    margin-top: -60px;
  }
  .top{
    justify-content: space-between;
    align-items: center;
    vertical-align: middle;
  }
  .title02{
   display:flex;

  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

.title04{
  display:flex;
  background:#000;

}



</style>
