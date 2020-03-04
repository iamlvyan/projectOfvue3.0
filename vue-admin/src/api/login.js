import server from '@/untils/request'
/**
 * 获取验证码
 */
export function GetSms(data) {
    server.request({
        method: 'post',
        url: '/getSms/',
        data
    })
}
/**
 * 获取用户角色
 */
/**
 * 登录
 */
/**
 * 注册
 */