export default {
  rules () {
    return {
      username: [
        { validator: checkName, trigger: 'blur' }
      ],
      phone: [
        { validator: checkPhone, trigger: 'blur' }
      ],
      password: [
        { validator: checkPassword, trigger: 'blur' }
      ],
      status: [
        { validator: checkStatus, trigger: 'blur' }
      ]
    }
  }

}

function checkStatus (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入密码！'))
    return
  }
  let len = value.length
  if (len < 6 || len > 20) {
    callback(new Error('密码至少需要6个字符，最多20个字符！'))
  } else {
    callback()
  }
}

function checkPassword (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入密码！'))
    return
  }
  let len = value.length
  if (len < 6 || len > 20) {
    callback(new Error('密码至少需要6个字符，最多20个字符！'))
  } else {
    callback()
  }
}

function checkName (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入用户名！'))
    return
  }
  let len = value.length
  if (len < 2 || len > 18) {
    callback(new Error('用户名至少需要两个字符，最多18个字符！'))
  } else {
    callback()
  }
}

function checkPhone (rule, value, callback) {
  if (value === '' || value == null) {
    callback(new Error('请输入手机号！'))
    return
  }
  if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
    callback(new Error('请输入正确的手机号！'))
  } else {
    callback()
  }
}
