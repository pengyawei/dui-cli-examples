<template lang="pug">
div.status
  div.wrapper
    img.website-icon(draggable='false', src='@/assets/images/dui-icon.png')
    div.status-code {{CODE_MSG[code] ? code : 'ERR'}}
    div.status-label
      | {{CODE_MSG[code] ? CODE_MSG[code].label : '应用崩溃'}}
    div.status-desc
      | {{CODE_MSG[code] ? CODE_MSG[code].desc : '在运行过程中出现未知错误'}}
</template>

<script>
const CODE_MSG = {
  100: { label: '继续', desc: '请求者应当继续提出请求 服务器返回此代码表示已收到请求的第一部分 正在等待其余部分' },
  101: { label: '切换协议', desc: '请求者已要求服务器切换协议 服务器已确认并准备切换' },
  200: { label: '成功', desc: '服务器已成功处理了请求 通常 这表示服务器提供了请求的网页' },
  201: { label: '已创建', desc: '请求成功并且服务器创建了新的资源' },
  202: { label: '已接受', desc: '服务器已接受请求 但尚未处理' },
  203: { label: '非授权信息', desc: '服务器已成功处理了请求 但返回的信息可能来自另一来源' },
  204: { label: '无内容', desc: '服务器成功处理了请求 但没有返回任何内容' },
  205: { label: '重置内容', desc: '服务器成功处理了请求 但没有返回任何内容' },
  206: { label: '部分内容', desc: '服务器成功处理了部分GET请求' },
  300: { label: '多种选择', desc: '针对请求 服务器可执行多种操作 服务器可根据请求者选择一项操作 或提供操作列表供请求者选择' },
  301: { label: '永久移动', desc: '请求的网页已永久移动到新位置 服务器返回此响应时 会自动将请求者转到新位置' },
  302: { label: '临时移动', desc: '服务器目前从不同位置的网页响应请求 但请求者应继续使用原有位置来进行以后的请求' },
  303: { label: '查看其他位置', desc: '请求者应当对不同的位置使用单独的GET请求来检索响应时 服务器返回此代码' },
  304: { label: '未修改', desc: '自从上次请求后 请求的网页未修改过 服务器返回此响应时 不会返回网页内容' },
  305: { label: '使用代理', desc: '请求者只能使用代理访问请求的网页 如果服务器返回此响应 还表示请求者应使用代理' },
  307: { label: '临时重定向', desc: '服务器目前从不同位置的网页响应请求 但请求者应继续使用原有位置来进行以后的请求' },
  400: { label: '错误请求', desc: '服务器不理解请求的语法' },
  401: { label: '未授权', desc: '请求要求身份验证 对于需要登录的网页 服务器可能返回此响应' },
  403: { label: '禁止', desc: '服务器拒绝请求' },
  404: { label: '未找到', desc: '服务器找不到请求的网页' },
  405: { label: '方法禁用', desc: '禁用请求中指定的方法' },
  406: { label: '不接受', desc: '无法使用请求的内容特性响应请求的网页' },
  407: { label: '需要代理授权', desc: '此状态代码与401(未授权)类似 但指定请求者应当授权使用代理' },
  408: { label: '请求超时', desc: '服务器等候请求时发生超时' },
  409: { label: '冲突', desc: '服务器在完成请求时发生冲突 服务器必须在响应中包含有关冲突的信息' },
  410: { label: '已删除', desc: '如果请求的资源已永久删除 服务器就会返回此响应' },
  411: { label: '需要有效长度', desc: '服务器不接受不含有效内容长度标头字段的请求' },
  412: { label: '未满足前提条件', desc: '服务器未满足请求者在请求中设置的其中一个前提条件' },
  413: { label: '请求实体过大', desc: '服务器无法处理请求 因为请求实体过大 超出服务器的处理能力' },
  414: { label: '请求的URI过长', desc: '请求的URI过长 服务器无法处理' },
  415: { label: '不支持的媒体类型', desc: '请求的格式不受请求页面的支持' },
  416: { label: '请求范围不符合要求', desc: '如果页面无法提供请求的范围 则服务器会返回此状态代码' },
  417: { label: '未满足期望值', desc: '服务器未满足期望请求标头字段的要求' },
  428: { label: '要求先决条件', desc: '客户端发送HTTP请求时 如果想要请求能成功必须满足一些预设的条件' },
  429: { label: '太多请求', desc: '客户端请求服务器太过频繁' },
  431: { label: '请求头字段太大', desc: '客户端发送HTTP请求头很大' },
  500: { label: '服务器内部错误', desc: '服务器遇到错误 无法完成请求' },
  501: { label: '尚未实施', desc: '服务器不具备完成请求的功能 例如 服务器无法识别请求方法时可能会返回此代码' },
  502: { label: '错误网关', desc: '服务器作为网关或代理 从上游服务器收到无效响应' },
  503: { label: '服务不可用', desc: '服务器目前无法使用(由于超载或停机维护) 通常 这只是暂时状态' },
  504: { label: '网关超时', desc: '服务器作为网关或代理 但是没有及时从上游服务器收到请求' },
  505: { label: 'HTTP版本不受支持', desc: '服务器不支持请求中所用的HTTP协议版本' },
}
export default {
  name: 'Status',
  props: {
    code: String
  },
  data() {
    return {
      CODE_MSG
    }
  }
}
</script>

<style lang="stylus" scoped>
.status
  height 100%
  display flex
  flex-flow column nowrap
  align-items center
  justify-content center
  .wrapper
    display flex
    flex-flow column nowrap
    align-items center
    justify-content center
    user-select none
    cursor pointer
    transition opacity .4s
    margin-bottom 150px
    line-height 1
    color #000
    .website-icon
      width 150px
      height 200px
    .status-code
      font-weight 600
      font-size 60px
      margin-top 20px
    .status-label
      color #666
      font-size 14px
      margin-top 15px
    .status-desc
      color #666
      font-size 12px
      margin-top 15px
      max-width 200px
      text-align center
      line-height 1.4
</style>
