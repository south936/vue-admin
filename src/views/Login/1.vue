<template>
    <div class="phonea">
        <span>申报手机号</span>
        <input
          class="phone input-style "
          :class="{'err-input' : phone.err}"
          v-model="phone.val"
          type="text"
          placeholder="请输入手机号"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="11"
          @blur="test()"
        >
        <span v-show="hintShow">{{hint}}</span>
      </div>
<!-- 兑换手机号码 -->
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      hintShow: false,  // 提示语显示
      hint: '手机号码错误', // 提示语
      telShow: false,  // 提示语显示
      tel: '手机号码错误', // 提示语

      /*
      *  val 为值,err为错误显示, test检验信息
      * */
      phone: {
        val: '',
        err: false,
        pass: false,
      },
      phone1: {
        val: '',
        err: false,
        pass: false,
      }
    };
  },
  methods: {
    // 手机号码验证
    test: function () {
      const reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (this.phone.val == '' || this.phone.val.length <= 10 || !reg.test(this.phone.val)) {
        this.hintShow = true
        this.hint = '手机号码错误'
        this.err = true
        return false

      } else {
        this.hintShow = false
        this.hint = '手机号码正确'
        this.err = false
        return true
      }
    },
    teltest () {
      const reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (this.phone1.val == '' || this.phone1.val.length <= 10 || !reg.test(this.phone1.val)) {
        this.telShow = true
        this.tel = '手机号码错误'
        this.err = true
        return false

      } else {
        this.telShow = false
        this.tel = '手机号码正确'
        this.err = false
        return true
      }
    },
  }
}
</script>