<template>
  <el-container>
    <el-container>
      <el-main><div class="top">
         <p class="title" style="color:#B3C0D1">产品列表</p>
         <div class="path" >
           <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
              <el-breadcrumb-item>产品</el-breadcrumb-item>
              <el-breadcrumb-item>产品列表</el-breadcrumb-item>
           </el-breadcrumb></div>
        <div class="firstRow">
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
          <el-row :gutter="2">
            <el-col :span="4"><div class="grid-content "><el-input v-model="input4" placeholder="产品名称"></el-input></div></el-col>
            <el-col :span="5"><div class="grid-content ">
              <div class="block">
                <el-date-picker v-model="StartTime"  value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="开始时间"></el-date-picker></div>
            </div></el-col>
            <el-col :span="5"><div class="grid-content ">
              <div class="block">
                <el-date-picker v-model="EndTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="结束时间"></el-date-picker></div>
              </div></el-col>
            <el-col :span="2"><el-button type="primary" @click="loadData">查询</el-button></el-col>
            <el-col :span="2"><el-button type="primary"  @click="dialogFormVisible = true" >修改</el-button>
              <el-dialog title="产品列表" :visible.sync="dialogFormVisible"  >
                <el-form :model="form">
                  <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-input v-model="form.status" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="类别：" :label-width="formLabelWidth">
                    <el-input v-model="form.classify" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="所属项目：" :label-width="formLabelWidth">
                    <el-input v-model="form.project" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="团名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.Tname" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="产品编号：" :label-width="formLabelWidth">
                    <el-input v-model="form.ProductID" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="产品名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.Pname" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="服务开始时间：" :label-width="formLabelWidth">
                    <el-input v-model="form.start" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="服务结束时间：" :label-width="formLabelWidth">
                    <el-input v-model="form.end" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="预：" :label-width="formLabelWidth">
                    <el-input v-model="form.pre" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="已：" :label-width="formLabelWidth">
                    <el-input v-model="form.already" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="余：" :label-width="formLabelWidth">
                    <el-input v-model="form.remain" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="产品价格：" :label-width="formLabelWidth">
                    <el-input v-model="form.price" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
            <el-col :span="2"><el-button @click="changStatus(0)">待售</el-button></el-col>
            <el-col :span="2"><el-button @click="upStatus(1)">上架</el-button></el-col>
            <el-col :span="2"><el-button @click="downStatus(2)">下架</el-button></el-col>
          </el-row></div>
        <div class="thirdRow">
          <el-row :gutter="20">
            <el-col :span="3"><div class="grid-content "><el-button type="warning" @click="goSubPage('InventoryDistribution')" >库存分销</el-button></div></el-col>
            <el-col :span="3"><div class="grid-content "><el-button type="info" @click="goSubPage('DreferentialPolicy')" >价格政策</el-button></div></el-col>
            <el-col :span="2"><div class="grid-content "><el-button type="info" @click="goSubPage('appendix')">附件</el-button></div></el-col>
            <el-col :span="3"><div class="grid-content "><el-button type="info" @click="goSubPage('TourismInformation')">导游信息</el-button></div></el-col>
            <el-col :span="3"><div class="grid-content "><el-button type="info" @click="goSubPage('RouteSetting')">行程设置</el-button></div></el-col>
          </el-row>
        </div>
        </div>
        <div class="body">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="40">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="25">
            </el-table-column>
            <el-table-column
              prop="classify"
              label="类别"
              width="100">
            </el-table-column>
            <el-table-column
              prop="project"
              label="所属项目"
              width="100">
            </el-table-column>
            <el-table-column
              prop="Tname"
              label="团名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="createusername"
              center
              label="负责人"
              width="100">
            </el-table-column>
            <el-table-column
              prop="ProductID"
              label="产品编号"
              width="130">
            </el-table-column>
            <el-table-column
              prop="Pname"
              label="产品名称"
              width="110">
            </el-table-column>
            <el-table-column
              prop="start"
              label="服务开始时间"
              width="100">
            </el-table-column>
            <el-table-column
              prop="end"
              label="服务结束时间"
              width="100">
            </el-table-column>
            <el-table-column
              prop="pre"
              label="预"
              width="50">
            </el-table-column>
            <el-table-column
              prop="already"
              label="已"
              width="40">
            </el-table-column>
            <el-table-column
              prop="remain"
              label="余"
              width="40">
            </el-table-column>
            <el-table-column
              prop="price"
              label="产品价格"
              width="60">
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
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'ProductList',
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
        createusername:"",
      };
    },
    created() {
      this.loadData();
      this.loadCats(0, 1);

    },
    methods: {
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
        this.tableData = [];
        //加载产品列表信息

        this.$http.get("/producemanage/product/productlist/page", {
          params: {
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
            table.status = listItem.productstatus==1 ? "上架":"上架" &&  listItem.productstatus==0 ? "待售":"待售" &&  listItem.productstatus==2 ? "下架":"下架";
            table.classify = listItem.productcatnames;
            table.project = listItem.projectname;
            table.Tname= listItem.groupname;
            table.createusername = listItem.createusername;
            table.ProductID = listItem.productnumber;
            table.Pname=listItem.productname;
            table.start= new Date(listItem.serverstarttime).format("yyyy-MM-dd hh:mm:ss");
            table.end= new Date(listItem.serverendtime).format("yyyy-MM-dd hh:mm:ss");
            table.pre=listItem.presellnumber;
            table.already=listItem.sellednumber;
            table.remain=listItem.lowestnumber;
            table.price=listItem.productprice;
            table.createproname=listItem.productcatnames;
            table.createusername = listItem.createusername;
            tables.push(table);
          });
          this.tableData = tables;
        }).catch(error =>{
          console.log(error.message);
        });
      },
      goSubPage(pageName){
        if(this.multipleSelection.length != 1){
          this.$message.info("只能选择一个产品进行操作");
          return;
        }
        //保存数据
        localStorage.setItem("curProduct",JSON.stringify(this.multipleSelection[0]));
        //页面转跳
        this.$router.push("/producemanage/product/productlist/"+pageName);
      },
      changStatus(status){
        if (this.multipleSelection[0].status==='0'){
          return;
        }
        this.$http.put("/producemanage/product/productlist/privilege/updateproductStatus",this.$qs.stringify({

          productId: this.multipleSelection[0].id,
          pstatus: status,

         })).then(resp=>{
          this.loadData();
        }).catch(error=>{
          this.$message.error(error.message);
        });

      },
      upStatus(status){
        if (this.multipleSelection[0].status==='1'){
          return;
        }
        this.$http.put("/producemanage/product/productlist/privilege/updateproductStatus",this.$qs.stringify({

          productId: this.multipleSelection[0].id,
          pstatus: status,

        })).then(resp=>{
          this.loadData();
        }).catch(error=>{
          this.$message.error(error.message);
        });
      },
      downStatus(status) {
        if (this.multipleSelection[0].status === '2') {
          return;
        }
        this.$http.put("/producemanage/product/productlist/privilege/updateproductStatus", this.$qs.stringify({
          productId: this.multipleSelection[0].id,
          pstatus: status,
        })).then(resp => {
          this.loadData();
        }).catch(error => {
          this.$message.error(error.message);
        });
      }

    }
  }
</script>
<style>
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

    color: #333;
    text-align: center;
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
  .el-date-editor.el-input{
    width:200px;
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

</style>
