<template>
  <el-container>
    <el-main>
      <div class="top">
        <p class="title" style="color:#B3C0D1">通知管理</p>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>产品</el-breadcrumb-item>
          <el-breadcrumb-item>产品列表</el-breadcrumb-item>
          <el-breadcrumb-item>添加附件</el-breadcrumb-item></el-breadcrumb>
      </div>
      <div class="body" style="width:100%;height:100%">
        <div class="body-upside" style="width:100%;height:30%">
          <el-row :gutter="24">
            <el-col :span="10">
              <div class="">
                <div class="title01">
                  <b>产品编号：</b>
                  <span>&nbsp;&nbsp;&nbsp;{{curProduct.ProductID}}</span></div>
                <div class="title01">
                  <b>产品负责人:</b>
                  <span>&nbsp;&nbsp;&nbsp;{{curProduct.createusername}}</span></div>
                <div class="title01">
                  <b>价格信息：</b>
                  <span>&nbsp;&nbsp;&nbsp;{{curProduct.price}}</span></div>
              </div>
            </el-col>
            <el-col :span="14">
              <div class=" ">
                <div class="title01">
                  <b>产品名称:</b>
                  <span>&nbsp;&nbsp;&nbsp;{{curProduct.Pname}}</span></div>
                <div class="title01">
                  <b>服务日期：</b>
                  <span>&nbsp;&nbsp;&nbsp;{{new Date(curProduct.start).format("yyyy-MM-dd")}}~{{new Date(curProduct.end).format("yyyy-MM-dd")}}</span></div>
                <div class="title01">
                  <b>状态：</b>
                  <span v-if="curProduct.status == 0">&nbsp;&nbsp;&nbsp;待售</span>
                  <span v-if="curProduct.status == 1">&nbsp;&nbsp;&nbsp;上架</span>
                  <span v-if="curProduct.status == 2">&nbsp;&nbsp;&nbsp;下架</span></div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="body-bottom" style="width:100%;height:70%;">
          <div class="menu" style="padding: 0px 0px 10px 10px ;text-align:left;">
            <el-button type="primary" @click="dialogFormVisible = true">添加附件</el-button>
            <el-dialog title="上传附件" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="标题" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="文件" :label-width="formLabelWidth">
                  <el-upload class="upload-demo" action="http://192.168.43.139:8080/upload" :on-success="handlesuccess" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传不超过500kb的文件</div></el-upload>
                </el-form-item>
              </el-form>
              <div style="padding-left:120px">
                <el-button type="primary" @click="uplaod">上传</el-button></div>
            </el-dialog>
          </div>
          <div class="kk">
            <el-table :data="tableData" border style="width:100%">
              <el-table-column prop="id" v-if="show" label="id" width="150" disabled="true"></el-table-column>
              <el-table-column prop="Title" label="标题" width="150"></el-table-column>
              <el-table-column prop="FileName" label="文件名" width="200"></el-table-column>
              <el-table-column prop="UploadData" label="上传时间" width="150"></el-table-column>
              <el-table-column prop="UploadUser" label="上传用户" width="150"></el-table-column>
              <el-table-column label="操作" align="center" min-width="100">
                <template slot-scope="scope">　　　　　　
                  <el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'ClassifyInformation',
    data() {
      return {
        tableData: [],
        show:false,

        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        curProduct: {},   //当前产品
        fileList: [],
        uploadfileresp:"",  //文件返回下载地址
        fileName:""
      }
    },
    methods:{
      uplaod(){
        console.log("开始上传");
        console.log(this.form.name);
        console.log(this.uploadfileresp);
        this.$http.post("/resourcemanage/attachment/attachmanage/add",this.$qs.stringify({
            fileName:this.fileName,
            productId:this.curProduct.id,
            fileUrl:this.uploadfileresp,
        })).then(
          this.$message.success("文件上传成功"),
          this.dialogFormVisible=false,
          this.loadAttachments(),
        ).catch(error=>{
          this.$message.error(error.message);
        })

      },

    deleteUser(val){
      console.log(val)
      console.log(val.id);
      this.$http.delete("/producemanage/product/productlist/del/Attachment/"+val.id)
        .then(resp=>{
          this.$message.success("操作成功")
          this.loadAttachments();
        }).catch(error=>{
        this.$message.error(error.message);
      });
    },
    handleRemove(file, fileList){
      console.log(file, fileList);
    },
    handlePreview(file){

    },
    //上传成功之后的结果
    handlesuccess(response, file, fileList){
      this.uploadfileresp=response;
      this.fileName = file.name
    },
    handleExceed(files, fileList){
      this.$message.warning('当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件');
    },
    beforeRemove(file, fileList){
      return this.$confirm('确定移除 ${ file.name }？');
    },
    loadCurrentProject(){
      var localProduct = localStorage.getItem("curProduct");
      if(localProduct == null ||  localProduct == '')
        this.router.history.go(-1);
      this.curProduct = JSON.parse(localProduct);
    },
    loadAttachments(){
      this.$http.get("/producemanage/product/productlist/allAttachment/"+this.curProduct.id).then(resp=>{
        // {
        //   Title: "附件1",
        //     FileName: "sql.txt",
        //   UploadData: "2019-6-31",
        //   UploadUser: "王毅",
        // }
        //{id: 2, filename: "文件2", productId: 2, attachmenttitle: "附件2", invalid: 1}
        this.tableData = [];
        resp.data.forEach(item=>{
          var i = {};
          i.id=item.id;
          i.Title = item.attachmenttitle;
          i.FileName = item.filename;
          i.UploadData = new Date(item.uploadtime).format("yyyy-MM-dd hh:mm:ss");
          i.valid = item.invalid;
          i.UploadUser = item.username;
          this.tableData.push(i);
        })
      }).catch(error=>{

      })
    }
  },
    created(){
      //加载当前产品
      this.loadCurrentProject();
      //加载所有附件
      this.loadAttachments();
    }
 }
</script>
<style>
  html,body {
    overflow:scroll;
    margin:0px;
    width:100%;
    height:100%;
  }

  .path {
    text-align: left;
    font-size: 17px;
    line-height: 25px;
    text-align: center;
    width: -webkit-max-content;
    margin-bottom: 10px ;
    padding:10px 10px 20px 10px;
  }
  .page{
    position: relative;
    padding-top: 20px;
  }
  .title {
    text-align: left;
    padding: 10px 10px 10px 10px;
    font-size: 20px;
    margin-bottom: 20px;
    font-family: normal;
    font-style: normal;
  }
  .body{
    margin-top: 5px;
    margin-bottom: 20px;
    padding: 10px 0 30px;
  }

  .title01{
    text-align: left;
    padding:10px 50px 20px 100px;
    font-family: normal;
    font-style: normal;
    font-size:12px;

  }

  .kk{
    border:1px solid #dfe4ed;
  }

  .el-main {
    color: #333;
    text-align: center;
    margin-left: 0px;
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

