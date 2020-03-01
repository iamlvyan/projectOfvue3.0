<template>
    <div class="login-page">
        <div class="login-content">
            <ul class="tips">
                <li v-for="item in topList" :class="{ active: item.current }" @click="toggleMuen(item)">{{ item.text }}</li>
            </ul>
            <!--表单-->
           <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="medium" class="form">
                <el-form-item prop="user" class='form-input'>
                    <label>邮箱</label>
                    <el-input type="text" v-model.trim="ruleForm.user" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="pass" class='form-input'>
                    <label>密码</label>
                    <el-input type="password" v-model.trim="ruleForm.pass" autocomplete="off" maxlength=20 minlength=8></el-input>
                </el-form-item>
                <el-form-item prop="code" class='form-input'>
                    <label>验证码</label>
                    <el-row :gutter="15">
                        <el-col :span="14">
                            <el-input v-model.number="ruleForm.code" maxlength=6 minlength=6></el-input>
                        </el-col>
                        <el-col :span="10">
                            <el-button type="success" class="button">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                
                <el-form-item class='form-input'>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="button">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login',
     data() {
         //验证验证码
         var checkCode = (rule, value, callback) => {
             let reg = /^[0-9]*$/ ;
             let count =  /^[0-9]*.{6}$/ ;
        if (value==='') {
           callback(new Error('验证码不能为空'));
        }
        else if(!reg.test(value)){
            callback(new Error('验证码格式不正确'));
        }
        else if(!count.test(value)){
            callback(new Error('验证码为6位数字'));
        }
        else{
              callback();
            }
      };
      //验证用户名
      var validateUser = (rule, value, callback) => {
          let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if(!reg.test(value)){
            callback(new Error('邮箱格式不正确'));
        }else {
          callback();
        }
      };
      //验证密码
      var validatePassword = (rule, value, callback) => {
          let reg = /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]/;
          let count = /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{8,20}/;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!reg.test(value)){
            callback(new Error('密码格式为字母数字组合'));
        }else if(!count.test(value)){
            callback(new Error('密码长度为8-20位'));
        }
        else{
          callback();
        }};
      return {
        topList: [
            { text: '登录',current:true },
            { text: '注册',current:false }
        ],
        ruleForm: {
          user: '',
          pass: '',
          code: ''
        },
        rules: {
          user: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          code: [
            { validator: checkCode, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        toggleMuen(data){
            this.topList.forEach(element=>{element.current=false});
            data.current=true
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    
    }
}
</script>
<style lang="scss" scoped>
.login-page{
    height: 100vh;
    background-color: #344a5f;
   .login-content{
       background-color: rgba(255, 255, 255, .2);
       border-radius: 5px;
       padding: 20px 50px;
       position:absolute;
       width: 335px;
       top: 50%;
       left: 50%;
       transform: translate(-50%,-50%);
       li{
           display:inline-block;
           padding: 10px 30px;
           color:#fff;
           cursor: pointer;
       }
       .active{
           background-color:rgba(0,0,0,.2);
           border-radius:2px;
       }
       .form{
           margin-top: 25px;
           label{
               color:#fff;
               display: block;
               font-size: 14px;
           }
        .form-input{
            margin-bottom: 25px;
        }
        .button{
            width: 100%;
        }
       }
   }
}
</style>