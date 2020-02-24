import service from "@/utils/request.js";
/**
 *获取验证码
 * 
 */
export function Logincode(value){
    console.log(value);
    service.request({
        method: 'post',
        url: '../devApi/Login/getSms',
        data: {
            telephone:value
          } 
    });
}
/**
 * 获取用户角色
 */

/**
 * 登陆
 */

/**
 * 注册
 */