<template>
  <el-container>
    <el-container>
      <el-main>
        <div class="top">
          <p class="title" style="color:#B3C0D1">通知管理</p>
          <div class="path">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
              <el-breadcrumb-item>产品</el-breadcrumb-item>
              <el-breadcrumb-item>产品分类</el-breadcrumb-item></el-breadcrumb>
          </div>
        </div>
        <div class="body">
          <el-row :gutter="10">
            <el-col :span="8" v-show="table1show">
                <div class="grid-content bg-purple">
                  <div class="one" style="border:1px solid #B3C0D1">
                    <div class="title" style="border:1px solid #B3C0D1; background:#99a9bf">主分类</div>

                    <div class="ff">
                      <el-table :data="tableData1"  style="width: 100%"  @row-click="handleFirstClick">
                        <el-table-column prop="name" label="分类名称" width="80"  >
                            <template slot-scope="scope">
                              <span v-text="scope.row.name" ></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="note" label="分类备注" width="80" ></el-table-column>
                        <el-table-column label="操作" width="240">
                          <template slot-scope="scope">
                            <el-button size="mini" @click="dialogFormVisible = true">修改</el-button>
                            <el-dialog title="修改分类" :visible.sync="dialogFormVisible">
                              <el-form :model="form">
                                <el-form-item label="分类名称" :label-width="formLabelWidth">
                                  <el-input v-model="form.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="分类备注" :label-width="formLabelWidth">
                                  <el-input v-model="form.note" autocomplete="off"></el-input>
                                </el-form-item>
                              </el-form>
                              <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                              </div>
                            </el-dialog>
                            <el-button size="mini" @click="dialogFormVisible = true">新增</el-button>
                            <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
                              <el-form :model="form">
                                <el-form-item label="分类名称" :label-width="formLabelWidth">
                                  <el-input v-model="form.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="分类备注" :label-width="formLabelWidth">
                                  <el-input v-model="form.note" autocomplete="off"></el-input>
                                </el-form-item>
                              </el-form>
                              <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                              </div>
                            </el-dialog>
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button></template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
            </el-col>
            <el-col :span="8" v-show="table2show">
                <div class="grid-content bg-purple">
                  <div class="second" style="border:1px solid #B3C0D1">
                    <div class="title" style="border:1px solid #B3C0D1; background:#99a9bf" v-text="secondCatName">次分类</div>

                    <div class="ff">
                      <el-table :data="tableData2" @row-click="handleSecondClick" style="width: 100%">
                        <el-table-column prop="name" label="名称" width="80"></el-table-column>
                        <el-table-column prop="note" label="分类备注" width="80" ></el-table-column>
                        <el-table-column label="操作" width="240">
                          <template slot-scope="scope">
                            <el-button size="mini" @click="dialogFormVisible = true">修改</el-button>
                            <el-dialog title="修改分类" :visible.sync="dialogFormVisible">
                              <el-form :model="form">
                                <el-form-item label="分类名称" :label-width="formLabelWidth">
                                  <el-input v-model="form.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="分类备注" :label-width="formLabelWidth">
                                  <el-input v-model="form.note" autocomplete="off"></el-input>
                                </el-form-item>
                              </el-form>
                              <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                              </div>
                            </el-dialog>
                            <el-button size="mini" @click="dialogFormVisible = true">新增</el-button>
                            <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
                              <el-form :model="form">
                                <el-form-item label="分类名称" :label-width="formLabelWidth">
                                  <el-input v-model="form.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="分类备注" :label-width="formLabelWidth">
                                  <el-input v-model="form.note" autocomplete="off"></el-input>
                                </el-form-item>
                              </el-form>
                              <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                              </div>
                            </el-dialog>
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button></template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>

            </el-col>
            <el-col :span="8" v-show="table3show">
              <div class="grid-content bg-purple">
                <div class="three" style="border:1px solid #B3C0D1">
                  <div class="title" style="border:1px solid #B3C0D1; background:#99a9bf" v-text="thirdCatName">子分类</div>

                  <div class="ff">
                    <el-table :data="tableData3" style="width: 100%">
                      <el-table-column prop="name" label="名称" width="80"></el-table-column>
                      <el-table-column prop="note" label="分类备注" width="80" ></el-table-column>
                      <el-table-column label="操作" width="240">
                        <template slot-scope="scope">
                          <el-button size="mini" @click="dialogFormVisible = true">修改</el-button>
                          <el-dialog title="修改分类" :visible.sync="dialogFormVisible">
                            <el-form :model="form">
                              <el-form-item label="分类名称" :label-width="formLabelWidth">
                                <el-input v-model="form.name" autocomplete="off"></el-input>
                              </el-form-item>
                              <el-form-item label="分类备注" :label-width="formLabelWidth">
                                <el-input v-model="form.note" autocomplete="off"></el-input>
                              </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                              <el-button @click="dialogFormVisible = false">取 消</el-button>
                              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                            </div>
                          </el-dialog>
                          <el-button size="mini" @click="dialogFormVisible = true">新增</el-button>
                          <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
                            <el-form :model="form">
                              <el-form-item label="分类名称" :label-width="formLabelWidth">
                                <el-input v-model="form.name" autocomplete="off"></el-input>
                              </el-form-item>
                              <el-form-item label="分类备注" :label-width="formLabelWidth">
                                <el-input v-model="form.note" autocomplete="off"></el-input>
                              </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                              <el-button @click="dialogFormVisible = false">取 消</el-button>
                              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                            </div>
                          </el-dialog>
                          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button></template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'ProductCat',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          note: ''
        },
        formLabelWidth: '120px',
        tableData1: [],   //一级分类数据
        tableData2: [],    //二级分类数据
        tableData3: [],    //三级分类数据
        table1show: true,  //是否显示一级分类
        table2show: false,  //是否显示二级分类
        table3show: false,  //是否显示三级分类
        secondCatName:"",    //二级分类标题
        thirdCatName :""     //三级分类标题
      }
    },
    created() {
      this.loadFirstCat();
    },
    methods: {
      loadFirstCat() {
        //加载一级分类
        this.$http.get("/producemanage/product/productcat/queryCatById", {
          params: {
            catId: 0,
          }
        }).then(resp => {
          var table1 = [];
          resp.data.forEach(item => {
            var t1 = {};
            t1.id = item.id;
            t1.name = item.productcatname;
            t1.note = item.note;
            table1.push(t1);
          })
          this.tableData1 = table1;
        }).catch(error => {

        })
      },
      handleFirstClick(row, event, column) {
        if(row.name != this.secondCatName)
           this.showSecondCat(row.id , row.name);
      },
      showSecondCat(id , name) {
        this.secondCatName = name;
        this.table3show = false;
        this.table2show = true;
        //加载二级分类
        this.$http.get("/producemanage/product/productcat/queryCatById", {
          params: {
            catId: id,
          }
        }).then(resp => {
          var table2 = [];
          resp.data.forEach(item => {
            var t2 = {};
            t2.id = item.id;
            t2.name = item.productcatname;
            t2.note = item.note;
            table2.push(t2);
          })
          this.tableData2 = table2;
        }).catch(error => {

        })
      },
      handleSecondClick(row, event, column){
        if(row.name != this.thirdCatName)
           this.showThirdCat(row.id, row.name)
      },
      showThirdCat(id , name) {
        //改变名称
        this.thirdCatName = name;
        //加载二级分类
        this.$http.get("/producemanage/product/productcat/queryCatById", {
          params: {
            catId: id,
          }
        }).then(resp => {
          this.table3show = true;
          var table3= [];
          resp.data.forEach(item => {
            var t3 = {};
            t3.id = item.id;
            t3.name = item.productcatname;
            t3.note = item.note;
            table3.push(t3);
          })
          this.tableData3 = table3;
        }).catch(error => {
          this.table3show = false;
          this.$message(error.message);
        })
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
    padding: 10px 10px 10px 20px;
    font-size: 20px;
    margin-bottom: 20px;
    font-family: stXinkai;
    font-style: normal;
  }
  .title1{
    text-align: left;
    padding:0px 0px 5px 10px
  }
  .path {
    text-align: left;
    font-size: 17px;
    line-height: 25px;
    height: 25px;
    text-align: center;
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

