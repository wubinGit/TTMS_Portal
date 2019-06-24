<template>
  <el-container>
    <el-container>
      <el-main>
        <div class="top"><p class="title" style="color:#B3C0D1">库存分销</p>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
            <el-breadcrumb-item>产品</el-breadcrumb-item>
            <el-breadcrumb-item>产品列表</el-breadcrumb-item>
            <el-breadcrumb-item>价格政策</el-breadcrumb-item>
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
              <el-button type="primary" @click="showPricePolicyDialog()">添加优惠政策</el-button>
              <el-dialog title="添加优惠政策" :visible.sync="dialogTableVisible" style="width: 120%">
                <div class="title02">
                  <div class="title03"><el-input v-model="policyName" placeholder="政策名称"></el-input></div>
                  <div class="title03"><el-date-picker v-model="startTime" type="date" placeholder="开始时间"></el-date-picker></div>
                  <div class="title03"><el-date-picker v-model="endTime" type="date" placeholder="结束时间"></el-date-picker></div>
                  <div class="title03"><el-button type="primary">查询</el-button></div>
                </div>
                <el-table :data="gridData" @selection-change="handleSelectionChange" border>
                  <el-table-column type="selection" width="30"></el-table-column>
                  <el-table-column property="PolicyName" label="政策名称" width="80"></el-table-column>
                  <el-table-column property="PreferentialPolicy" label="政策优惠" width="80"></el-table-column>
                  <el-table-column property="DiscountPrice" label="折后价格" width="80"></el-table-column>
                  <el-table-column property="MaximumNumber" label="最大数量" width="80"></el-table-column>
                  <el-table-column property="MinimumNumber" label="最低数量" width="80"></el-table-column>
                  <el-table-column property="StartTime" label="开始日期" width="100"></el-table-column>
                  <el-table-column property="EndTime" label="结束日期" width="100"></el-table-column>
                  <el-table-column property="PolicyCaption" label="政策说明" width="148"></el-table-column>
                </el-table>
                <div class="hh" style="padding-top: 30px;">
                  <div class="block">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="currentPage"
                      :page-size="rows"
                      layout="prev, pager, next, jumper"
                      :total="totalItems">
                    </el-pagination>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addProductPolicy">确 定</el-button>
                </div>
              </el-dialog>
            </div>

            <div class="kk"><el-table :data="tableData"   border style="width:100%">
              <el-table-column
                prop="PolicyName"
                label="政策名称"
                width="100">
              </el-table-column>
              <el-table-column
                prop="PreferentialPolicy"
                label="政策优惠"
                width="115">
              </el-table-column>
              <el-table-column
                prop="DiscountPrice"
                label="折后价格"
                width="80">
              </el-table-column>
              <el-table-column
                prop="MaximumNumber"
                label="最大数量"
                width="80">
              </el-table-column>
              <el-table-column
                prop="MinimumNumber"
                label="最低数量"
                width="80">
              </el-table-column>
              <el-table-column
                prop="StartTime"
                label="开始日期"
                width="120">
              </el-table-column>
              <el-table-column
                prop="EndTime"
                label="结束日期"
                width="120">
              </el-table-column>
              <el-table-column
                prop="PolicyCaption"
                label="政策说明"
                width="240">
              </el-table-column>
              <el-table-column label="操作" align="center" width="200">
                　　　　<template slot-scope="scope">
                　　　　　　<el-button type="danger" @click="deletePolicy(scope.row)">删除</el-button>
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
        currentPage: 1,
        value1: '',
        value2: '',
        gridData: [],
        dialogTableVisible: false,
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
        tableData:[],   //表格中的数据
        totalItems:0 , //总数据
        rows:5 , //一页数据的大小
        currentPage:1, //当前页
        //查询条件
        policyName:"",
       startTime:"",
        endTime: "",
        multipleSelection:[],  //多选
        curProduct:{} , //当前产品

      }
    },
    methods:{
      deletePolicy(val){
        this.$http.delete("/producemanage/product/productlist/privilege/pricepolicy",{
          params:{
            productId:this.curProduct.id,
            pricePolicyId: val.id
          }
        }).then(resp=>{
          this.$message.success("该价格政策删除成功");
          this.loadPricePolicyByPid();
        })
      },
      handleCurrentChange(){

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(){

      },
      loadPricePolicyByPid(){
        this.$http.get("/producemanage/product/productlist/pricepolicy/"+this.curProduct.id).then(resp=>{
          this.tableData = [];
          resp.data.forEach(item=>{
            var data = {};
            data.id = item.id;
            data.PolicyName = item.policyname;
            data.PreferentialPolicy = item.policydiscount;
            data.DiscountPrice = item.priceafterdiscount;
            data.MaximumNumber = item.maxnum;
            data.MinimumNumber = item.minnum;
            data.StartTime = new Date(item.starttime).format("yyyy-MM-dd hh:mm:ss");
            data.EndTime = new Date(item.endtime).format("yyyy-MM-dd hh:mm:ss");
            data.PolicyCaption = item.policynote;
            this.tableData.push(data);
          })
        }).catch(error=>{
          this.$message.error(error.message);
        })
      },
      showPricePolicyDialog(){
        this.dialogTableVisible = true;
        this.loadPricePolicyInDialog();
      },
      //加载dialog中的数据
      loadPricePolicyInDialog(){
        this.$http.get("/producemanage/product/productlist/pricepolicy/page",{
         params:{
           productId:this.curProduct.id,
           pricePolicyName:this.policyName,
           startTime : this.startTime,
           endTime: this.endTime,
           page:this.currentPage,
           rows:this.size
         }
        }).then(resp=>{
          this.gridData = [];
          this.totalItemss = resp.data.total;
          resp.data.items.forEach(item=>{
            var data = {};
            data.id = item.id;
            data.PolicyName = item.policyname;
            data.PreferentialPolicy = item.policydiscount;
            data.DiscountPrice = item.policydiscount;
            data.MaximumNumber = item.maxnum;
            data.MinimumNumber = item.minnum;
            data.StartTime = item.starttime;
            data.EndTime = item.starttime;
            data.PolicyCaption = item.policynote;
            this.gridData.push(data);
          })
        }).catch()

      },
      //为产品添加价格政策
      addProductPolicy(){
        var selectedGuPolicyIds = [];
        this.multipleSelection.map(item=>selectedGuPolicyIds.push(item.id));
        if(selectedGuPolicyIds == null || selectedGuPolicyIds.length == 0){
          this.$message.error("请选择需要添加的价格政策");
          return;
        }
        //发送添加请求
        this.$http.post("/producemanage/product/productlist/privilege/pricepolicy",this.$qs.stringify({
          productId:this.curProduct.id,
          pricespolicyIds:selectedGuPolicyIds.join(",")
        })).then(resp=>{
          this.$message.success("价格政策添加成功");
          this.loadPricePolicyByPid();
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
      this.loadPricePolicyByPid();
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
    font-family: normal;
    font-style: normal;
    font-size:12px;

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


