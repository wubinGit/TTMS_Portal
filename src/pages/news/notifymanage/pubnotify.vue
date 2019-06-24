<template>
  <el-container>
    <el-container>
      <el-main><div class="top"><p class="title" style="color:#B3C0D1">通知管理</p>
        <div class="path" ><el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">消息中心</el-breadcrumb-item>
          <el-breadcrumb-item>通知管理</el-breadcrumb-item>
          <el-breadcrumb-item>发布通知</el-breadcrumb-item>
        </el-breadcrumb></div>
      </div>
        <div class="body">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="发布标题" :rules="[{ required: true },]">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="发布类型" :rules="[{ required: true },]">
              <el-select @change="resetField" v-model="sysMessage" placeholder="请选择发布类型" style="float: left;width: 100%">
                <el-option label="消息通知" value="0" ></el-option>
                <el-option label="个人消息" value="1" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门" v-show="sysMessage==1" :rules="[{ required: true },]" >
              <el-cascader v-model="selectDepartmentId" :props="props" style="float: left;width: 100%"></el-cascader>
            </el-form-item>
            <el-form-item label="角色" v-show="sysMessage==1 && showRoleField" :rules="[{ required: true },]">
              <el-select v-model="selectedRoleId" placeholder="请选择发布类型" style="float: left;width: 100%">
                <el-option v-for="item in roleoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职员" v-show="sysMessage==1 && showUserField" :rules="[{ required: true },]">
              <el-select v-model="selectedUserId" filterable placeholder="请选择" style="float: left;width: 100%">
                <el-option
                  v-for="item in useroptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布内容" >
              <el-input type="textarea" v-model="form.desc" :rows="5"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="onSubmit(0)">保存</el-button>
              <el-button type="primary" @click="onSubmit(1)">发布</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  let id = 0;
  export default {
    name: 'NotifyManage',
    data() {
      return {
        props: {
          _this:this,
          lazy: true,
          lazyLoad (node, resolve) {
            const { level } = node;
            this._this.$http.get("/news/notifymanage/pubnotify/querydepartmentbypid",{
              params:{
                pid: level == 0?0:node.data.value,
              }
            }).then(resp=>{
              var cnodes = [];
              resp.data.forEach(item=>{
                var cnode = {};
                cnode.label = item.departmentname;
                cnode.value = item.id;
                cnode.leaf = level == 1;
                cnodes.push(cnode);
              })
              resolve(cnodes);
            })
          }
        },
        form: {
          name: '',
          region: '',
          type: [],
          desc: ''
        },
        roleoptions: [],
        selectedRoleId:"",//选中的角色id
        selectDepartmentId:[],  //被选中的部门
        selectedUserId:"",  //被选中的用户
        useroptions:[], // 用户列表
        sysMessage:"0",
        showRoleField:false,
        showUserField:false,
      };

    },
    methods: {
      onSubmit(valid) {
        var b  = this.checkForm();
        if(b)
          return ;
        this.$http.post("/news/notifymanage/pubnotify/pubmsg",this.$qs.stringify(
          {
            messageType:this.sysMessage,
            toid:this.sysMessage == 0 ? "" :this.selectedUserId ,
            valid:valid,
            messageTitle:this.form.name,
            messageContent:this.form.desc
          }
        )).then(resp=>{
          if(valid == 0){
            this.$message.success("保存成功")
          }else{
            this.$message.success("发布成功")
          }
        }).catch(error=>{
          this.$message.error(error.message);
        })
      },
      checkForm(){
        if(this.sysMessage == ""|| (this.sysMessage == 1 && this.selectedUserId =="") ||this.form.name == "" ||this.form.desc==""){
          this.$message.info("请填充完所有数据")
          return true;
        }
        return false;
      },
      handleChange(value) {
        console.log(value);
      },
      resetField(){
        this.showRoleField=false;
        this.showUserField=false;
        this.selectedRoleId="";//选中的角色id
        this.selectDepartmentId=[];  //被选中的部门
        this.selectedUserId="";  //被选中的用户
      }
    },
    watch:{
      selectDepartmentId:{
        deep:true,
        handler(nval,oval){
          if(nval[1] == null)
            return ;
          //前置操作
          this.showRoleField= true;
          this.showUserField= false;
          this.selectedRoleId ="";
          this.selectedUserId="",
            this.roleoptions=[];
          this.$http.get("/news/notifymanage/pubnotify/queryrolesbydid",{
            params:{
              did:nval[1]
            }
          }).then(resp=>{
            this.roleoptions = [];
            resp.data.forEach(item=>{
              var temp = {};
              temp.label = item.name;
              temp.value = item.id;
              this.roleoptions.push(temp);
            })
          })
        }
      },
      selectedRoleId(nval,oval){
        this.useroptions = [];
        this.showUserField= true;
        this.selectedUserId="",
          this.$http.get("/news/notifymanage/pubnotify/getusersbyrid",{
            params:{
              rid:nval
            }
          }).then(resp=>{
            resp.data.forEach(item=>{
              var temp = {};
              temp.label = item.username;
              temp.value = item.id;
              this.useroptions.push(temp);
            })
          }).then(error=>{

          })
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
