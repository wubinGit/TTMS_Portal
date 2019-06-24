<template>
  <el-container>
    <el-container>
      <el-main>
        <div class="top"><p class="title" style="color:#B3C0D1">行程设置</p>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
            <el-breadcrumb-item>产品</el-breadcrumb-item>
            <el-breadcrumb-item>产品列表</el-breadcrumb-item>
            <el-breadcrumb-item>行程设置</el-breadcrumb-item>
          </el-breadcrumb>
          </div>

        <div class="body" style="margin-top: 30px;height: 700px ">
            <el-tabs type="border-card">
              <el-tab-pane label="第1天">
                <div style="margin: 20px;"></div>

                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="日程名称:">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="日程内容:">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                  <el-form-item label="住宿信息:">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                  <el-form-item label="早餐:">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="午餐:">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="晚餐:">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="第2天">配置管理</el-tab-pane>
              <el-tab-pane label="第3天">角色管理</el-tab-pane>
              <el-tab-pane label="第4天">定时任务补偿</el-tab-pane>
            </el-tabs>






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

        labelPosition: 'right',

      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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

  .title01{
    text-align: left;
    padding:10px 50px 20px 100px;
    font-family: Arial;
    font-style: normal;
    font-size:16px;

  }



  .el-main {

    color: #333;
    text-align: center;
    height:700px;
    margin-top: -60px;

  }
.el-form{
  margin-right: 80px;
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


