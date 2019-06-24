<template>
  <el-container>
    <el-container>
      <el-main>
        <div class="top">
          <p class="title" style="color:#B3C0D1">用户信息管理</p>
          <div class="path">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">
                系统管理
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                用户权限
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                用户信息管理
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-content ">
                <el-input v-model="name" placeholder="用户名"></el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="loadData()">
                查询
              </el-button>
              <div class="grid-content "></div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content ">
                <el-button type="primary" @click="showDialog(false)">
                  新增
                </el-button>
                <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="照片">
                      <el-upload class="avatar-uploader" action="http://192.168.43.139:8080/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else="" class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="用户名:" :rules="[
							            { required: true },]">
                      <el-input v-model="form.usename" placeholder="登录账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" :rules="[
							           { required: true },]">
                      <el-input v-model="form.password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:">
                      <el-input v-model="form.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:" :rules="[
											  { required: true },]">
                      <el-input v-model="form.phoneNum" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="父部门:">
                      <div class="left">
                        <el-select v-model="selectedParentDepartId" @change="loadChildDepartByPid(selectedParentDepartId)" placeholder="请选择">
                          <el-option v-for="item in parentDepartOptions" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </el-form-item>
                    <el-form-item label="子部门:">
                      <div class="left">
                        <el-select v-model="selectedChildDepartId" @change="loadRolesBySubDepartId(selectedChildDepartId)" placeholder="请选择">
                          <el-option v-for="item in childDepartOptions" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </el-form-item>
                    <el-form-item label="角色:">
                      <div class="roles">
                        <el-radio v-model="selectedRole" v-for=" role in roles" :key="role.value" :label="role.value">
                          {{role.label}}
                        </el-radio>
                      </div>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">
                      取 消
                    </el-button>
                    <el-button type="primary" @click="submitForm()">
                      确 定
                    </el-button>
                  </div>
                </el-dialog>
              </div>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="showDialog(true)">
                修改
              </el-button>
              <div class="grid-content "></div>
            </el-col>
          </el-row>
        </div>
        <div class="body">
          <el-table :data="tableData" @row-click="showRow" border="" style="width: 100%">
            <el-table-column label="选择" width="60" align="center">
              <template slot-scope="scope">
                <el-radio class="radio" v-model="selectedRow" :label="scope.$index">
                  &nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="image" label="照片" width="120">
                <template slot-scope="scope">
                  <img :src="scope.row.image" width="100px" height="50px" style="line-height: 50px "></img>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="150">
            </el-table-column>
            <el-table-column prop="phoneNum" label="手机号" width="140">
            </el-table-column>
            <el-table-column prop="departmentnames" label="部门" width="150">
            </el-table-column>
            <el-table-column prop="rolename" label="角色" width="120">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="165">
              <template slot-scope="scope">
                <span v-show="scope.row.status==1" style="color: green">启用</span>
                <span v-show="scope.row.status!=1" style="color: red">禁用</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" v-show="scope.row.status == 1" @click="changeStatus(scope.row)">
                  禁用
                </el-button>
                <el-button size="mini" type="success" v-show="scope.row.status != 1" @click="changeStatus(scope.row)">
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
  </el-container>
</template>

<script>
  export default {
    name: 'UserManage',
    data() {
      return {
        roles: [],
        dialogFormVisible: false,
        form: {
          id:"",
          usename: '',
          password: '',
          email: '',
          phoneNum: '',
          region: '',
          delivery: false,
          type: [],
          resource: ''
        },
        formLabelWidth: '120px',
        tableData: [],
        multipleSelection: [],
        selectedRow: '',   //ratio中选择的
        selected: {},
        currentPage: 1,
        row: 5,
        totalItem:20,
        name:"",
        page:"",
        rows:"",
        imageUrl:"",//图片地址
        isEdit:false,  //是否是编辑
        selectedChildDepartId:"",  //被选中父部门id
        selectedParentDepartId:"",   //被选中子部门id
        parentDepartOptions:[],  //父部门
        childDepartOptions:[],     //子部门
        selectedRole:"",  // 选中的角色
      };
    },
    created(){
      this.loadData();
    },


    methods: {
      showRow(row) {
        //赋值给radio
        this.radio = this.tableData.indexOf(row);
        this.selected = row;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleClick(row) {
        console.log(row);
      },
      handleSizeChange(val) {
        this.rows = (val);
        this.loadData();
      },
      handleCurrentChange(val) {
        this.currentPage = (val);
        this.loadData();

      },
      loadData(){
        //加载用户信息
        this.$http.get("/sysmanage/userauth/usermanage/page" , {
          params: {
            name:this.name,
            page: this.currentPage,
            rows: this.rows,
          }
        }).then(resp => {
          //成功
          console.log(resp);
          this.totalItem = resp.data.total;
          var tables = [];
          resp.data.items.forEach(userItem => {
            var table = {};
            table.id = userItem.id;
            table.username = userItem.username;
            table.email = userItem.email;
            table.phoneNum = userItem.mobile;
            table.status= userItem.valid;
            table.image = userItem.image
            table.childDepartmentId = userItem.tempRole.cdepartmentid;
            table.parentDepartmentId = userItem.tempRole.pdepartmentid;
            table.childdepartmentname = userItem.tempRole.childdepartmentname;
            table.parentdepartmentname = userItem.tempRole.parentdepartmentname;
            table.departmentnames = table.parentdepartmentname+"-"+ table.childdepartmentname;
            table.rolename = userItem.tempRole.name;
            table.roleid = userItem.tempRole.id;
            tables.push(table);
          });
          this.tableData = tables;
        }).catch(error =>{
          alert(error.message);
        });
      },
      changeStatus(table) {
        this.$http.put("/sysmanage/userauth/usermanage/valid/" + table.id).then(resp => {
          this.tableData.filter(data =>{
            return data.id == table.id;
          })[0].status = !table.status
        }).catch(error => {
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isJPG && isLt2M;
      },
      //显示创建用户的dialog
      showDialog(edit){
        //清理所有表单数据
        this.clearFormData();
        if(edit){
          //将选中的数据填充表格
          if(Object.keys(this.selected).length==0){
            this.$message.error("请选中一行数据");
            return;
          }
          this.fillDialogForm();
          //加载父部门
          this.loadDepartment(0,1);
          //加载子部门
          this.loadChildDepartByPid(this.selectedParentDepartId);
          //加载角色
          this.loadRolesBySubDepartId(this.selectedChildDepartId);
        }else{
          //加载父部门和子部门
          this.loadDepartment(0,1);
        }
        this.dialogFormVisible = true;
        this.isEdit = edit;

      },
      //加载父部门和子部门
      loadDepartment(pid,level){
        this.$http.get("/sysmanage/userauth/usermanage/getDepartmentBypid",{
          params:{
            pid:pid,
          }
        }).then(resp=>{
          var tempDeparts=[];
          resp.data.forEach(depart=>{
            var tempDepart = {};
            tempDepart.label = depart.departmentname;
            tempDepart.value = depart.id;
            tempDeparts.push(tempDepart);
          });
          if(level == 1){
            this.parentDepartOptions = tempDeparts;
          }else{
            this.childDepartOptions = tempDeparts;
          }
        }).catch(error=>{
          this.$message.error(error.message);
        })
      },
      //更具pid记载子部门
      loadChildDepartByPid(pid){
        //加载二级
        this.loadDepartment(pid,2);
      },
      //通过部门id加载角色
      loadRolesBySubDepartId(pid){
        this.$http.get("/sysmanage/userauth/usermanage/getRolesByDepartmentId",{
          params:{
            departmentId:pid,
          }
        }).then(resp=>{
          this.roles = [];
          resp.data.forEach(item=>{
            var tempRole = {};
            tempRole.label = item.name;
            tempRole.value = item.id;
            this.roles.push(tempRole);
          });
        }).catch(error=>{
          this.$message.error(error.message);
        });
      },
      //提交按钮
      submitForm(){
        // 判断表单数据
        if(!this.form.usename || !this.imageUrl ||!this.form.password||!this.form.email||!this.form.phoneNum||!this.selectedRole){
          this.$message.info("表单数据不能为空");
          return;
        }
        if(!this.isEdit){
          //新增
          this.$http.post("/sysmanage/userauth/usermanage",this.$qs.stringify({
            username:this.form.usename,
            image:this.imageUrl,
            password:this.form.password,
            mail:this.form.email,
            phonenumber:this.form.phoneNum,
            roleId:this.selectedRole
          })).then(resp=>{
            this.$message.error("新增加成功");
            this.loadData();
            this.dialogFormVisible = false;
          }).catch(error=>{
            this.$message.error(error.message);
          })
        }else{
          //修改
          this.$http.put("/sysmanage/userauth/usermanage/"+this.form.id,this.$qs.stringify({
              username:this.form.usename,
              image:this.imageUrl,
              password:this.form.password,
              mail:this.form.email,
              phonenumber:this.form.phoneNum,
              roleId:this.selectedRole
          })).then(resp=>{
            this.$message.success("修改员工信息成功");
            this.loadData();
            this.dialogFormVisible = false;
          }).catch(error=>{
            this.$message.error(error.message);
          })
        }
      },
      clearFormData(){
        this.form.usename = "";
        this.imageUrl = "";
        this.form.password = "";
        this.form.email = "";
        this.form.phoneNum = "";
        this.selectedRole = "";
        this.selectedChildDepartId="";
        this.selectedParentDepartId="";
        this.roles = [];
        this.childDepartOptions=[]
      },
      fillDialogForm(){
        var data = this.tableData[this.selectedRow];
        this.form.id = data.id;
        this.form.usename = data.username;
        this.imageUrl = data.image;
        this.form.email = data.email;
        this.form.phoneNum = data.phoneNum;
        this.selectedRole = data.id;
        this.selectedChildDepartId = data.childDepartmentId;
        this.selectedParentDepartId = data.parentDepartmentId;
        this.selectedRole = data.roleid;
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

  .roles{
    float: left;
  }






  .left{
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
  /*照片上传*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
