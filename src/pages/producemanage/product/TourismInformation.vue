<template>
  <el-container>
    <el-container>
      <el-main>
        <div class="top"><p class="title" style="color:#B3C0D1">库存分销</p>
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
            <el-breadcrumb-item>产品</el-breadcrumb-item>
            <el-breadcrumb-item>产品分类</el-breadcrumb-item>
            <el-breadcrumb-item>导游信息</el-breadcrumb-item>
          </el-breadcrumb>
          </div>

        <div class="body" style="width:100%;height:100%">
          <div class="body-upside" style="width:100%;height:30%">
            <el-row :gutter="24">
              <el-col :span="10">
                <div class="grid-content"><div class="title01"><b>产品编号：</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.ProductID}}</span></div>
                  <div class="title01"><b>产品负责人:</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.createusername}}</span></div>
                  <div class="title01"><b>价格信息：</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.price}}</span></div>
                </div>
              </el-col>
              <el-col :span="14">
                <div class="grid-content "><div class="title01"><b>产品名称:</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.Pname}}</span></div>
                  <div class="title01"><b>服务日期：</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.start}}~{{curProduct.end}}</span></div>
                  <div class="title01"><b>状态：</b><span>{{curProduct.status}}</span></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="body-bottom" style="width:100%;height:70%;">
            <div class="menu" style="padding: 0px 0px 10px 10px ;text-align:left;">
              <el-button type="primary" @click="showAddGuideDialog()">添加导游</el-button>
              <el-dialog title="添加导游" :visible.sync="dialogTableVisible" style="width: 120%">
                <div class="title02">
                  <div class="title03"><el-input v-model="guideName" placeholder="导游姓名"></el-input></div>
                  <div class="title03"><el-input v-model="mobile" placeholder="联系方式"></el-input></div>
                  <div class="title03"><el-input v-model="language" placeholder="熟悉语言"></el-input></div>
                  <div class="title03"><el-input v-model="nationality" placeholder="国籍"></el-input></div>
                  <div class="title03"><el-button type="primary" @click="loadGuidesInDialog()">查询</el-button></div>
                </div>
                <el-table :data="gridData"  @selection-change="handleSelectionChange" border>
                  <el-table-column type="selection" width="30"></el-table-column>
                  <el-table-column property="TourismNumber" label="导游编号" width="80"></el-table-column>
                  <el-table-column property="Name" label="姓名" width="60"></el-table-column>
                  <el-table-column property="EnglishName" label="英文名" width="65"></el-table-column>
                  <el-table-column property="Sex" label="性别" width="50"></el-table-column>
                  <el-table-column property="Email" label="邮箱" width="122"></el-table-column>
                  <el-table-column property="Language" label="语言" width="100"></el-table-column>
                  <el-table-column property="Nationality" label="国籍" width="50"></el-table-column>
                  <el-table-column property="Contact" label="联系方式" width="110"></el-table-column>
                  <el-table-column property="Remarks" label="备注" width="110"></el-table-column>
                </el-table>
                <div class="hh" style="padding-top: 30px;">
                  <div class="block">
                    <el-pagination
                      :current-page.sync="currentPage"
                      :page-size="rows"
                      layout="prev, pager, next, jumper"
                      :total="totalItems">
                    </el-pagination>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogTableVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addProductGuide">确 定</el-button>
                </div>
              </el-dialog>
            </div>

              <div class="kk"><el-table :data="tableData" border style="width:100%">
              <el-table-column prop="TourismNumber" label="导游编号" width="80">
              </el-table-column>
              <el-table-column prop="Name" label="姓名" width="80">
              </el-table-column>
              <el-table-column prop="EnglishName" label="英文名" width="80">
              </el-table-column>
              <el-table-column prop="Sex" label="性别" width="50">
              </el-table-column>
              <el-table-column prop="Email" label="邮箱" width="120">
              </el-table-column>
              <el-table-column prop="Language" label="语言" width="100">
              </el-table-column>
              <el-table-column prop="Nationality" label="国籍" width="50">
              </el-table-column>
              <el-table-column prop="Contact" label="联系方式" width="150">
              </el-table-column>
              <el-table-column prop="Remarks" label="备注" width="120">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="70">
                　　　　<template slot-scope="scope">
                　　　　　<el-button type="info" @click="deleteGuide(scope.row)">删除</el-button>
                　　　　</template>
                　　</el-table-column>
            </el-table>
            </div>
          </div>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'TourismInformation',
    data() {
      return {
        value1: '',
        value2: '',



        gridData: [],  //弹出框中表格数据
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
        tableData: [], //导游数据
        totalItems:0 , //总数据
        rows:5 , //一页数据的大小
        currentPage:1, //当前页
        //查询条件
        guideName:"",
        mobile:"",
        language:"",
        nationality:"",
        multipleSelection:[],//导游多选
        curProduct:{},

      }
    },
    methods:{
      deleteGuide(val){
        this.$http.delete("/producemanage/product/productlist/privilege/guide",{
          params:{
            productId:this.curProduct.id,
            guideId: val.id
          }
        }).then(resp=>{
          this.$message.success("该导游删除成功");
          this.loadGuidesByPid();
        })
      },
      //初始化时加载导游
      loadGuidesByPid(){
        this.$http.get("/producemanage/product/productlist/guide/"+this.curProduct.id).then(resp=>{
          var tempGuiders = [];
          resp.data.forEach(item=>{
            var tempGuider ={};
            tempGuider.id = item.id;
            tempGuider.TourismNumber = item.guidenumber;
            tempGuider.Name = item.name;
            tempGuider.EnglishName = item.englishname;
            tempGuider.Sex = item.sex;
            tempGuider.Email = item.mail;
            tempGuider.Language = item.language;
            tempGuider.Nationality = item.nationality;
            tempGuider.Contact = item.mobile;
            tempGuider.Remarks = item.note;
            tempGuiders.push(tempGuider);
          })
          this.tableData = tempGuiders;
        }).catch(error=>{
          this.$message.error(error.message);
        })
      },
      showAddGuideDialog(){
        this.dialogTableVisible = true;
        //加载未添加的导游信息
        this.loadGuidesInDialog()
      },
      loadGuidesInDialog(){
        this.$http.get("/producemanage/product/productlist/guide/page",{
          params:{
            productId:this.curProduct.id,
            guideName:this.guideName,
            mobile:this.mobile,
            language:this.language,
            nationality:this.nationality,
            page:this.currentPage,
            rows:this.rows
          }
        }).then(resp=>{
          //设置参数
          this.totalItem = resp.data.total;
          var tempGuides = [];
            resp.data.items.forEach(item=>{
              var tempGuider ={};
              tempGuider.id = item.id;
              tempGuider.TourismNumber = item.guidenumber;
              tempGuider.Name = item.name;
              tempGuider.EnglishName = item.englishname;
              tempGuider.Sex = item.sex;
              tempGuider.Email = item.mail;
              tempGuider.Language = item.language;
              tempGuider.Nationality = item.nationality;
              tempGuider.Contact = item.mobile;
              tempGuider.Remarks = item.note;
              console.log(tempGuider);
              tempGuides.push(tempGuider);
            });
            console.log(tempGuides);
            this.gridData = tempGuides;
        }).catch(error=>{

        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //为产品添加导游
      addProductGuide(){
        var selectedGuideIds = [];
        this.multipleSelection.map(item=>selectedGuideIds.push(item.id));
        if(selectedGuideIds == null || selectedGuideIds.length == 0){
          this.$message.error("请选择需要添加的id");
        }
        //发送添加请求
        this.$http.post("/producemanage/product/productlist/privilege/guide",this.$qs.stringify({
           productId:this.curProduct.id,
           guideIds:selectedGuideIds.join(",")
        })).then(resp=>{
            this.$message.success("导游添加成功");
            this.loadGuidesByPid();
            this.dialogTableVisible = false;
        }).catch(error=>{
          this.$message.error(error.message);
        })
      }
    },
    created(){
      //加载当前产品
      var curProduct = JSON.parse(localStorage.getItem("curProduct"));
      if(curProduct == null){
        this.$router.push("/login");
      }
      this.curProduct = curProduct;
      //加载表单数据
      this.loadGuidesByPid();
    }

  }


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
  .left{
    float: left;

  }

  .path {
    text-align: left;
    font-size: 17px;
    line-height: 25px;
    height: 25px;
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
    font-family: stXinkai;
    font-style: normal;
  }
  .title02{
    display:flex;
  }
  .title03{
    margin: 0px 10px 10px 0px;
  }
  .body{
    margin-top: 5px;
    margin-bottom: 20px;
    padding: 10px 0 30px;

  }

  .title01{
    text-align: left;
    padding:10px 50px 20px 100px;
    font-family: Arial;
    font-style: normal;
    font-size:16px;

  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height:700px;
    background-color: #e5e9f2;

    position: fixed;
  }
  .kk{
    border:1px solid #dfe4ed;
  }
  .ff{
    border:1px solid #dfe4ed;
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


