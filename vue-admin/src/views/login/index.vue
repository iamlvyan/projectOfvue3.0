<template>
    <div class="login-page">
        <div class="login-content">
            <ul class="tips">
                <li v-for="item in topList" :key=item.id :class="{ active: item.current }" @click="toggleMuen(item)">{{ item.text }}</li>
            </ul>
            <!--表单-->
           <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="medium" class="form">
                <el-form-item prop="user" class='form-input'>
                    <label for="user">邮箱</label>
                    <el-input type="text" id="user" v-model.trim="ruleForm.user" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="pass" class='form-input'>
                    <label for="password">密码</label>
                    <el-input type="password" id="password" v-model.trim="ruleForm.pass" autocomplete="off" maxlength=20 minlength=8></el-input>
                </el-form-item>
                <el-form-item  prop="checkPass" class='form-input' v-if="model=='register'">
                    <label for="checkpass">确认密码</label>
                    <el-input type="password" id="checkpass" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="code" class='form-input'>
                    <label for="code">验证码</label>
                    <el-row :gutter="15">
                        <el-col :span="14">
                            <el-input v-model.trim="ruleForm.code" id="code" maxlength=6 minlength=6></el-input>
                        </el-col>
                        <el-col :span="10">
                            <el-button type="success" class="button" @click="getSms()">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                
                <el-form-item class='form-input'>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="button" :disabled="buttonDisabled">{{model==="login"?"登录":"注册"}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {GetSms} from '@/api/login'
import {email,codeCount,code,password,passwordCount} from '@/untils/valiu';
export default {
    name: 'login',
     data() {
         //验证验证码
         var checkCode = (rule, value, callback) => {
        if (value==='') {
           callback(new Error('验证码不能为空'));
        }
        else if(code(value)){
            callback(new Error('验证码格式不正确'));
        }
        else if(codeCount(value)){
            callback(new Error('验证码为6位'));
        }
        else{
              callback();
            }
      };
      //验证用户名
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if(email(value)){
            callback(new Error('邮箱格式不正确'));
        }else {
          callback();
        }
      };
      //验证密码
      var validatePassword = (rule, value, callback) => {
          
         
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else if(password(value)){
            callback(new Error('密码格式为字母数字组合'));
        }
        else if(passwordCount(value)){
            callback(new Error('密码长度为8-20位'));
        }
        else{
          callback();
        }};
        //重复密码
         var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
         model: 'login',
         buttonDisabled:true,
        topList: [
            { text: '登录',current:true,type:'login' },
            { text: '注册',current:false,type:'register' }
        ],
        ruleForm: {
          user: '',
          pass: '',
          code: '',
          checkPass: ''
        },
        rules: {
          user: [
            { validator: validateUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          code: [
            { validator: checkCode, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        toggleMuen(data){
            this.model=data.type;
            this.topList.forEach(element=>{element.current=false});
            data.current=true;
            this.$refs['ruleForm'].resetFields();
        },
        /**
         * 获取验证码
         */
        getSms(){
          /*  if(this.ruleForm.user==''){
            this.$message({
            showClose: true,
            message: data.message,
            type: 'error'
          }); 
          } */
          GetSms({username:this.ruleForm.user,module:this.model});
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