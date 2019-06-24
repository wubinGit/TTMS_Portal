<template>
  <el-container>
    <el-container>
      <el-main>
        <div class="top"><p class="title" style="color:#B3C0D1">库存分销</p>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
            <el-breadcrumb-item>产品</el-breadcrumb-item>
            <el-breadcrumb-item>产品分类</el-breadcrumb-item>
            <el-breadcrumb-item>库存分销</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="body" style="width:100%;height:100%">
          <div class="body-upside" style="width:100%;height:30%">
            <el-row :gutter="24">
              <el-col :span="10">
                <div class="grid-content"><div class="title01"><b>产品编号：</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.ProductID}}</span></div>
                  <div class="title01"><b>产品负责人:</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.createusername}}</span></div>
                  <div class="title01"><b>价格信息：</b><span>&nbsp;&nbsp;&nbsp;￥{{curProduct.price}}</span></div>
                </div>
              </el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple"><div class="title01"><b>产品名称:</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.Pname}}</span></div>
                  <div class="title01"><b>服务日期：</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.start}}~{{curProduct.end}}</span></div>
                  <div class="title01"><b>状态：</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.status}}
                    <!--<span v-show="curProduct.status==0">待售</span>
                    <span v-show="curProduct.status==1">上架</span>
                    <span v-show="curProduct.status==2">下架</span>--></span></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="body-bottom" style="width:100%;height:70%;">
            <div class="menu" style="padding: 0px 0px 10px 10px ;text-align:left;">
            <el-button type="primary"  @click="showAddDistributorUpDialog()">添加分销商</el-button></div>
            <el-dialog title="添加分销商" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="分销商" :label-width="formLabelWidth">
                  <div class="left">  <el-select v-model="selectedDistributorId" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select></div>
                </el-form-item>
            <div class="left">
              <el-form-item label="销售日期" :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="startTime"
                      type="date"
                      placeholder="开始日期">
                    </el-date-picker>
                    <el-date-picker
                      v-model="endTime"
                      type="date"
                      placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="addDistribute()">确 定</el-button>
              </div>
            </el-dialog>
            <div class="kk"><el-table :data="tableData" border style="width:100%">
              <el-table-column prop="DistributorNumber" label="分销商编号" width="150">
              </el-table-column>
              <el-table-column prop="DistributorName" label="分销商名称" width="150">
              </el-table-column>
              <el-table-column prop="AssignedAmount" label="分销商电话" width="150">
              </el-table-column>
              <el-table-column prop="distributionaddress" label="分销商地址" width="150">
              </el-table-column>
              <el-table-column prop="StartData" label="销售开始日期" width="150">
              </el-table-column>
              <el-table-column prop="EndData" label="销售终止日期" width="150">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="70">
                <template slot-scope="scope">
                  　　　<el-button type="danger" @click="deleteUser(scope.row)">取消分销</el-button>
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
        gridData: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        selectdistributor:"",
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
        tableData: [],
        curProduct: "",
        selectedDistributorId: "",
        startTime: '',
        endTime: '',
        options: [],
      }
    },
    methods: {
      deleteUser(val) {
        this.$http.delete("/producemanage/product/productlist/privilege/distributor",{
          params:{
            productId:this.curProduct.id,
            productDistributorId:val.DistributorNumber,
          }
        }).then(resp=>{
          this.$message.success("取消分销商成功")
          this.loadDistributorAll();
          this.dialogFormVisible = false;
        }).catch(error=>{
          this.$message.error(error.message);
          this.dialogFormVisible = false;
        })
//这里写相应的逻辑，val是指传进来的参数也就是上面的scope.row.phone；也可以是scope.row.nickname等
      },
      showAddDistributorUpDialog() {
        this.loadDistributor();
        this.dialogFormVisible = true;
      },

      addDistribute() {
        //加载分销商
        //验证数据完整性
        this.$http.post("/producemanage/product/productlist/privilege/distributor",this.$qs.stringify({
          productId:this.curProduct.id ,
          distributorId:this.selectedDistributorId,
          startTime:new Date(this.startTime).format("yyyy-MM-dd hh:mm:ss"),
          endTime:new Date(this.endTime).format("yyyy-MM-dd hh:mm:ss")
        })).then(resp=>{
          this.$message.success("添加分销商成功")
          this.loadDistributorAll();
          this.dialogFormVisible = false;
        }).catch(error=>{
          this.$message.error(error.message);
          this.dialogFormVisible = false;
        })
      },
    loadDistributor(){
      this.$http.get("/producemanage/product/productlist/distributors",{
        params:{
          pid:this.curProduct.id
        }
      }).then(resp=>{
        var listCats = [];
        resp.data.forEach(item => {
          var listCat = {};
          listCat.label = item.distributorname;
          listCat.value = item.id;
          listCats.push(listCat);
          this.options=listCats;
        });
      }).catch(error=>{
        this.$message.info("不存在没有添加的分销商");
      });
  },

      loadDistributorAll(){
        this.$http.get("/producemanage/product/productlist/distributor/"+this.curProduct.id).then(resp=>{
          this.tableData = [];
          resp.data.forEach(item=>{
            var data = {};
            data.DistributorNumber = item.id;
            data.DistributorName = item.distributorname;
            data.AssignedAmount = item.distributorphone;
            data.distributionaddress=item.distributoraddress;
            data.StartData = new Date(item.serverstarttime).format("yyyy-MM-dd hh:mm:ss");
            data.EndData = new Date(item.serverendtime).format("yyyy-MM-dd hh:mm:ss");

            this.tableData.push(data);
          })
        }).catch(error=>{
          this.$message.error(error.message);
        })
      },
    },
    created() {
      //加载当前产品
      var curProduct = JSON.parse(localStorage.getItem("curProduct"));
      if (curProduct == null) {
        this.$router.push("/login");
      }
      this.curProduct = curProduct;
      this.loadDistributorAll();

      //this.loadDistributor();
    },

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


