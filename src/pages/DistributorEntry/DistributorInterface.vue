<template>
  <el-container>
    <el-container>
      <el-main>
        <div class="enroll">
          <el-row>
            <el-col :xs="12" :sm="13" :md="13" :lg="13" :xl="13"><h1 style="float:right;font-size: 30px;">分销商入口</h1></el-col>
            <el-col :xs="12" :sm="11" :md="11" :lg="11" :xl="11">当前用户:{{this.curDistributor.distributorname}} {{this.curDistributor.loginname}} <a href="javascript:void(0)" @click="logout">退出登录</a></el-col>
          </el-row>
        </div>
        <div class="firstRow" style="margin-top: 60px">
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content "><el-select v-model="status" placeholder="状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></div></el-col>
            <el-col :span="3"><div class="grid-content "><el-select v-model="selectedFirstCatId" @change="loadCats(selectedFirstCatId,2)" placeholder="一级分类">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></div></el-col>
            <el-col :span="3"><div class="grid-content "><el-select v-model="selectedSecondCatId"  @change="loadCats(selectedSecondCatId,3)"placeholder="二级分类">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></div></el-col>
            <el-col :span="3"><div class="grid-content "><el-select v-model="selectedThirdCatId"  placeholder="三级分类">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></div></el-col>
            <el-col :span="4"><div class="grid-content "><el-input v-model="input2" placeholder="项目名称"></el-input></div></el-col>
            <el-col :span="4"><div class="grid-content "><el-input v-model="input3" placeholder="产品编号"></el-input></div></el-col>
          </el-row>
        </div>
        <div class="secondRow">
          <el-row :gutter="4">
            <el-col :span="3"><div class="grid-content "><el-input v-model="input4" placeholder="产品名称"></el-input></div></el-col>
            <el-col :span="3"><div class="grid-content ">
              <div class="block">
                <el-date-picker v-model="StartTime"  value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="开始时间"></el-date-picker></div>
            </div></el-col>
            <el-col :span="3"><div class="grid-content ">
              <div class="block">
                <el-date-picker v-model="EndTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="结束时间"></el-date-picker></div>
            </div></el-col>
            <el-col :span="2"><el-button type="primary" @click="loadData">查询</el-button></el-col>
          <!--  <el-col :span="2"><div class="grid-content "><el-button type="info">导游信息</el-button></div></el-col>
            <el-col :span="2"><div class="grid-content "><el-button type="info">行程设置</el-button></div></el-col>-->
            <div class="body">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                  width="35">
                </el-table-column>
                <el-table-column
                  prop="classify"
                  label="类别"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="project"
                  label="所属项目"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="Tname"
                  label="团名称"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="ProductID"
                  label="产品编号"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="Pname"
                  label="产品名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="start"
                  label="服务开始时间"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="end"
                  label="服务结束时间"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="pre"
                  label="预"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="already"
                  label="已"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="remain"
                  label="余"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="产品价格"
                  width="70">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini" type="primary" plain  @click="gotolink(scope.row)">查看详情</el-button>
                    <v-icon class ="material-icons" @click="godownloadfile(scope.row)">
                    cloud_download
                    </v-icon>
                  </template>
                </el-table-column>
              </el-table>
              <div class="page">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="5"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalItem">
                </el-pagination>
              </div>
            </div>

          </el-row>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'DistributorInterface',
    data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          StartTime: '',
          EndData: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''

        },
        formLabelWidth: '120px',
        StartTime: [
          {
            required: true,
            message: "请选择时间"
          }
        ],
        EndTime: [
          {
            required: true,
            message: "请选择时间"
          }
        ],
        options: [
          {
            label: '待售',
            value: 0,
          },
          {
            label: '上架',
            value: 1,
          },
          {
            label: '下架',
            value: 2,
          },
        ],
        options1: [],
        options2: [],
        options3: [],
        status: '',
        selectedFirstCatId: '',
        selectedSecondCatId: '',
        selectedThirdCatId: '',

        input1: '',
        input2: '',
        input3: '',
        input4: '',
        StartTime: '',
        EndTime: '',
        currentPage: 1,  //当前页
        rows: 5,    //每页大小
        totalItem: 20,   //总条数
        tableData: [],
        gridData: [],
        value: '',
        multipleSelection: [],
        curDistributor:{} , //当前分销商
        signal:true,
        createuser:"",
      };
    },
    created() {
      //获取当前登录者
      var cdStr = localStorage.getItem("curDistributor");
      if(cdStr == null || cdStr =="")
        this.$router.push("/login");
      this.curDistributor = JSON.parse(cdStr);
      this.loadCurDistributor();
      this.loadData();
    },
    methods: {
      handleEdit(index, row) {
        this.showDialog(true, row);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.rows = (val);
        this.loadData();
      },
      handleCurrentChange(val) {
        this.currentPage = (val);
        this.loadData();
      },
      showDialog(isEdit, row) {
        this.isEdit = isEdit;
        this.dialogFormVisible = true;
        if (isEdit) {
          this.showEditDialog(row);
        } else {
          this.showAddDialog();
        }
      },
      gotolink(row) {
        //指定跳转地址
        localStorage.setItem("signItem", JSON.stringify(row));
        this.$router.replace('/DistributorEntry/Detail')
      },


      //根据父id和级别加载对应的分类
      loadCats(pid, level) {
        this.$http.get("/producemanage/product/productlist/queryCatById", {
          params: {
            catId: pid
          }
        }).then(resp => {
          var listCats = [];
          resp.data.forEach(item => {
            var listCat = {};
            listCat.label = item.productcatname;
            listCat.value = item.id;
            listCats.push(listCat);
          });
          switch (level) {
            case 1:
              this.options1 = listCats;
              break;
            case 2:
              this.options2 = listCats;
              break;
            case 3:
              this.options3 = listCats;
              break;
            default:
              break;
          }
        }).catch(error => {
          this.$message.error(error.message);
        })
      },
      loadData() {
        //自旋等待数据
        this.tableData = [];
        //加载产品列表信息
        this.$http.get("/distributorEntry/auth/getAvailableProducts", {
          params: {
            did:this.curDistributor.id,
            status: this.status,
            productCatId1: this.selectedFirstCatId,
            productCatId2: this.selectedSecondCatId,
            productCatId3: this.selectedThirdCatId,
            projectName: this.input2,
            productNumber: this.input3,
            productName: this.name,
            serverStartTime: this.StartTime,
            serverEndTime: this.EndTime,
            page: this.currentPage,
            size: this.rows
          }
        }).then(resp => {
          //成功
          this.totalItem = resp.data.total;
          var tables = [];
          resp.data.items.forEach(listItem => {
            var table = {};
            table.id = listItem.id;
            table.status =listItem.productstatus==1 ? "上架":"上架" &&  listItem.productstatus==0 ? "待售":"待售" &&  listItem.productstatus==2 ? "下架":"下架";;
            table.classify = listItem.productcatnames;
            table.project = listItem.projectname;
            table.Tname = listItem.groupname;
            table.ProductID = listItem.productnumber;
            table.Pname = listItem.productname;
            table.start = new Date(listItem.serverstarttime).format("yyyy-MM-dd hh:mm:ss");
            table.end = new Date(listItem.serverendtime).format("yyyy-MM-dd hh:mm:ss");
            table.pre = listItem.presellnumber;
            table.already = listItem.sellednumber;
            table.remain = listItem.lowestnumber;
            table.price = listItem.productprice;
            table.createuser = listItem.createusername;
            tables.push(table);
          });
          this.tableData = tables;
        }).catch(error => {
          this.$message.error(error.message);
        });
      },
      godownloadfile(row) {
        //方式1:window.open(this.$http.defaults.baseURL+"/download/" + row.id);
        //Access-Control-Allow-Origin
        localStorage.setItem("signItem", JSON.stringify(row));
        this.$router.push('/DistributorEntry/DistributorAppendix');
        // console.log(product.id);
        // this.$http.get("/download/" + row.id,{responseType:'arraybuffer'}).then(resp => {
        //   this.$message.success("下载成功，请注意查看")
        // }).catch(error => {
        //   this.$message.error(error.message);
        // });
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
    margin-bottom: 20px;
    background:#E9EEF3;
  }
  .thirdRow{
    margin-left: -5px;
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
    height:800px;
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
    margin-bottom: 7px;
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

    background-color: #f9fafc;
  }

  .el-form.el-input{
    width: 200px;
  }
  .el-table{
    font-size:12px;
  }

  .block{
    display: flex;
  }
  .body{
    padding:50px 0px 0px 0px;
  }
  .enroll{
    margin-top: 20px;
  }

</style>
