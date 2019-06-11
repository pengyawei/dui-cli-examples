<template lang="pug">
div.example
  div.wrapper
    img.website-icon(draggable='false', src='@/assets/images/dui-icon.png')
    div.desc Example
</template>

<script>
export default {
  name: 'Example'
}
</script>

<style lang="stylus" scoped>
.example
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
    .desc
      font-weight 600
      font-size 20px
      margin-top 20px
</style>
