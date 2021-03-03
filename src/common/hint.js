import { Message } from 'element-ui'

export default {
  hint (msg) { // 提示
    Message(msg)
  },
  succ (msg) { // 成功
    Message({
      message: msg,
      type: 'success'
    })
  },
  warn (msg) { // 警告
    Message({
      message: msg,
      type: 'warning'
    })
  },
  erro (msg) { // 错误
    Message.error(msg)
  }
}
