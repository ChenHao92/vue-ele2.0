<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="seller">
      <div class="content-part">
        <h1 class="title">{{seller.name}}</h1>
        <div class="sell-info">
          <star :size="36" :score="seller.score"></star>
          <span class="sell-count">月售{{seller.sellCount}}单</span>
        </div>
      </div>
      <div class="content-part">
        <div class="part">
          <div class="item">起送价</div>
          <div class="num">{{seller.minPrice}}<p>元</p></div>
        </div>
        <div class="part">
          <div class="item">商家配送</div>
          <div class="num">{{seller.deliveryPrice}}</div>
        </div>
        <div class="part">
          <div class="item">平均配送时间</div>
          <div class="num">{{seller.deliveryTime}}</div>
        </div>
      </div>
      <split></split>
      <div class="content-part">
        <h1 class="title">公告与活动</h1>
        <div class="bulletin">{{seller.bulletin}}</div>
      </div>
      <div class="content-part">
        <ul class="supports">
          <li class="support" v-for="support in seller.supports">
            <span class="icon" :class="iconType[support.type]"></span>
            <span class="description">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="content-part">
        <div class="title">商家实景</div>
        <div class="pics">
          <span class="pic" v-for="pic in seller.pics"><img :src="pic"></span>
        </div>
      </div>
      <split></split>
      <div class="content-part">
        <div class="title">商家信息</div>
        <ul class="infos">
          <li class="info" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';
  import BScroll from 'better-scroll';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        iconType: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      };
    },
    components: {
      star,
      split
    },
    created () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.sellerWrapper, {});
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.seller-wrapper
  position: absolute
  top: 174px
  left: 0
  bottom: 0
  overflow: hidden
  .seller
    .content-part
      padding: 18px
      .title
        font-size: 14px
        line-height: 1
        color: rgb(7,17,27)
        font-weight: 700
        margin-bottom: 8px
      .sell-info
        .star
          vertical-align: top
          display: inline-block
          margin-right: 8px
        .sell-count
          font-size: 10px
          line-height: 18px
          color: rgb(77,85,93)
      .part
        width: 32%
        display: inline-block
        text-align: center
        .item
          font-size: 10px
          line-height: 1
          color: rgb(147,153,159)
          margin-bottom: 4px
        .num
          font-size: 24px
          line-height: 1
          font-weight: 200
          color: rgb(7,17,27)
          p
            display: inline-block
            font-size: 10px
      .bulletin
        padding: 0 12px
        font-size: 12px
        line-height: 2
        font-weight: 200
        color: rgb(240,20,20)
      .supports
        .support
          padding: 16px 12px
          &:first-child
            padding-top: 0
          &:last-child
            padding-bottom: 0
          .icon
            vertical-align: top
            display: inline-block
            width: 16px
            height: 16px
            background-size: 16px 16px
            background-repeat: no-repeat
            margin-right: 6px
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .description
            font-size: 12px
            line-height: 16px
            font-weight: 200
            color: rgb(7,17,27)
      .pics
        padding-top: 4px
        .pic
          margin-right: 6px
          img
            width: 31%
            height: 90px
            margin-bottom: 18px
      .infos
        .info
          margin: 0
          padding: 16px 12px
          font-size: 12px
          line-height: 16px
          font-weight: 200
          color: rgb(7,17,27)
</style>
