<template>
  <div>
    <v-header :seller="sellers"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link :to="{path:'/goods'}">商品</router-link></div>
      <div class="tab-item"><router-link :to="{path:'/ratings'}">评价</router-link></div>
      <div class="tab-item"><router-link :to="{path:'/sellers'}">商家</router-link></div>
    </div>
    <router-view :seller="sellers"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';

  const ERR_OK = 0;

  export default {
    data () {
      return {
        sellers: {}
      };
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.sellers = response.data;
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    //border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
      .v-link-active
        color: rgb(240, 20, 20)
</style>
