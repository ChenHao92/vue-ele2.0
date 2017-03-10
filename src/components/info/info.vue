<template>
  <div class="info">
    <div class="info-title">
      <div class="line"></div>
      <div class="text">{{ title }}</div>
      <div class="line"></div>
    </div>
    <slot name="info-content"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .info
    width: 80%
    margin: 28px auto 0 auto
    .info-title
      display: flex
      margin-bottom: 24px
      .line
        flex: 1
        position: relative
        top: -6px
        border-bottom: 1px solid rgba(255,255,255,0.2)
      .text
        margin: 0 12px
        font-size: 14px
        font-weight: 700
        line-height: 14px
</style>
