<template>
	<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main><div class="top"><p class="title" style="color:#B3C0D1">城市</p>
					<div class="path" ><el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">资源管理</el-breadcrumb-item>
  <el-breadcrumb-item>旅游资源</el-breadcrumb-item>
  <el-breadcrumb-item>城市</el-breadcrumb-item>
  
</el-breadcrumb></div>
					<el-row :gutter="10">
						<el-col :span="4">
							<div class="grid-content "><el-input v-model="input1" placeholder="国家名称"></el-input></div>
						</el-col>
						<el-col :span="4"><div class="grid-content "><el-input v-model="input2" placeholder="城市编码"></el-input>
</div></el-col>
						<el-col :span="4"><div class="grid-content "><el-input v-model="input3" placeholder="城市名称"></el-input></div></el-col>
						<el-col :span="2"><div class="grid-content "><el-button type="primary">查询</el-button></div></el-col>
						<el-col :span="2"><div class="grid-content "><el-button type="success">新增</el-button></div></el-col>
		
					</el-row></div>
					<div class="body"><el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="number"
      label="城市编码"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="国家名称"
      width="150">
    </el-table-column>
	<el-table-column
	  prop="Cname"
	  label="中文名称"
	  width="150">
	</el-table-column>
	<el-table-column
	  prop="Ename"
	  label="英文名称"
	  width="150">
	</el-table-column>
	<el-table-column
	  prop="pinyin"
	  label="拼音"
	  width="200">
	</el-table-column>
	<el-table-column
	  prop="capital"
	  label="是否首都"
	  width="100">
	</el-table-column>
	<el-table-column
	  prop="available"
	  label="是否可用"
	  width="100">
	</el-table-column>
    <el-table-column
      prop="operation"
      label="操作">
	  <template slot-scope="scope">
        <el-button
          size="mini"
          type="text" v-if="scope.row.available == '启用'"
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
	name: 'City',
	data() {
		return {
			input1: '',
			input2: '',
			input3: '',
			 tableData: [{
          number: 'CITY00002',
		  name:'阿尔巴尼亚',
		  Cname:'达拉纳',
		  Ename:'Tirana',
		  pinyin:'DALA NA',
		  capital:'是',
		  available:'启用',
		  
        }, {
           number: 'CITY00002',
          name:'阿尔巴尼亚',
          Cname:'达拉纳',
          Ename:'Tirana',
          pinyin:'DALA NA',
          capital:'是',
          available:'禁用',
        }, {
           number: 'CITY00002',
          name:'阿尔巴尼亚',
          Cname:'达拉纳',
          Ename:'Tirana',
          pinyin:'DALA NA',
          capital:'是',
          available:'禁用',
        }, {
           number: 'CITY00002',
          name:'阿尔巴尼亚',
          Cname:'达拉纳',
          Ename:'Tirana',
          pinyin:'DALA NA',
          capital:'是',
          available:'禁用',
        },
		{
		   number: 'CITY00002',
		  name:'阿尔巴尼亚',
		  Cname:'达拉纳',
		  Ename:'Tirana',
		  pinyin:'DALA NA',
		  capital:'是',
		  available:'启用',
		},
		{
		  number: 'CITY00002',
		 name:'阿尔巴尼亚',
		 Cname:'达拉纳',
		 Ename:'Tirana',
		 pinyin:'DALA NA',
		 capital:'是',
		 available:'启用',
		},
		{
		   number: 'CITY00002',
		  name:'阿尔巴尼亚',
		  Cname:'达拉纳',
		  Ename:'Tirana',
		  pinyin:'DALA NA',
		  capital:'是',
		  available:'启用',
		},
		{
		   number: 'CITY00002',
		  name:'阿尔巴尼亚',
		  Cname:'达拉纳',
		  Ename:'Tirana',
		  pinyin:'DALA NA',
		  capital:'是',
		  available:'启用',
		},
		{
		   number: 'CITY00002',
		  name:'阿尔巴尼亚',
		  Cname:'达拉纳',
		  Ename:'Tirana',
		  pinyin:'DALA NA',
		  capital:'是',
		  available:'启用',
		},
		{
		   number: 'CITY00002',
		  name:'阿尔巴尼亚',
		  Cname:'达拉纳',
		  Ename:'Tirana',
		  pinyin:'DALA NA',
		  capital:'是',
		  available:'启用',
		}],
		currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
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
