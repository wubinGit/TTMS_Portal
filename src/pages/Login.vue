<template>
  <v-app >
    <v-content >
      <div :class="{'distributorImg':!isEmp ,'empImg':isEmp}">
      <v-container class="loginDialog" fluid fill-height >
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title> Travel Manage System
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <el-switch
                  v-model="isEmp"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="username" label="用户名" type="text"/>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="password"
                    label="密码"
                    id="password"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'text' : 'password'"
                 ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" v-show="isEmp" @click="empDoLogin"
                         v-loading.fullscreen.lock="fullscreenLoading">职工登录</v-btn>
                  <v-btn color="primary"  v-show="!isEmp" @click="distributorDoLogin"
                         v-loading.fullscreen.lock="fullscreenLoading">分销商登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      </div>
    </v-content>
    <v-dialog v-model="dialog" width="300px">
      <v-alert icon="warning" color="error" :value="true" v-text="errorTip">
      </v-alert>
    </v-dialog>
  </v-app>

</template>

<script>
export default {
	name: "Login",
  data: () => ({
    username: "",
    password: "",
    errorTip:"",
    dialog: false,
    e1:false,
    isEmp:true,  //是否是职员
    fullscreenLoading:"",

  }),
  methods: {
    empDoLogin() {
      if (!this.username || !this.password) {
        this.errorTip = "用户名和密码不能为空";
        this.dialog = true;
        return false;
      }
      this.fullscreenLoading = true;
      this.$http.post("/login", this.$qs.stringify({
        username: this.username,
        password: this.password
      })).then((resp)=>{
        this.fullscreenLoading = false;
        this.$router.push("/");
        //保存
       localStorage.setItem("Modules",JSON.stringify(resp.data));
      }).catch((error)=>{
        this.fullscreenLoading = false;
        this.errorTip = error.message;
        this.dialog = true;
        localStorage.setItem("Modules",JSON.stringify("[]"));
      });
    },
    distributorDoLogin(){
      if (!this.username || !this.password) {
        this.errorTip = "用户名和密码不能为空";
        this.dialog = true;
        return false;
      }
      this.fullscreenLoading = true;
      this.$http.post("/distributorEntry/login", this.$qs.stringify({
        distributorname: this.username,
        password: this.password
      })).then((resp)=>{
        this.fullscreenLoading = false;
        localStorage.setItem("curDistributor",JSON.stringify(resp.data));
        this.$router.push("/DistributorEntry/DistributorInterface");
      }).catch((error)=>{
        this.fullscreenLoading = false;
        this.errorTip = error.message;
        this.dialog = true;
      });
    },
    }
};
</script>

<style>
  html,body {

    overflow:hidden;

    margin:0px;

    width:100%;

    height:100%;

  }
  .distributorImg{
    background-image: url("../assets/DistributorLogin.jpg");
    margin-top: -60px;
    height: 100%;
    width: 100%;
    background-size:100% 100%;
    transition: background-position .5s;
  }
  .empImg{
    background-image: url("../assets/EmpLogin.jpg");
    margin-top: -60px;
    height: 100%;
    width: 100%;
    background-size:100% 100%;
    transition: background-position .5s;
    z-index: 2;
  }

  .loginDialog{
    z-index: 11;
  }
</style>
