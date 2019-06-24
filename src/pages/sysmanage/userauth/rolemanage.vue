<template>
  <el-container>
    <el-container>
      <el-main>
        <div class="top">
          <p class="title" style="color:#B3C0D1">角色信息管理</p>
          <div class="path">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">
                系统管理
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                用户权限
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                角色信息管理
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="grid-content ">
                <el-input v-model="name" placeholder="角色名称"></el-input>
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
                <el-dialog :title="dialogName" :visible.sync="dialogFormVisible">
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="角色名称">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色备注">
                      <el-input v-model="form.comment"></el-input>
                    </el-form-item>
                    <el-form-item label="父部门:">
                      <div class="left">
                        <el-select v-model="selectedParentDepartId" @change="loadChildDepartment(selectedParentDepartId)" placeholder="请选择">
                          <el-option v-for="item in parentDepartOptions" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </el-form-item>
                    <el-form-item label="子部门:">
                      <div class="left">
                        <el-select v-model="selectedChildDepartId"  placeholder="请选择">
                          <el-option v-for="item in childDepartOptions" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </el-form-item>
                    <el-form-item label="权限菜单">
                      <el-tree :data="menuDate" show-checkbox="" ref="tree" node-key="id" :default-expanded-keys="[]" :default-checked-keys="defaultCheckedKeys">
                      </el-tree>
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
          <el-table :data="tableData" @row-click="showRow" style="width: 100%">
            <el-table-column label="选择" width="80" align="center">
              <template slot-scope="scope">
                <el-radio class="radio" v-model="radio" :label="scope.$index">
                  &nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="roleID" label="角色ID" align="center" width="120">
            </el-table-column>
            <el-table-column prop="pdepartmentname" label="一级部门名称" width="160">
            </el-table-column>
            <el-table-column prop="cdepartmentname" label="二级部门名称" width="160">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="270">
            </el-table-column>
            <el-table-column prop="comment" label="备注" width="300">
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
  const roleOptions = ['系统管理员', '产品经理', '团负责人'];
  export default {
    name: 'RoleManage',
    data() {
      return {
        id:'',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        form: {
          name: '',
          comment:'',
        },
        checkedRoles: ['系统管理员', '产品经理'],
        roles: roleOptions,
        formLabelWidth: '120px',
        tableData: [],  //表格数据
        multipleSelection: [],
        radio: '',
        childDepartOptions:[],  //子选项
        parentDepartOptions:[],  //父选项
        selectedParentDepartId:"", //父Id
        selectedChildDepartId:"",  //子Id
        menuDate: [],   //菜单项
        extractIdMenus:[],  //提取权限菜单id所用的临时对象  格式[{ids:[1,2,3],isExtract:false}]
        isEdit:false,         //是否是编辑状态
        dialogName:"新增角色",
        currentPage: 1,  //当前页
        rows:5,    //每页大小
        totalItem : 20,   //总条数
        name:"",
        selectedRow:{},//被选中的行数据
        dialogFormVisible: false,
        defaultCheckedKeys:[] , //默认选中的权限菜单
      };
    },
    created(){
      //加载表单中的数据
      this.loadData();
      //加载菜单树
      this.loadMenuTree();
      //加载一级部门
    },
    methods: {
      showRow(row){
        //赋值给radio
        this.radio = this.tableData.indexOf(row);
        this.selectedRow=row;
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
        this.rows= val;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loadData();
      },
      //获取有效的菜单Id
      getCheckedKeys() {
        var selectedMenusKeys = this.$refs.tree.getCheckedKeys();
        //选出能够确定角色特权的菜单key
        var availableIds = [];
        this.menuDate.forEach(module=>{
          var moduleId = module.id;
          //模块
          if(selectedMenusKeys.includes(moduleId)){
            //如果一级被选中
            availableIds.push(moduleId);
            return ;
          }else{
            //如果一级没有被选中
            module.children.forEach(menu=>{
              var menuId = menu.id;
              if(selectedMenusKeys.includes(menuId)){
                //二级被选中了
                availableIds.push(menuId);
                return;
              }else{
                //二级没有被选中
                menu.children.forEach(item=>{
                  var itemId = item.id;
                  if(selectedMenusKeys.includes(itemId)){
                    //三级选中了
                    availableIds.push(itemId);
                  }
                })
              }
            })
          }
        });
        //赋值给extractIdMenus
        this.extractIdMenus = availableIds;
      },
      loadData(){
        //加载团信息
        this.$http.get("/sysmanage/userauth/rolemanage/page" , {
          params: {
            page: this.currentPage,
            rows: this.rows,
            name:this.name,
          }
        }).then(resp => {
          //成功
          this.totalItem = resp.data.total;
          var tables = [];
          resp.data.items.forEach(roleItem => {
            var table = {};
            table.roleID=roleItem.id;
            table.roleName=roleItem.name;
            table.comment=roleItem.note;
            table.pdepartmentname = roleItem.tempRole.parentdepartmentname;
            table.cdepartmentname = roleItem.tempRole.childdepartmentname;
            table.pdepartmentid = roleItem.tempRole.pdepartmentid;
            table.cdepartmentid = roleItem.tempRole.cdepartmentid;
            tables.push(table);
          });
          this.tableData = tables;
        }).catch(error =>{
          this.$message.error(error.message);
        });
      },
      //加载权限菜单树
      loadMenuTree(){
        this.$http.get("/sysmanage/userauth/rolemanage/tree").then(resp=>{
           var modules = [];
           var tempExtractIdMenus = [];
          resp.data.forEach(module=>{
            //模块
            var mod = {};
            mod.id = module.id;
            mod.label = module.name;
            mod.isExtract = false;
            mod.children=[];
            module.childMenus.forEach(menu=>{
              var men = {};
              men.id = menu.id;
              men.label = menu.name;
              men.isExtract = false;
              men.children = [];
              menu.childMenus.forEach(item=>{
                var ite = {};
                ite.id = item.id;
                ite.label = item.name;
                ite.isExtract = false;
                men.children.push(ite);
              })
              mod.children.push(men);
            })
            modules.push(mod);
          });
          this.menuDate= modules;
        }).catch(error=>{
          this.$message.error(error.message);
        })
      },
      //加载部门信息到opt中
      loadParentByPidInOptions(pid , level){
        this.$http.get("/sysmanage/userauth/rolemanage/getDepartmentBypid",{
          params:{
            pid:pid,
          }
        }).then(resp=>{
          var tempDeparts =[];
          resp.data.forEach(item=>{
            var tempDepart ={};
            tempDepart.value = item.id;
            tempDepart.label = item.departmentname;
            tempDeparts.push(tempDepart);
          })
          if(level == 1){
            this.parentDepartOptions = tempDeparts;
          }else{
            this.childDepartOptions = tempDeparts;
          }
        }).catch(error=>{
        });
      },
      //根据父id加载子分类
      loadChildDepartment(pid){
        this.selectedChildDepartId = "";
        this.loadParentByPidInOptions(pid,2);
      },
      //验证表单数据
      validateForm(){
        if(this.form.name == "" || this.form.comment=="" || this.extractIdMenus == [] || this.selectedChildDepartId ==""){
          this.$message.info("请将表单填充完整")
          return false;
        }
        return true;
      },
      submitForm(){
        var b = this.validateForm();
        if(!b){
          return ;
        }
        //获取选中的有效菜单id
        this.getCheckedKeys();
        if(this.isEdit){
          this.updateRole();
        }else{
          this.createRole();
        }
        //关闭弹窗
        this.dialogFormVisible = false;
      },
      //创建角色
      createRole(){
        this.$http.post("/sysmanage/userauth/rolemanage",this.$qs.stringify(
          {
            name:this.form.name,
            note:this.form.comment,
            menuIds:this.extractIdMenus.join(","),
            departmentId:this.selectedChildDepartId
          }
        )).then(resp=>{
            this.$message.success("创建成功");
            this.loadData();
        }).catch(error=>{
          this.$message.error("创建失败");
        })
      },
      //更新角色
      updateRole(){
        this.$http.put("/sysmanage/userauth/rolemanage/"+this.selectedRow.roleID,this.$qs.stringify(
          {
            name:this.form.name,
            note:this.form.comment,
            menuIds:this.extractIdMenus.join(","),
            departmentId:this.selectedChildDepartId
          }
        )).then(resp=>{
          this.$message.success("更新成功");
          this.loadData();
        }).catch(error=>{
          this.$message.error("更新失败");
        })
      },
      clearDialogFormData(){
        //清空表单中数据
        this.form.comment = "";
        this.form.name = "";
        this.selectedParentDepartId="";
        this.selectedChildDepartId="";
        this.defaultCheckedKeys=[];
      },
      //显示Dialog
      showDialog(isEdit){
        this.isEdit = isEdit;
        //清空原来数据
        this.clearDialogFormData();
        if(isEdit){
          //判断是否选中了
          if(Object.keys(this.selectedRow).length == 0){
            this.$message.error("请选中一行");
            return false;
          }
          //加载当前选中角色的数据
          this.fillDialogForm();
          this.dialogName = "修改角色";
        }else{
          this.dialogName = "新增角色";
        }
        this.dialogFormVisible = true;
        //加载一级部门
        this.loadParentByPidInOptions(0,1);
        //确保树组件初始化完成
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([]);
        });
      },
      fillDialogForm(){
        this.form.comment = this.selectedRow.comment;
        this.form.name = this.selectedRow.roleName;
        this.selectedParentDepartId = this.selectedRow.pdepartmentid;
        this.selectedChildDepartId = this.selectedRow.cdepartmentid;
        //加载默认选中的菜单
        this.$http.get("/sysmanage/userauth/rolemanage/getMenusIdByRoleId/"+this.selectedRow.roleID).then(resp=>{
         this.defaultCheckedKeys = resp.data;
        }).catch(error=>{
          this.$message.error(error.message);
        })
        //加载二级部门
        this.loadParentByPidInOptions(this.selectedRow.pdepartmentid,2);
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
</style>
