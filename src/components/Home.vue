<template>
    <!-- 引入container布局 -->
   <el-container class="home-container">
       <!-- 头部 -->
  <el-header>
      <div>
          <img src="../assets/logo.jpg" alt />
      </div>
      <span>个人运动平台</span>
      <el-button type = "info" @click="logout">安全退出</el-button>
  </el-header>
    <!-- 主体 -->
  <el-container>
      <!-- 侧边栏 -->
    <el-aside width="200px"><h5></h5>
    <el-menu
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <!-- 一级菜单 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>

        <!-- 二级菜单 -->
        <el-menu-item index="1-1">
          <template slot="title">
          <i class="el-icon-location"></i>
          <span>11111</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu></el-aside>
    <!-- 主体内容 -->
    <el-main>Main</el-main>
  </el-container>
</el-container>
    
</template>
<script>
export default {
  data(){
    return{
      //菜单列表
      menuList:[],
    }
  },
  //on Load 页面一加载就触发
  created(){
    //查询menuList
    this.getMenuList()
  },
  methods: {
    logout() {
      //清除session
      window.sessionStorage.clear();
      //回到首页
      this.$router.push("/login");
    },
    //获取导航菜单方法
    async getMenuList(){
      const {data:res} = await this.$http.get("menus");
      console.log(res);
      if(res.flag !=200){
        //访问失败
        return this.$message.error("获取列表失败！！！");
      }
      //访问成功之后的数据回填
      this.menuList = res.menus;

    },
  },
};
</script>
<style  scoped>
/* 布局器样式 */
.home-container {
  height: 100%;
}
/* 头部样式 */
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between; /*左右贴边*/
  padding-left: 0%; /*左边界*/
  color: #fff;
  font-size: 20px;
  align-items: center;
}
.el-header.span {
  margin-left: 15px;
}
.el-header.div {
  display: flex;
  align-items: center;
}
/* 侧边栏样式 */
.el-aside {
  background-color: #333744;
}
/* 主题样式 */
.el-main {
  background-color: #eaedf1;
}
img {
  width: 55px;
  height: 55px;
}
</style>