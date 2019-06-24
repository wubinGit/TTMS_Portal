<template>
  <el-container>
    <el-container>
      <el-main>
        <div class="top">
          <p class="title" style="color:#B3C0D1">创建产品</p>
          <div class="path">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
              <el-breadcrumb-item>产品</el-breadcrumb-item>
              <el-breadcrumb-item>创建产品</el-breadcrumb-item></el-breadcrumb>
          </div>
        </div>
        <div class="body">
          <div class="form-top">
            <el-form ref="form" :model="form" label-width="100px">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="产品编号" class="left">
                    <el-input v-model="form.productNumber" placeholder="产品编号自动生成"  :disabled="true" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="团号" class="pl-0" :rules="[
                     { required: true },]">
                    <el-select v-model="selectedGroupId"  @change="changeGroup(selectedGroupId)" placeholder="请选择产品团号">
                      <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产品分类" class="pl-0" :rules="[
                    { required: true },]">
                    <el-select v-model="selectedFirstCatId" placeholder="一级分类" @change="loadSecondCats(selectedFirstCatId)" class="wid">
                      <el-option v-for="item in catOptions1" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                    </el-select>
                    <el-select v-model="selectedSecondCatId" placeholder="二级分类" @change="loadThridCats(selectedSecondCatId)" class="wid">
                      <el-option v-for="item in catOptions2" :key="item.value"  :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="selectedThirdCatId" placeholder="三级分类" class="wid">
                      <el-option v-for="item in catOptions3" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-form-item label="产品负责人" class="right">
                    <el-input v-model="form.productChargerName" placeholder="请输入产品负责人" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="产品名称" class="widwid left" :rules="[
                      { required: true },]">
                    <el-input v-model="form.productName" placeholder="请输入产品名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="formInfo">
            <template>
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                  <el-form ref="form" :model="form" label-width="150px">
                    <el-row>
                      <el-col :span="7">
                        <el-form-item label="服务开始时间" class="left" :rules="[ { required: true },]">
                            <el-date-picker
                              v-model="form.serverStartTime"
                              type="datetime"
                              placeholder="">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7">
                        <el-form-item label="服务结束时间" class="left" :rules="[ { required: true },]">
                          <el-date-picker
                            v-model="form.serverEndTime"
                            type="datetime"
                            placeholder="">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="预售数量" class="right" :rules="[ { required: true },]">
                          <el-input v-model="form.preSellNumber" placeholder=""></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="最低数量" class="right" :rules="[ { required: true },]">
                          <el-input v-model="form.lowestNumber" placeholder=""></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="上架时间" class="left" :rules="[ { required: true },]">
                          <el-date-picker
                            v-model="form.upTime"
                            type="datetime"
                            placeholder="">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7">
                        <el-form-item label="下架时间" class="left" :rules="[ { required: true },]">
                          <el-date-picker
                            v-model="form.downTime"
                            type="datetime"
                            placeholder="">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="商品价格" class="right" :rules="[ { required: true },]">
                          <el-input v-model="form.price" placeholder=""></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="特别提示" class="left widwid">
                          <el-input v-model="form.tip" placeholder="限6个汉字"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="20">
                        <el-form-item label="产品简介" class="left widwid">
                          <el-input type="textarea" v-model="form.desc" size="large" placeholder=""></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="20">
                        <div></div>
                      </el-col>
                      <el-col :span="4">
                        <el-button type="primary" @click="createProduct()">创建产品</el-button>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </template>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'CreateProduct',
    data() {
      return {
        activeName: 'first',
        catOptions1: [],
        catOptions2: [],
        catOptions3: [],
        groupOptions: [],
        selectedFirstCatId: '',
        selectedSecondCatId: '',
        selectedThirdCatId: '',
        selectedGroupId: "",
        chargerName: "",

        form: {
          productNumber: '', //产品编号
          productChargerId: "",//产品负责人Id
          productChargerName: "",  //产品负责人
          productName: "",  //产品名称
          serverStartTime: "",   //服务开始时间
          serverEndTime: "",     //服务结束时间
          preSellNumber: "",   //预售数量
          lowestNumber: "",  //最低数量
          upTime: "",      //上架时间
          downTime: "",    //下架时间
          price: "",       //价格
          tip: "",       //提示
          desc: "",      //描述
          region: ''
        }

      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //根据父id和级别加载对应的分类
      loadNCatById(pid, level) {
        this.$http.get("/producemanage/product/createproduct/queryCatById", {
          params: {
            catId: pid
          }
        }).then(resp => {
          var tempCats = [];
          resp.data.forEach(item => {
            var tempCat = {};
            tempCat.label = item.productcatname;
            tempCat.value = item.id;
            tempCats.push(tempCat);
          });
          switch (level) {
            case 1:
              this.catOptions1 = tempCats;
              break;
            case 2:
              this.catOptions2 = tempCats;
              break;
            case 3:
              this.catOptions3 = tempCats;
              break;
            default:
              break;
          }
        }).catch(error => {
          this.$message.error(error.message);
        })
      },
      //加载二级分类
      loadSecondCats(pid) {
        this.loadNCatById(pid, 2);
      },
      //加载三级分类
      loadThridCats(pid) {
        this.loadNCatById(pid, 3);
      },
      loadGroup() {
        this.$http.get("/producemanage/product/createproduct/queryAllGroups").then(resp => {
          var tempGroups = [];
          resp.data.forEach(item => {
            var tempGroup = {};
            tempGroup.label = item.groupname;
            tempGroup.value = item.id;
            tempGroups.push(tempGroup);
          })
          this.groupOptions = tempGroups;
        }).catch(error => {

        })
      },

      //改变要创建团的产品
      changeGroup(groupId) {
        this.$http.get("/producemanage/product/createproduct/AmIcharger/" + groupId).then(resp => {
          this.form.id = resp.data.id;
          this.form.productChargerName = resp.data.username;
        }).catch(error => {
          this.$message.error(error.message);
        })
      },
      //创建产品
      createProduct() {
        if ( this.selectedGroupId ==""|| this.selectedFirstCatId=="" ||this.selectedSecondCatId=="" ||this.selectedThirdCatId==""
          || this.form.productName=="" || this.form.serverStartTime=="" ||this.form.serverEndTime=="" || this.preSellNumber=="" ||this.lowestNumber==""
          || this.form.upTime=="" || this.form.downTime=="" || this.form.tip=="" ||this.form.desc=="" ) {
          this.$message.error("补充完整信息");
        } else {
          this.$http.post("/producemanage/product/createproduct/createProduct", this.$qs.stringify({
            groupId: this.selectedGroupId,
            productCatId1: this.selectedFirstCatId,
            productCatId2: this.selectedSecondCatId,
            productCatId3: this.selectedThirdCatId,
            productName: this.form.productName,
            serverStartTime: new Date(this.form.serverStartTime).format("yyyy-MM-dd hh:mm:ss"),
            serverEndTime: new Date(this.form.serverEndTime).format("yyyy-MM-dd hh:mm:ss"),
            preSellNumber: this.form.preSellNumber,
            lowestNumber: this.form.lowestNumber,
            selledNumber: "0",
            onsellTime: new Date(this.form.upTime).format("yyyy-MM-dd hh:mm:ss"),
            productPrice: this.form.price,
            upsellTime: new Date(this.form.downTime).format("yyyy-MM-dd hh:mm:ss"),
            hotTip: this.form.tip,
            productIntroduction: this.form.desc,

          })).then(resp => {
            this.$message.success("创建产品成功");
            console.log(resp.data);
          }).catch(error => {
            this.$message.error(error.message);
          })
        }
      }
      },
      props: [
        'user',//父组件传来的当前用户参数
      ],
      created() {
        //加载一级分类
        this.loadNCatById(0, 1);

        //加载可用团
        this.loadGroup();
      },

  };
</script>

<style>

  .title {
    text-align: left;
    font-size: 30px;
    margin-bottom: 15px;
    font-family: "Helvetica Neue";
    font-style: normal;

  }
  .form-top{
    height: 70px;

  }
  .wid{
    width: 110px;
  }
  .widwid{
    width: 830px;

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

  .formInfo{
    margin-top: 120px;
    height: 500px;

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

</style>
