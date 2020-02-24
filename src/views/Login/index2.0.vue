<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{'current':item.current}"
          @click="toggleMneu(item)"
        >{{item.txt}}</li>
      </ul>
      <!-- 表单start -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="telephone" class="item-from">
          <label>手机号码</label>
          <el-input type="text" v-model="ruleForm.telephone" autocomplete="off" maxlength="11" minlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-from">
          <label>密码</label>
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-from" v-if="model==='register'">
          <label>确认密码</label>
          <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label>手机验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
                <el-input type="text" v-model="ruleForm.code"  maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {stripscript,validatetelephone,validatepassword,validatecode} from "@/utils/validate";
export default {
  name: "login",
  data() {

    // 验证手机号码格式
    var telephoneNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号码不能为空"));
      } else {
        if(validatetelephone(value)){
        callback(new Error("手机号码不正确"));
        }
        callback();
      }
    };
    //验证密码格式
    var validatePass = (rule, value, callback) => {
      this.ruleForm.password=stripscript(value);
      if (value === '') {
          callback(new Error('请输入密码'));
        } else if(validatepassword(value)){
          callback(new Error('密码为6至20位数字加字母'));
        }else  {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
    };
    //验证确认密码
    var validatePasswords = (rule, value, callback) => {
      this.ruleForm.passwords=stripscript(value);
      if (value === '') {
          callback(new Error('请输入密码'));
        }else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else  {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
    };
    //验证码格式
    var checkAge = (rule, value, callback) => {
      
      if (value ==="") {
        return callback(new Error("请输入验证码"));
      }else if(validatecode(value)){
        return callback(new Error("验证码格式有误"));
      }else{
        callback();
      }
      console.log( this.ruleForm.code)
    };
    return {
      ruleForm: {
        telephone: "",
        password: "",
        code: ""
      },
      //模块值
      model:"register",
      rules: {
        telephone: [{ validator: telephoneNumber, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: checkAge, trigger: "blur" }]
      },
      menuTab: [
        { txt: "登录", current: true,code:'login' },
        { txt: "注册", current: false,code:'register' }
      ]
    };
  },
  created() {},
  //挂载完成后执行
  mounted() {},
  methods: {
    toggleMneu(data) {
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      //高光
      this.model=data.code;
      data.current = true;
    },
    //表单函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  padding-top: 30px;
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;

  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
}
</style>