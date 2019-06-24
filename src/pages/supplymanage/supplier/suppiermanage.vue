<template>
  <el-container>
    <el-main>
      <div class="top">
        <p class="title" style="color:#B3C0D1">供应商管理</p>
        <div class="path">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">
              供销管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              供应商
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              供应商管理
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="body"style="margin-top: 100px;font-size:20px;"><span>待实现。。。</span></div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'suppiermanage',
    data() {
      return{

      }

    },
  };
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
    position:fixed; z-index:999999; top:0px;
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

  }
  .left{
    float: left;
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

