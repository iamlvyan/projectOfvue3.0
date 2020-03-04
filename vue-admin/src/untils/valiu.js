/*验证邮箱*/
export function email(value) {
    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return !reg.test(value) ? true : false;
}
/*验证密码 1.验证格式字母数字组合2.验证长度8-20位*/
export function password(value) {
    let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,20}$/;
    return !reg.test(value) ? true : false;
}
export function passwordCount(value) {
    let count = /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z].{8,20}$/;
    return !count.test(value) ? true : false;
}
/*验证验证码1.验证格式为纯数字2.验证长度为6位 */
export function code(value) {
    let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/;
    return !reg.test(value) ? true : false;
}
export function codeCount(value) {
    let count = /^[0-9A-Za-z]*.{6}$/;
    return !count.test(value) ? true : false;
}