<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': this.totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'highlight': this.totalCount > 0}"></i>
          </div>
          <div class="num" v-show="this.totalCount > 0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{'highlight': this.totalCount > 0}">¥ {{ totalPrice }}</div>
        <div class="desc">另需配送费 ¥ {{ deliveryPrice }}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{'highlight': this.totalPrice - this.minPrice >= 0}" @click.stop.prevent="pay">
           {{ payDesc }}
        </div>
      </div>
    </div>
    <div class="ball-container"></div>
    <div class="shopcard-list"  v-show="listShow" transition="fold">
      <div class="list-header border-1px">
        <span class="title">购物车</span>
        <span class="clear" @click="clear">清空</span>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul class="list-content">
          <li v-for="food in selectFoods" class="food border-1px">
            <span class="name">{{ food.name }}</span>
            <div class="price">
              <span class="nowPrice"><p>¥ </p>{{ food.price*food.count }}</span>
              <cart-control :food="food"></cart-control>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="list-mask" v-show="listShow" transition="fade" @click="hideList"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartControl from 'components/cartControl/cartControl';
  import BScroll from 'better-scroll';

  export default {
    data () {
      return {
        fold: true
      };
    },
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    computed: {
      totalPrice () {
        let totalPrice = 0;
        this.selectFoods.forEach((food) => {
          totalPrice += food.price * food.count;
        });
        return totalPrice;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `¥ ${this.minPrice}起送`;
        } else if ((this.minPrice - this.totalPrice) > 0) {
          return `还差 ¥ ${(this.minPrice - this.totalPrice)}起送`;
        } else {
          return '去结算';
        }
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.foodsScroll) {
              this._initScroll();
            } else {
              this.foodsScroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      _initScroll () {
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true
        });
      },
      toggleList () {
        if (this.totalCount) {
          this.fold = !this.fold;
        }
      },
      clear () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList () {
        this.fold = true;
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`请支付${this.totalPrice}元`);
      }
    },
    components: {
      cartControl
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    bottom: 0
    left: 0
    z-index: 50
    height: 48px
    width: 100%
    .content
      position: absolute
      left: 0
      bottom: 0
      display: flex
      height: 48px
      width: 100%
      font-size: 0
      color: rgba(255,255,255,0.4)
      .content-left
        flex: 1
        height: 48px
        background: #141d27
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          width: 56px
          height: 56px
          margin: 0 12px
          padding: 6px
          border-radius: 50%
          box-sizing: border-box
          background: #141d27
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 18px
            border-radius: 12px
            font-size: 9px
            font-weight: 700
            text-align: center
            color: rgb(255,255,255)
            background-color: rgb(240,20,20)
            box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4)
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: #2b343c
            text-align: center
            &.highlight
              background-color: rgb(0,160,220)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              &.highlight
                color: rgb(255,255,255)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          padding-right: 12px
          font-size: 16px
          font-weight: 700
          line-height: 24px
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          &.highlight
            color: rgb(255,255,255)
        .desc
          display: inline-block
          vertical-align: top
          font-size: 12px
          line-height: 24px
          padding: 12px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          background: #2b333b
          text-align: center
          font-size: 16px
          color: rgba(255,255,255,0.4)
          font-weight: 700
          &.highlight
            background-color: #00b43c
            color: rgb(255,255,255)
    .shopcard-list
      z-index: -1
      position: absolute
      width: 100%
      left: 0
      bottom: 48px
      background-color: #fff
      box-sizing: border-box
      &.fold-transition
        transition: all 0.5s
        transform: translate3d(0, 0, 0)
      &.fold-enter, &.fold-leave
        transform: translate3d(0, 100%, 0)
      .list-header
        height: 40px
        width: 100%
        padding: 0 18px
        box-sizing: border-box
        background-color: #f3f5f7
        border-1px(rgba(7,17,27,0.1))
        .title
          font-size: 14px
          font-weight: 400
          color: rgba(7,17,27,1)
          line-height: 40px
        .clear
          font-size: 12px
          color: rgb(0,160,220)
          line-height: 40px
          float: right
      .foods-wrapper
        width: 100%
        padding: 0 18px
        box-sizing: border-box
        max-height: 217px
        overflow: hidden
        .food
          height: 24px
          width: 100%
          padding: 12px 0
          border-1px(rgba(7,17,27,0.1))
          .name
            font-size: 14px
            color: rgb(7,17,27)
            line-height: 24px
            font-weight: 700
          .price
            position: absolute
            right: 0
            display: inline-block
            font-size: 0
            .nowPrice
              font-size: 14px
              font-weight: 700
              line-height: 24px
              margin-right: 12px
              color: rgb(240,20,20)
              p
                display: inline-block
                font-size: 10px
            .cartControl
              vertical-align: top
              display: inline-block
  .list-mask
    position: fixed
    top: 0
    left: 0
    height: 100%
    width: 100%
    z-index: 40
    blur: 10px
    &.fade-transition
      transition: all .5s
      opacity: 1
      background: rgba(7,17,27,0.6)
    &.fade-enter, &.fade-leave
      opacity: 0
      background: rgba(7,17,27,0)
</style>
