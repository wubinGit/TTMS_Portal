<template>
	<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main><div class="top"><p class="title" style="color:#B3C0D1">渠道商资料管理</p>
					<div class="path" ><el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">分销管理</el-breadcrumb-item>
  <el-breadcrumb-item>旅游资源</el-breadcrumb-item>
  <el-breadcrumb-item>渠道商资料管理</el-breadcrumb-item>
  
</el-breadcrumb></div>
					<el-row :gutter="10">
						<el-col :xs="3" :sm="3" :md="3" :lg="3"><div class="grid-content "><el-input v-model="input1" placeholder="渠道编号"></el-input></div></el-col>
						<el-col :xs="3" :sm="3" :md="4" :lg="3"><div class="grid-content "><el-input v-model="input2" placeholder="渠道名称/简称"></el-input></div></el-col>
						<el-col :xs="3" :sm="3" :md="3" :lg="3"><div class="grid-content "><el-select v-model="value" placeholder="状态">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></div></el-col>
						<el-col :xs="3" :sm="3" :md="3" :lg="3"><div class="grid-content "><el-input v-model="input3" placeholder="管理人"></el-input></div></el-col>
						<el-col :xs="2" :sm="2" :md="2" :lg="2"><div class="grid-content "><el-button type="primary">查询</el-button></div></el-col>
						<el-col :xs="2" :sm="2" :md="2" :lg="2"><div class="grid-content "><el-button type="success">新增</el-button></div></el-col>
						<el-col :xs="3" :sm="3" :md="4" :lg="3"><div class="grid-content "><el-button type="primary">渠道管理部门</el-button></div></el-col>
						<el-col :xs="3" :sm="3" :md="3" :lg="3"><div class="grid-content "><el-button type="primary">渠道管理人</el-button></div></el-col>
		
					</el-row></div>
					<div class="body">
						<el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="渠道代码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="渠道名称"
      width="120">
	  <template slot-scope="scope">
		  <span v-if="scope.row.status=== 0">携程线上渠道</span>
                    <span v-else style="color: royalblue">携程线上渠道</span>
	  </template>
    </el-table-column>
    <el-table-column
      prop="Sname"
      label="简称"
      width="70">
    </el-table-column>
	<el-table-column
	  prop="channel"
	  label="所属渠道商"
	  width="150">
	</el-table-column>
	<el-table-column
	  prop="department"
	  label="管理部门"
	  width="150">
	</el-table-column>
	<el-table-column
	  prop="manager"
	  label="管理人"
	  width="90">
	</el-table-column>
	<el-table-column
	  prop="province"
	  label="省市"
	  width="80">
	</el-table-column>
	<el-table-column
	  prop="account"
	  label="账户"
	  width="50">
	</el-table-column>
	<el-table-column
	  prop="commodity"
	  label="商品"
	  width="50">
	</el-table-column>
	<el-table-column
	  prop="validate"
	  label="有效"
	  width="50">
	</el-table-column>
	<el-table-column
	  prop="operation"
	  label="操作">
	  <template slot-scope="scope">
	    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
		<el-button
		  size="mini"
		  type="text" v-if="scope.row.validate == '启用'"
		  >禁用</el-button>
		  <el-button type="text" size="small" v-else>启用</el-button>
	  </template>
	</el-table-column>
  </el-table>
  <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[50, 70, 90, 110]"
      :page-size="50"
      layout="total, sizes, prev, pager, next, jumper"
      :total="110">
    </el-pagination>
  </div>
  </div>
  
  </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
	name: 'ChannelManage',
	data() {
		return {
			options: [{
			  value: '选项1',
			  label: '启用'
			}, {
			  value: '选项2',
			  label: '禁用'
			},  ],
			value: '',
			input1: '',
			input2: '',
			input3: '',
			 
		currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
		tableData: [{
			id:'CHN-携程-1',
			name:'携程线上渠道',
			Sname:'携程',
			channel:'携程旅游公司',
			department:'国内渠道商对接部',
			manager:'吴彬',
			province:'北京',
			account:'2',
			commodity:'1',
			validate:'启用',
        }, {
          id:'CHN-携程-1',
          name:'携程线上渠道',
          Sname:'携程',
          channel:'携程旅游公司',
          department:'国内渠道商对接部',
          manager:'吴彬',
          province:'北京',
          account:'2',
          commodity:'1',
          validate:'启用',
        }, {
          id:'CHN-携程-1',
          name:'携程线上渠道',
          Sname:'携程',
          channel:'携程旅游公司',
          department:'国内渠道商对接部',
          manager:'吴彬',
          province:'北京',
          account:'2',
          commodity:'1',
          validate:'禁用',
        }, {
          id:'CHN-携程-1',
          name:'携程线上渠道',
          Sname:'携程',
          channel:'携程旅游公司',
          department:'国内渠道商对接部',
          manager:'吴彬',
          province:'北京',
          account:'2',
          commodity:'1',
          validate:'启用',
        }, ],
        multipleSelection: []
		};
	},
	methods: {
      handleClick(row) {
        console.log(row);
      },
	  handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
	width: -webkit-fill-available;
	position:fixed; z-index:999999; top:0px;
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
  	background:#E9EEF3;
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
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
	height:700px;
	
	position: fixed;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
	height:700px;
	margin-left: 200px;
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
