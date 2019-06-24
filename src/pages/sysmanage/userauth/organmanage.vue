<template>
  <el-container>
    <el-main>
      <div class="top">
        <p class="title" style="color:#B3C0D1">组织结构管理</p>
        <div class="path">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">
              系统管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              用户权限
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              组织机构管理
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content ">
              <el-input v-model="departmentname" placeholder="机构名称"></el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content ">
              <el-select v-model="valid" placeholder="选择状态">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="loadData()">
              查询
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="showDialog(false,0)">
              新增
            </el-button>
            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="机构名称:" :label-width="formLabelWidth" :rules="[
							  { required: true },]">
                  <el-input v-model="form.organName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="机构编码:" :label-width="formLabelWidth" :rules="[
							  { required: true },]">
                  <el-input v-model="form.csbn" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注:" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                  取 消
                </el-button>
                <el-button type="primary" @click="confirm()">
                  确 定
                </el-button>
              </div>
            </el-dialog>
          </el-col>
        </el-row>
      </div>
      <div class="parentbody">
        <el-table :data="tableData"
                  style="width: 100%"
                  row-key="id"
                  border
                  lazy
                  :load="load"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"> style="width: 100%">
          <el-table-column prop="id" label="机构编号" width="140">
          </el-table-column>
          <el-table-column prop="name" label="机构名称" width="140">
          </el-table-column>
          <el-table-column prop="code" label="机构编码" width="140">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template slot-scope="scope">
              <span v-show="scope.row.status==1" style="color: green">启用</span>
              <span v-show="scope.row.status!=1" style="color: red">禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="comment" width="300">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="showDialog(true,scope.row.parentid,scope.row)" v-show="scope.row.status">
                修改
              </el-button>
              <el-button  size="mini"   v-show="scope.row.parentid == 0 && scope.row.status"  @click="showDialog(false,scope.row.id)">
               添加部门
              </el-button>
              <el-button size="mini" type="danger" v-show="scope.row.status==1" @click="changeStatus(scope.row)">
                禁用
              </el-button>
              <el-button size="mini" type="success" v-show="scope.row.status!=1" @click="changeStatus(scope.row)">
                启用
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="totalItem">
          </el-pagination>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
	name: 'OrganManage',
	data() {
		return {
      dialogFormVisible: false,
      form: {
        id:"",
        csbn: '',
        organName:"",
        delivery: false,
        parentId: "",
        desc: ''
      },
      formLabelWidth: '120px',
			 tableData: [],
			input1: '',
			options: [{
          value: '1',
          label: '启用'
        }, {
          value: '0',
          label: '禁用'
        },],
        value: '',
      departmentname:"",
      valid:"",
      currentPage: 1,  //当前页
      rows:5,    //每页大小
      totalItem : 20,
      isEdit:false, //是否是编辑模式
      dialogTitle:"",  //会话框标题
      tree:"",
		};
	},
  created(){
    this.loadData();
  },
	methods: {
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
    //加载部门表单数据
    loadData(){
      this.tableData =[];
      this.$http.get("/sysmanage/userauth/organmanage/page" , {
        params: {
          departmentname: this.departmentname,
          valid: this.valid,
          page: this.currentPage,
          rows: this.rows,
          pid:this.parentDepartmentId
        }
      }).then(resp => {
        //成功
        this.totalItem = resp.data.total;
        var tables = [];
        resp.data.items.forEach(organItem => {
          var table = {};
          table.id= organItem.id,
          table.name=organItem.departmentname,
          table.status=organItem.valid,
          table.code=organItem.departmentcode,
          table.comment=organItem.note;
          table.parentid=organItem.parentid;
          table.hasChildren = organItem.isparent;
          tables.push(table);
        });
        this.tableData = tables;
      }).catch(error =>{
        alert(error.message);
      });
    },
    changeStatus(table) {
        console.log(table.children)
      this.$http.put("/sysmanage/userauth/organmanage/valid/" + table.id).then(resp => {
       // if(table.parentid == 0){
          //父结点
          var curData = this.tableData.filter(data =>{
            return data.id == table.id;
          })[0];
        this.loadData();
          curData.status = !table.status;

          //所有子结点
        //  table.children.forEach(item=>item.status=!table.status);
     //   }else{
          //子结点
      //  }

      }).catch(error => {
      })
    },
    //添加部门
    addDepartment(pid){
		  this.$http.post("/sysmanage/userauth/organmanage/add/dartment",this.$qs.stringify({
       departmentName:this.form.organName,
        departmentCode:this.form.csbn,
        departmentNote:this.form.desc,
        parentId:pid
      })).then(resp=>{
        this.$message.success("部门添加成功");
        this.dialogFormVisible = false;
        this.loadData();
      }).catch(error=>{
        this.$message.error(error.message);
        this.dialogFormVisible = false;
      })
    },
    editDepartment(){
      this.$http.put("/sysmanage/userauth/organmanage/update/dartment",this.$qs.stringify({
        id:this.form.id,
        departmentName:this.form.organName,
        departmentCode:this.form.csbn,
        departmentNote:this.form.desc,
      })).then(resp=>{
        this.$message.success("部门信息更新成功");
        this.dialogFormVisible = false;
        this.loadData();
      }).catch(error=>{
        this.$message.error(error.message);
        this.dialogFormVisible = false;
      })
    },
    // 验证弹出框中表单数据
    validateForm(){
      if(this.form.organName == "" || this.form.csbn == "" || this.form.desc== ""){
        this.$message.info("请将数据填充完整");
        return false;
      }
      return true;
    },
    //加载子部门
    load(tree, treeNode, resolve) {
      var tables = [];
		  //加载子部门
        this.$http.get("/sysmanage/userauth/organmanage/page" , {
          params: {
            departmentname: this.departmentname,
            valid: this.valid,
            page: this.currentPage,
            rows: 50,   //显示所有
            pid:tree.id ,
          }
        }).then(resp => {
          //成功
          resp.data.items.forEach(organItem => {
            var table = {};
            table.id= organItem.id,
            table.name=organItem.departmentname,
            table.status=organItem.valid,
            table.code=organItem.departmentcode,
            table.comment=organItem.note;
            table.parentid=organItem.parentid;
            table.hasChildren = false;
            tables.push(table);
          });
          resolve(tables);
        }).catch(error =>{
         this.$message.error(error.message);
        });
    },
    //显示编辑框
    showDialog(isEdit,parentId,row){
      this.clearForm();
      this.dialogFormVisible = true;
      this.isEdit = isEdit;
      if(this.isEdit){
        if(parentId == 0){
          this.dialogTitle="修改一级部门";
        }else{
          this.dialogTitle="修改二级部门";
        }
        this.fillForm(row);
      }else{
        this.form.parentId=parentId;
        if(parentId == 0){
          this.dialogTitle="新增一级部门";
        }else{
          this.dialogTitle="新增二级部门";
        }
      }
    },
    //清空会话框表单
    clearForm(){
      this.form.id ="";
      this.form.organName ="";
      this.form.csbn ="";
      this.form.desc ="";
      this.form.parentId ="";
    },
    //填充会话框表单
    fillForm(row){
      this.form.id =row.id;
      this.form.organName =row.name;
      this.form.csbn =row.code;
      this.form.desc =row.comment;
      this.form.parentId =row.parentid;
    },
    checkForm(){
        if( this.form.organName ==""||  this.form.csbn==""||
           this.form.desc=="" ){
          this.$message.info("请将表单填充完整");
          return false;
        }
        return true;
    },
    //提交表单
    confirm(){
      //验证表单是否存在空
      if(!this.checkForm())
        return ;
      if(this.isEdit){
        //编辑部门
        this.editDepartment();
      }else{
        //新增部们
        this.addDepartment(this.form.parentId);
      }
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

  }
  .left{
    float: left;
  }
 .page{
	 position: relative;
    padding-top: 20px;
   padding-bottom: 40px;
 }
  .parentbody{
	  margin-top: 5px;
	  margin-bottom: 10px;
	  padding: 10px 0 30px;
    height:600px;
  }

  .el-main {

    color: #333;

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
