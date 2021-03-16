<template>
    <div class="login_container">
        <!-- 登录块 -->
        <div class="login_box"> 
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt/>
            </div>
            <!-- 表单区域 -->
            <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm"  class="login_form" label-width="0">
                <!-- 用户名 -->
                <el-form-item prop="username" >
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icondenglu"></el-input>
                </el-form-item>  

                <!-- 密码 -->
                <el-form-item prop="password" >
                    <el-input v-model="loginForm.password" prefix-icon="iconfont iconmima" type = "password"></el-input>
                </el-form-item>  

                <!-- 按钮 -->
                 <el-form-item class="btns">
                    <el-button type="primary" @click="login">提交</el-button>
                     <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>  

            </el-form>
        </div> 
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 表单数据
            loginForm:{
                username:"admin",
                password:"123456"
            },
            //验证规则
            loginRules:{
                //校验用户名
                username:[
                    { required: true, message: '用户名为必填项', trigger: 'blur' },//必填项验证
                    { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' } //长度验证
                ],
                //检验密码
                password:[
                    { required: true, message: '用户密码为必填项', trigger: 'blur' },//必填项验证
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' } //长度验证
                
                ],
            },
        };
    },
    methods:{
        //重置表单内容
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },
        //登陆方法
        login(){
            //1.验证校验规则
            this.$refs.loginFormRef.validate(async valid =>{
                if(!valid) return; //验证失败
                const {data:res} = await this.$http.post("login",this.loginForm);//访问后台
                if(res.flag=="ok"){
                    //成功提示
                    this.$message.success("登陆成功");
                    //页面路由跳转
                    this.$router.push({path:"/home"});
                    //存储user对象
                    window.sessionStorage.setItem("user",res.user); 
                }
                else{
                    //错误提示
                    this.$message.error("登陆失败");
                }
            });
        }
        
    },
        
}
</script>
<style  scoped>

.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_box .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%; 
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #0ee;
}
img {
      width: 100%;
      height: 100%;
      border-radius: 50%; 
      background-color: #eee;
    }
  
  .btns {
    display: flex;
    justify-content: flex-end; 
  }
  .login_form {
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }


</style>