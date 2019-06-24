<template>
	<el-container>

  <el-container>

    <el-main><div class="top"><p class="title" style="color:#B3C0D1">通知管理</p>
					<div class="path" ><el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">消息中心</el-breadcrumb-item>
  <el-breadcrumb-item>通知管理</el-breadcrumb-item>
  <el-breadcrumb-item>通知管理</el-breadcrumb-item>
  
</el-breadcrumb></div>
					<el-row :gutter="10">
						<el-col :span="3">
							<div class="grid-content "><el-select v-model="value" placeholder="选择分类">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></div>
						</el-col>
						<el-col :span="4"><div class="grid-content "><el-input v-model="input1" placeholder="标题"></el-input>
</div></el-col>
						<el-col :span="5"><div class="grid-content "><div class="block">
   
<!--    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="起始日期">
    </el-date-picker>-->
  </div></div></el-col>
						<el-col :span="5"><div class="block">
   
 <!--   <el-date-picker
      v-model="value2"
      type="date"
      placeholder="结束日期">
    </el-date-picker>-->
  </div><div class="grid-content "></div></el-col>
						<!--<el-col :span="4"><el-input v-model="input2" placeholder="发布人"></el-input><div class="grid-content "></div></el-col>-->
						<el-col :span="1"><el-button type="primary" @click="queryMsg()">查询</el-button><div class="grid-content "></div></el-col>
					</el-row></div>
					<div class="body"><el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="number"
      label="序号"
      width="50" v-if="show">
    </el-table-column>
    <el-table-column
      prop="name"
      label="分类"
      width="120">
    </el-table-column>
	<el-table-column
	  prop="title"
	  label="标题"
	  width="300">
	</el-table-column>
	<el-table-column
	  prop="sendName"
	  label="发送人"
	  width="100">
	</el-table-column>
	<el-table-column
	  prop="sendDepartment"
	  label="发送部门"
	  width="100">
	</el-table-column>
	<el-table-column
	  prop="date"
	  label="发送时间"
	  width="200">
	</el-table-column>
	<el-table-column
	  prop="public"
	  label="状态"
	  width="50">
	</el-table-column>

    <el-table-column
      prop="operation"
      label="操作" >
	  <template slot-scope="scope">
         <el-button
          size="mini"
          type="text" v-if="scope.row.public == '发布'"
          @click="updateState(scope.row)">撤回</el-button>
          <el-button
            size="mini"
            type="text"  @click="updateState(scope.row)"
            v-else> 发布</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 30]"
      :page-size="rows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalitem">
    </el-pagination>
  </div>
  </div>
  
  </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
	name: 'NotifyManage',
	data() {
		return {
			options: [{
			  value: '0',
			  label: '系统消息'
			}, {
			  value: '1',
			  label: '我的通知'
			},],
      totalitem:10,
			value: '',
			input1: '',
			input2: '',
			pickerOptions: {
			  disabledDate(time) {
			    return time.getTime() > Date.now();
			  },
			  shortcuts: [{
			    text: '今天',
			    onClick(picker) {
			      picker.$emit('pick', new Date());
			    }
			  }, {
			    text: '昨天',
			    onClick(picker) {
			      const date = new Date();
			      date.setTime(date.getTime() - 3600 * 1000 * 24);
			      picker.$emit('pick', date);
			    }
			  }, {
			    text: '一周前',
			    onClick(picker) {
			      const date = new Date();
			      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
			      picker.$emit('pick', date);
			    }
			  }]
			},
			value2: '',
			 tableData: [],
       currentPage4: 1,
      name:"",
      title:"",
      show:false,
      rows:5,
		};
	},
  created(){
	  this.loadData();
  },
	methods: {
    updateState(val){
      console.log(val.number);
      this.$http.get("/news/notifymanage/notifymanage/"+val.number).then(resp=>{
        this.$message.success("操作成功");
        this.loadData();
      }).catch(error=>{
        this.$message.error(error.message);
      });
    },
    queryMsg(){
     this.loadData();
    },
    loadData(){
      this.$http.get("/news/notifymanage/notifymanage/queryAllnew/page",{
          params:{
            page:this.currentPage,
            rows:this.rows,
            sendtype:this.value,
            messagetitle:this.input1,
          }
        }
      ).then(resp=>{
        this.totalitem = resp.data.total;
        this.tableData = [];
        var tables = [];
        resp.data.items.forEach(msg => {
          var table = {};
          table.number = msg.id;
          table.sendName = msg.senderName;
          table.title = msg.messagetitle;
          table.sendDepartment=msg.userDepartment;
          table.name = msg.sendtype==0 ? "系统消息":"系统消息" && msg.sendtype==1 ? "用户通知":"用户通知" && msg.sendtype==2 ? "其它消息":"其它消息";
          table.date=  new Date(msg.sendtime).format("yyyy-MM-dd hh:mm:ss");
          table.public = msg.valid ==1 ?"发布":"撤回";
          tables.push(table);
        });
        this.tableData = tables;
      }).catch(error=>{
        this.$message.error(error.message);
      })
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
	  handleSizeChange(val) {
      this.rows = (val);
      this.loadData();
      },
      handleCurrentChange(val) {
        this.currentPage = (val);
        this.loadData();
      }
    },
};
</script>

<style>
	html,body {
	
	            overflow:hidden;
	
	            margin:0px;
	
	            width:100%;
	
	            height:100%;
	
	        }

  
  .title {
  	text-align: left;
  	font-size: 30px;
  	margin-bottom: 15px;
  	font-family: "Helvetica Neue";
  	font-style: normal;
	
  	
  }
  .path {
  	text-align: left;
  	font-size: 17px;
  	line-height: 25px;
  	height: 25px;
  	text-align: center;
  	width: -webkit-max-content;
  	margin-bottom: 20px;

  }
 .page{
	 position: relative;
     padding-top: 20px;
 } 
  .body{
	  margin-top: 5px;
	  margin-bottom: 100px;
	  padding: 10px 0 30px;
  }

  
  .el-main {

    color: #333;
    text-align: center;
	height:700px;

    margin-top: -60px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
