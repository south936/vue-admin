<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ 'current': item.current }"
          @click="toggleMneu(item)"
        >
          {{ item.txt }}
        </li>
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
          <el-input
            type="text"
            v-model="ruleForm.telephone"
            autocomplete="off"
            maxlength="11"
            minlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-from">
          <label>密码</label>
          <el-input
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-from" v-if="model==='register'">
          <label>确认密码</label>
          <el-input
            type="text"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label>手机验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input type="text" v-model="ruleForm.code" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="loginCloneClick()">获取验证码</el-button>
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
import {Logincode} from "@/api/login.js";
import axios from "axios";
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validatetelephone,
  validatepassword,
  validatecode
} from "@/utils/validate";
export default {
  name: "login",
  setup(prop, { refs }) {
    // 验证手机号码格式
    let telephoneNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号码不能为空"));
      } else {
        if (validatetelephone(value)) {
          callback(new Error("手机号码不正确"));
        }
        callback();
      }
    };
    //验证密码格式
    let validatePass = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatepassword(value)) {
        callback(new Error("密码为6至20位数字加字母"));
      } else {
        callback();
      }
    };
    //验证确认密码
    let validatePasswords = (rule, value, callback) => {
      //如果模块值为login,直接通过
      if (model.value === "login") {
        callback();
      }
      //过滤后的数据
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //验证码格式
    let checkAge = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (validatecode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    /*
     *声明数据
     */
    //这里放置data数据,生命周期,自定义的函数
    const menuTab = reactive([
      { txt: "登录", current: true, code: "login" },
      { txt: "注册", current: false, code: "register" }
    ]);
    //模块值
    const model = ref("login");
    // 表单绑定数据
    const ruleForm = reactive({
      telephone: "",
      password: "",
      code: ""
    });
    //表单的验证
    const rules = reactive({
      telephone: [{ validator: telephoneNumber, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: checkAge, trigger: "blur" }]
    });
    /*
     * 声明函数
     */
    const toggleMneu = data => {
      menuTab.forEach((elem, index) => {
        elem.current = false;
      });
      //修改模块值(登录/注册)
      model.value = data.code;
      //高光
      data.current = true;
    };
    const loginCloneClick = (() => {
       Logincode(ruleForm.telephone);
    })
    //  表单函数
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    /*
     *生命周期
     */
    //挂载之后
    onMounted(() => {
     
    });
    return {
      menuTab,
      model,
      ruleForm,
      rules,
      toggleMneu,
      submitForm,
      loginCloneClick
    };
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
