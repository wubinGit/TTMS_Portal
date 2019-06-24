<template>
  <el-container>
    <el-main>
      <div class="enroll">
        <el-row>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"><el-button  class="primary" icon="el-icon-caret-left" @click="goback">返回上一页</el-button></el-col>
          <el-col :xs="6" :sm="7" :md="7" :lg="7" :xl="7"><h1 style="float:right;font-size: 30px;">报名详情</h1></el-col>
          <el-col :xs="12" :sm="11" :md="11" :lg="11" :xl="11">当前用户:{{this.curDistributor.distributorname}} {{this.curDistributor.loginname}} <a href="javascript:void(0)" @click="logout">退出登录</a></el-col>
        </el-row>
      </div>
      <div class="body" style="width:100%;height:100%">
        <div class="body-upside" style="width:100%;height:30%;padding:50px 20px 0px 20px">
          <el-row :gutter="15">
            <el-col :span="10">
              <div class=""><div class="title01"><b>产品编号：</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.ProductID}}</span></div>
                <div class="title01"><b>产品负责人:</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.createuser}}</span></div>
                <div class="title01"><b>价格信息：</b><span>&nbsp;&nbsp;&nbsp;￥{{curProduct.price}}</span></div>
              </div>
            </el-col>
            <el-col :span="14">
              <div class=" "><div class="title01"><b>产品名称:</b><span>&nbsp;&nbsp;&nbsp;{{curProduct.Pname}}</span></div>
                <div class="title01"><b>服务日期：</b><span>&nbsp;&nbsp;&nbsp;2019-05-28~2019-6-29</span></div>
                <div class="title01"><b>状态：</b><span>&nbsp;&nbsp;&nbsp;产品上架</span></div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="body-bottom" style="width:100%;height:70%;">
          <div class="menu" style="padding: 30px 0px 10px 50px;text-align:left;">
            <el-button type="primary" @click="showSignUpDialog()">报名</el-button>
            <div class="ff">报名人信息</div>
            <el-dialog title="填写报名人信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="价格政策" :label-width="formLabelWidth">
                  <template>
                    <el-select v-model="selectedPricePolicy" clearable placeholder="请选择" >
                      <el-option
                        v-for="item in pricePolicyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                  <el-link v-show="!hasPricePolicy" type="danger" disabled>无可用价格政策</el-link>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-radio v-model="form.sex" label="0">男</el-radio>
                  <el-radio v-model="form.sex" label="1">女</el-radio>
                </el-form-item>
                <el-form-item label="身份证号码" :label-width="formLabelWidth">
                  <el-input v-model="form.idcard" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                  <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.note" autocomplete="off"></el-input>
              </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <span style="float: left">实付金额:<s  class=".title" style="font-size: 25px;text-decoration: none;color:red">¥{{acutalPayInDialog}}</s></span>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="signUp">报名</el-button>
              </div>
            </el-dialog>
          </div>
          <div class="kk"><el-table
            :data="tableData"
            border
            style="width:90%">
            <el-table-column
              prop="Number"
              label="游客编号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="Name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="Sex"
              label="性别"
              width="100">
            </el-table-column>
            <el-table-column
              prop="IDNumber"
              label="身份证号码"
              width="170">
            </el-table-column> <el-table-column
            prop="Phone"
            label="联系电话"
            width="120">
          </el-table-column>
            <el-table-column
              prop="formalPrice"
              label="原价"
              width="100">
            </el-table-column>
            <el-table-column
            prop="actualPay"
            label="实付金额"
            width="100">
          </el-table-column>
            <el-table-column
              prop="Remarks"
              label="备注"
              width="100">
            </el-table-column>
            <el-table-column
              prop="signupTime"
              label="报名时间"
              width="120">
            </el-table-column>
            <el-table-column
              prop="pricePolicyName"
              label="参与活动名"
              width="120">
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="70">
        　　　　<template slot-scope="scope">
        　　　　　　<el-button type="danger" @click="deleteUser(scope.row)">取消报名</el-button>
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
    name: 'Detail',
    data() {
      return {
        curDistributor:{},
        tableData:[],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name:"",
          idcard:"",
          sex:"0",
          note:"",
          phone:"",
        },
        formLabelWidth: '120px',
        pricePolicyOptions:[] , //可用价格政策
        selectedPricePolicy:"" , //被选中的价格政策
        hasPricePolicy:true,  //有可用价格政策
      };
    },
    methods: {
      deleteUser(val){
        this.$http.get("/distributorEntry/auth/cancelSign", {
            params : { //请求参数
              touristId:val.Number,
              productId:this.curProduct.id,
            }
          }).then(resp=>{
          this.$message.success("取消成功!");
          this.loadSignUpInThisDistributor();
        }).catch(error=>{
          this.$message.error(error.message);
        })
//这里写相应的逻辑，val是指传进来的参数也就是上面的scope.row.phone；也可以是scope.row.nickname等
      },
      //加载当前产品
      loadCurProduct(){
        var curSignItem = localStorage.getItem("signItem");
        if(curSignItem == null || curSignItem ==""){
          //如果没有选择分销商
          this.$router.push("/DistributorEntry/DistributorInterface");
        }
        var curProduct = JSON.parse(curSignItem);
        this.curProduct = curProduct;
      },
      loadSignUpInThisDistributor(){
        this.tableData = [];
        this.$http.get("/distributorEntry/auth/getAvailableProducts/signUptourist",{
          params: {
            productId: this.curProduct.id,
          }
        }).then(resp=>{
          var tempDatas = [];
          resp.data.forEach(item=>{
            var tempData = {};
            tempData.Number = item.id;
            tempData.Name = item.tname;
            tempData.Sex = item.tsex==1 ? "女":"男";
            tempData.IDNumber = item.tidcard;
            tempData.Phone = item.tphone;
            tempData.formalPrice = this.curProduct.price;
            tempData.actualPay = item.acutalpay;
            tempData.signupTime = new Date(item.signuptime).format("yyyy-MM-dd hh:mm:ss");
            tempData.Remarks = item.tnote;
            tempData.pricePolicyName =  item.pricePolicyName == null ? "无" : item.pricePolicyName  ;
            tempDatas.push(tempData);
          });
          this.tableData = tempDatas;
        }).catch(error=>{
            this.$message.error(error.message);
        })
      },
      showSignUpDialog(){
        this.dialogFormVisible = true;
        //加载能加入的价格政策
        this.loadPricePolicy();
      },
      //加载对话框中的价格政策
      loadPricePolicy(){
        this.hasPricePolicy = true;
        var greastDiscount = -1;
        this.$http.get("/distributorEntry/auth/getPricePolicyByProductId/"+this.curProduct.id).then(resp=>{
          var tempOptions=[];
           resp.data.forEach(item=>{
              var tempOption= {};
              tempOption.value = item.id;
              tempOption.label = item.policyname;
              tempOption.policydiscount = item.policydiscount;//selectedPricePolicy
              if( item.policydiscount>greastDiscount){
                this.selectedPricePolicy = item.id;
                greastDiscount =item.policydiscount;
              }
             tempOptions.push(tempOption);
           })
          this.pricePolicyOptions = tempOptions;
        }).catch(error=>{
          this.hasPricePolicy = false;
        })
      },
      //报名
      signUp(){
        //检查表格
       if(!this.checkForm())
         return ;
        //报名
        this.$http.post("/distributorEntry/auth/signup",this.$qs.stringify({
          pricePolicy:this.selectedPricePolicy,
          name:this.form.name,
          sex : this.form.sex,
          idcard:this.form.idcard,
          phone:this.form.phone,
          desc:this.form.note,
          productId:this.curProduct.id,
        })).then(resp=>{
          //加载当前产品
          this.loadCurProduct();
          this.$message.success("报名成功");
          this.dialogFormVisible = false;
          this.loadSignUpInThisDistributor();
        }).catch(error=>{
          this.$message.error(error.message);
          this.dialogFormVisible = false;
        })
      },
      checkForm(){
        if(this.form.name == ""||
          this.form.sex == ""||this.form.idcard == ""||this.form.phone == ""||
          this.form.note == ""||this.curProduct.id == ""){
          this.$message.info("请将表单填充完整")
          return false;
        }
        return true;
      },
      goback(){
        this.$router.push("/DistributorEntry/DistributorInterface");
      },
      loadCurDistributor(){
        this.$http.get("/distributorEntry/getCurDistributor").then(resp=>{
          this.curDistributor = resp.data;
        }).catch(error=>{
          this.$message.error(error.message);
          setTimeout(()=>{
            this.$router.push("/login");
          },500)
        })
      },
      logout(){
        //退出登录
        this.$confirm('此操作将安全退出当前用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(resp=>{
          this.$http.get("/distributorEntry/loginout").then(resp=>{
            this.$message.success("退出成功");
            setTimeout(()=>{
              this.$router.push("/login");
            },1000)
          }).catch(error=>{
            this.$message.error(error.message);
            setTimeout(()=>{
              this.$router.push("/login");
            },1000)
          })
        });
      },
    },
    created(){
      //获取当前登录者
      this.loadCurDistributor();
      //加载当前产品
     this.loadCurProduct();
     //加载当前已经报名的人
      this.loadSignUpInThisDistributor();
    },
    computed:{
      acutalPayInDialog(){
        var discount = 0;
         if(this.selectedPricePolicy){
             var selectedOpt = this.pricePolicyOptions.filter(item=>{
               return item.value == this.selectedPricePolicy;
             });
             discount = selectedOpt[0].policydiscount;
         }
        return this.curProduct.price-discount;
      }
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

  .path {
    text-align: left;
    font-size: 17px;
    line-height: 25px;
    height: 25px;
  text-align: center;
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
    margin-left: 50px;
  }

  .el-main {
    background-color: #F5F7FA;
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
  .ff{
    font-family: "Eras Bold ITC";
    font-size:18px;
    padding:10px 0px 0px 50px;
  }
  .topic{
    text-align: left;
    margin-top: 30px;
  }

</style>

