<template>
  <el-container>
    <el-container>
      <el-main>
        <div class="top">
          <p class="title" style="color:#B3C0D1">项目信息管理</p>
          <div class="path">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
              <el-breadcrumb-item>项目</el-breadcrumb-item>
              <el-breadcrumb-item>项目信息管理</el-breadcrumb-item></el-breadcrumb>
          </div>
          <el-row :gutter="5">
            <el-col :span="4">
              <div class="grid-content ">
                <el-input v-model="projectNumber" placeholder="项目编号"></el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content ">
                <el-input v-model="projectName" placeholder="项目名称"></el-input>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content ">
                <el-select v-model="departId" filterable placeholder="选择归属部门">
                  <el-option v-for="item in departOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="5">
              <el-date-picker v-model="startTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="起始日期"></el-date-picker>
            </el-col>
            <el-col :span="6">
              <div class="grid-content ">
                <el-date-picker v-model="endTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="终止日期"></el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3">
              <div class="grid-content ">
                <el-select v-model="valid" placeholder="选择状态">
                  <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple ">
                <el-button type="primary" @click="loadData()">查询</el-button></div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="showDialog(false)">新增</el-button>
                <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
                  <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="项目编号:" :rules="[
                    { required: true },]">
                      <el-input v-model="form.number" placeholder="TP性质-日期-国家地区-城市-序号"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称:" :rules="[
                    { required: true },]">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="日期:">
                      <el-col :span="11">
                        <el-date-picker type="datetime"  placeholder="起始日期" v-model="form.startTime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-date-picker type="datetime"  placeholder="结束日期" v-model="form.endTime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="归属部门:">
                      <div class="choose">
                        <el-select v-model="form.region" placeholder="选择归属部门">
                          <el-option v-for="item in departOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </div>
                    </el-form-item>
                    <el-form-item label="备注:">
                      <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm()">确 定</el-button></div>
                </el-dialog>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="body">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="number" label="项目编号" width="200"></el-table-column>
            <el-table-column prop="name" label="项目名称" width="130"></el-table-column>
            <el-table-column prop="department" label="归属部门" width="80"></el-table-column>
            <el-table-column prop="start" label="开始日期" width="90"></el-table-column>
            <el-table-column prop="end" label="结束日期" width="90"></el-table-column>

            <el-table-column label="备注" prop="comment" width="200"></el-table-column>
            <el-table-column prop="status" label="状态" width="50">
              <template slot-scope="scope">
                <span v-show="scope.row.status == 1" style="color: green">启用</span>
                <span v-show="scope.row.status == 0" style="color: red">禁用</span></template>
            </el-table-column>
            <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button size="mini" v-show="scope.row.status == 1" @click="validOrInValid(scope.row)">禁用</el-button>
                <el-button size="mini" v-show="scope.row.status == 0" @click="validOrInValid(scope.row)">启用</el-button></template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="totalItem"></el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
	name: 'ProjectInfoManage',
	data() {
		return {
			dialogFormVisible: false,
        form: {
			    id:"",
		     	number:'',
          name: '',
          region: '',
          startTime: '',
          endTime: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
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
			 tableData: [],
      projectNumber: '',   //用于查找的项目编号
      projectName: '',    //用户查找的项目名
			departOptions: [],
      departId: '', //用户查找的部门id
      startTime:"",  //开始时间
      endTime:"",   //结束时间
			options: [{
          value: '1',
          label: '启用'
        }, {
          value: '0',
          label: '禁用'
        },],
       valid: '',   //用于查找的是否有效属性
       currentPage:1, //当前页
       rows:5,  //页面大小
       totalItem:0, //总条数,
       isEdit:false,
       dialogTitle:"",

		};
	},
  created(){
      //加载所有产品部下面的子部门
       this.loadSubDepOfProduct();
      //加载表单数据
       this.loadData();
  },
	methods: {
		  handleEdit(index, row) {
       this.showDialog(true,row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleClick(row) {
        console.log(row);
      },
	    handleSizeChange(val) {
		    this.rows = val;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loadData();
      },
      showDialog(isEdit,row){
        this.isEdit = isEdit;
        this.dialogFormVisible = true;
        if(isEdit){
          this.showEditDialog(row);
        }else{
          this.showAddDialog();
        }
      },
    //显示编辑框
      showEditDialog(row){
        this.dialogTitle ="修改项目信息";
        this.form.id = row.id;
        this.form.number = row.number;
        this.form.name = row.name;
        this.form.desc = row.comment;
        this.form.startTime = row.start;
        this.form.endTime = row.end;
        this.form.region = row.departmentId;
      },
    //显示新增框
      showAddDialog(){
         this.dialogTitle ="添加项目信息";
      },
      loadSubDepOfProduct(){
        this.$http.get("/producemanage/project/projectinfomanage/subDepOfProduction")
         .then(resp=>{
           var deps = [];
            resp.data.forEach(department =>{
                  var dep = {};
                  dep.label = department.departmentname;
                  dep.value = department.id;
                  deps.push(dep);
            })
           this.departOptions = deps;
        }).catch(error=>{
          this.$message.error(error.message);
        })
      },
    //加载表格数据
      loadData(){
		     var  projects =[];
		     //加载当前的表单
		      this.$http.get("/producemanage/project/projectinfomanage/page",{
		        params:{
              projectNumber:this.projectNumber,
              projectName:this.projectName ,
              departmentid:this.departId,
              startTime:this.startTime,
              endTime:this.endTime,
              valid:this.valid,
              page:this.currentPage ,
              rows:this.rows
            }
          }).then(resp=>{
            this.totalItem = resp.data.total;
            resp.data.items.forEach(item=>{
              var project = {};
              project.id = item.id;
              project.number = item.projectnumber;
              project.name = item.projectname;
              project.departmentId = item.departmentid;
              project.department = item.departmentName;
              project.start = new Date(item.starttime).format("yyyy-MM-dd hh:mm:ss");
              project.end = new Date(item.endtime).format("yyyy-MM-dd hh:mm:ss");
              project.status = item.valid;
              project.comment = item.note;
              projects.push(project);
            });
            this.tableData = projects;
          }).catch(error=>{

          })
      },
        //提交Dialog表单
      submitForm(){
		       //验证表单的数据是否为空
          if(this.isEdit){
            //更新
            this.$http.put("/producemanage/project/projectinfomanage/"+this.form.id,
              this.$qs.stringify({
                projectnumber:this.form.number,
                projectname: this.form.name,
                starttime:this.form.startTime ,
                endtime:this.form.endTime ,
                departmentId:this.form.region,
                note:this.form.desc
          }) ).then(resp=>{
              this.$message("更新项目成功");
              this.loadData();
            }).catch(error=>{
              this.$message.error(error.message);
            });
          }else{
            //新增
            this.$http.post("/producemanage/project/projectinfomanage",
              this.$qs.stringify({
                projectnumber:this.form.number,
                projectname: this.form.name,
                starttime:this.form.startTime ,
                endtime:this.form.endTime ,
                departmentId:this.form.region,
                note:this.form.desc
            })).then(resp=>{
              this.$message("新增项目成功");
              this.loadData();
            }).catch(error=>{
              this.$message.error(error.message);
            });
          }
          //更新表格  关闭弹窗
          this.dialogFormVisible = false;

      },
    validOrInValid(row){
        this.$http.get("/producemanage/project/projectinfomanage/validorinvalid/"+row.id).then(resp=>{
          row.status = ! row.status;
        }).catch(error=>{
          this.$message.error(error.message);
        })

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
.choose{
		float: left;
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

  
  .el-main {
    background-color: #E9EEF3;
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
</style>
