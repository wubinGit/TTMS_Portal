<template>
	<el-container>
  <el-container>

    <el-main>
      <div class="top">
         <p class="title" style="color:#B3C0D1">团号管理</p>
          <div class="path" >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
              <el-breadcrumb-item>团号</el-breadcrumb-item>
              <el-breadcrumb-item>团号管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
					<el-row :gutter="20">
						<el-col :span="3"><div class="grid-content "><el-input v-model="groupName" placeholder="团名称"></el-input></div></el-col>
						<el-col :span="3"><div class="grid-content "><el-input v-model="projectName" placeholder="项目名称"></el-input></div></el-col>
						<el-col :span="3"><div class="grid-content "><el-select v-model="valid" placeholder="选择状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
  </el-select></div></el-col>
  <el-col :span="2"><div class="grid-content Search"><el-button type="success" @click="loadData()">查询</el-button></div></el-col>
  <el-col :span="2"><div class="grid-content "><el-button type="success" @click="showDialog(false)">新增</el-button>

<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="团名称" :label-width="formLabelWidth" :rules="[
	  { required: true },]">
      <el-input v-model="form.name" autocomplete="off" placeholder="请输入团名称"></el-input>
    </el-form-item>
    <el-form-item label="所属项目" :label-width="formLabelWidth" :rules="[
	  { required: true },]">
      <div class="choose">
		  <el-select v-model="form.region">
        <el-option v-for="project in projects" :key="project.id" :label="project.projectname" :value="project.id"></el-option>
      </el-select>
      </div>
    </el-form-item>
	<el-form-item label="团号说明" :label-width="formLabelWidth">
    <el-input type="textarea" v-model="form.desc" ></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogSubmit()">确 定</el-button>
  </div>
</el-dialog></div></el-col>
					</el-row>
						
					</div>
					<div class="body">
						<el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
	  prop="name"
      label="团名称"
      width="200">
    </el-table-column>
	<el-table-column
	  prop="project"
	  label="所属项目"
	  width="150">
	</el-table-column>
    <el-table-column
	prop="principal"
      label="负责人"
      width="70">
    </el-table-column>
	<el-table-column
	prop="phone"
	  label="负责人联系方式"
	  width="130">
	</el-table-column>
	<el-table-column
	prop="explain"
	  label="团号说明"
	  width="200">
	</el-table-column>
	<el-table-column
	prop="status"
	  label="状态"
	  width="60">
	  <template slot-scope="scope">
		<span v-show="scope.row.status==1" style="color: green" >启用</span>
		<span v-show="scope.row.status!=1" style="color: red" >禁用</span>
	</template>
	</el-table-column>
    <el-table-column label="操作">
		
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          v-show="scope.row.status==1"
          @click="changeStatus(scope.row)"
          >禁用</el-button>
          <el-button
            size="mini"
            v-show="scope.row.status!=1"  @click="changeStatus(scope.row)">启用</el-button>
          </template>
    </el-table-column>
  </el-table>
  <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItem">
    </el-pagination>
  </div>
  </div>
  
  </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
	name: 'GroupManage',
	data() {
		return {
			dialogFormVisible: false,
        form: {
		    	id:'',
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
       formLabelWidth: '120px',
			 tableData: [],
       options: [{
        value: '1',
        label: '启用'
      }, {
        value: '0',
        label: '禁用'
      },],
       dialogTitle:"",   //弹出框标题
        isEdit:false, //是否是编辑
        projects:[],
        groupName:"",   //弹出框中组名称
        projectName:"", //项目名称
        valid:"",
        currentPage: 1,  //当前页
        rows:5,    //每页大小
        totalItem : 20,   //总条数
		};
	},
  created(){
    this.loadData();
  },
	methods: {
    handleEdit(index, row) {
      //点击修改按钮  传入row
      this.showDialog(true,row)
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      this.rows= val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData();
    },
    loadData(){
      //加载团信息
      this.$http.get("/producemanage/group/groupmanage/page" , {
        params: {
          groupName: this.groupName,
          projectName: this.projectName,
          valid: this.valid,
          page: this.currentPage,
          rows: this.rows
        }
      }).then(resp => {
          //成功
        this.totalItem = resp.data.total;
        var tables = [];
        resp.data.items.forEach(groupItem => {
          var table = {};
          table.id = groupItem.proGroup.id;
          table.name = groupItem.proGroup.groupname;
          table.projectId = groupItem.proGroup.projectid;
          table.project = groupItem.proGroup.projectname;
          table.principal = groupItem.chargerName;
          table.phone = groupItem.chargerPhoneNumber;
          table.explain = groupItem.proGroup.groupnote;
          table.status = groupItem.proGroup.valid;
          table.chargeuserid = groupItem.proGroup.chargeuserid;
          tables.push(table);
        });
        this.tableData = tables;
      }).catch(error =>{
          console.log(error.message);
      });
    },
    //改变团的状态
    changeStatus(table) {
      this.$http.put("/producemanage/group/groupmanage/validorinvalid/" + table.id).then(resp => {
        this.tableData.filter(data =>{
          return data.id == table.id;
        })[0].status = !table.status
      }).catch(error => {
        alert(error.message);
      })
    },
    //提前加载所有的项目
    showDialog(isEdit,row){
      this.isEdit = isEdit;
      this.dialogFormVisible = true;
      this.$http.get("/producemanage/group/groupmanage/getProjectInfo")
        .then(resp=>{
          this.projects = resp.data;
        }).catch(error=>{
        alert(error.message);
      });
      if(isEdit){
        this.showEditDialog(row);
      }else{
        this.showAddDialog();
      }
    },
    //如果是添加
    showAddDialog(){
      this.dialogTitle = "创建团";
    },
    //如果是修改
    showEditDialog(row){
      this.dialogTitle = "修改团";
      console.log(row);
      this.form.name = row.name;
      this.form.desc = row.explain;
      this.form.region = row.projectId;
      this.form.id = row.id;
    },
    dialogSubmit(){
      if(this.isEdit){
        //编辑团
        this.$http.put("/producemanage/group/groupmanage",
          this.$qs.stringify({
            groupId:this.form.id,
            groupName:this.form.name,
            belongProjectId:this.form.region,
            groupNote: this.form.desc
          })
        ).then(resp=>{
          //创建成功  更新团
          this.$message("修改团信息成功！");
          this.dialogFormVisible = false;
          this.loadData();
        }).catch(error=>{
          this.$message.error(error.message);
        })
      }else{
        //新增团
        this.$http.post("/producemanage/group/groupmanage",
          this.$qs.stringify({
            groupName:this.form.name,
            groupNote:this.form.desc,
            belongProjectId:this.form.region
          })
        ).then(resp=>{
          //创建成功  更新团
          this.$message("开团成功！");
          this.dialogFormVisible = false;
          this.loadData();
        }).catch(error=>{
          this.$message.error(error.message);
        })
      }
    }
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
.choose{
		float: left;
	}
.Search{
	float: right;
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

  }
</style>
