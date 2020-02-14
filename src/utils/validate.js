// 过滤特殊字符
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
//手机号码验证
export function validatetelephone(value) {
    let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    return !reg.test(value) ? true : false;
}
//密码验证
export function validatepassword(value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value) ? true : false;
}
//验证验证码
export function validatecode(value) {
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value) ? true : false;
}
