<!--
  @Author: ch
  @Date:   2017-03-06 13:45:30
  @Last Modified by:   ch
  @Last Modified time: 2017-03-06 13:45:30
-->
<template>
  <div v-show="showFlag" class="food-detail" transition="food" ref="foodDetail">
    <div class="content">
      <div class="food-content">
        <div class="food-image">
          <img :src="food.image" alt="food-image">
          <div class="back">
            <i class="icon-arrow_lift" @click="back"></i>
          </div>
        </div>
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <div class="now-price"><span>¥</span>{{food.price}}</div>
            <div class="old-price" v-if="food.oldPrice"><span>¥</span>{{food.oldPrice}}</div>
            <div class="cart-control-wrapper">
              <cart-control :food="food" v-show="food.count && food.count>0"></cart-control>
              <div class="add-to-cartControl" v-show="!food.count || food.count===0" @click="addFood($event)" transition="fade">加入购物车</div>
            </div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="description">
        <div class="title">商品介绍</div>
        <div class="info">{{food.info}}</div>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <rating-select :select-type="selectType" :is-only-content="isOnlyContent" :desc="desc" :ratings="food.ratings"></rating-select>
        <ul class="ratings">
          <li class="rating" v-for="rating in showRatings" v-show="selectType === 2 || rating.rateType === selectType">
            <div class="rating-info">
              <span class="time">{{rating.rateTime | formatDate}}</span>
              <span class="user-name">{{rating.username}}</span>
              <img class="user-avatar" :src="rating.avatar">
            </div>
            <div class="rating-content">
              <i :class="classType[rating.rateType]"></i>
              <span>{{rating.text}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartControl from 'components/cartControl/cartControl';
  import split from 'components/split/split';
  import ratingSelect from 'components/ratingSelect/ratingSelect';
  import {formatDate} from 'common/js/date';

  const ALL = 2;
  // const NEGATIVE = 1;
  // const POSITIVE = 0;

  export default {
    props: {
      food: {
        type: Object,
        default: []
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        isOnlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        classType: ['icon-thumb_up', 'icon-thumb_down']
      };
    },
    computed: {
      showRatings () {
        if (!this.showFlag) {
          return;
        }
        if (!this.isOnlyContent) {
          return this.food.ratings;
        } else {
          return this.food.ratings.filter((rating) => {
            return rating.text !== '';
          });
        }
      }
    },
    methods: {
      show () {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodDetail, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      back () {
        this.showFlag = false;
      },
      addFood (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      }
    },
    components: {
      cartControl,
      split,
      ratingSelect
    },
    events: {
      'ratingTypeChanged': function (type) {
        this.selectType = type;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodDetail, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      'isOnlyContentChanged': function (value) {
        this.isOnlyContent = value;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodDetail, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food-detail
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    background: #fff
    z-index: 30
    &.food-transition
      transition: all 0.3s linear
      transform: translate3d(0,0,0)
    &.food-enter, &.food-leave
      transform: translate3d(100%,0,0)
    .food-content
      .food-image
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 15px
          left: 0
          .icon-arrow_lift
            padding: 12px
            font-size: 20px
            color: #fff
      .content
        padding: 18px
        .title
          font-size: 14px
          line-height: 14px
          font-weight: 700
          margin-bottom: 8px
          color: rgb(7,17,27)
        .detail
          margin-bottom: 18px
          font-size: 10px
          line-height: 10px
          color: rgb(147,153,159)
          .sell-count
            margin-right: 12px
        .price
          position: relative
          font-size: 10px
          font-weight: 700
          padding-bottom: 18px
          .now-price
            display: inline-block
            vertical-align: top
            font-size: 14px
            line-height: 24px
            color: rgb(240,20,20)
            margin-right: 5px
          .old-price
            display: inline-block
            line-height: 24px
            color: rgb(147,153,159)
            text-decoration: line-through
          .cart-control-wrapper
            display: inline-block
            position: absolute
            right: 0
            height: 24px
            width: 75px
            .cartControl
              position: absolute
              right: 0
            .add-to-cartControl
              position: absolute
              right: 0
              width: 74px
              height: 12px
              padding: 6px
              text-align: center
              border-radius: 12px
              background-color: rgb(0,160,220)
              font-size: 10px
              line-height: 12px
              color: #fff
    .description
      padding: 18px
      .title
        font-size: 14px
        line-height: 14px
        font-weight: 500
        color: rgb(7,17,27)
        margin-bottom: 6px
      .info
        width: 100%
        margin: 0
        padding: 0 8px
        box-sizing: border-box
        font-size: 12px
        line-height: 24px
        font-weight: 200
        color: rgb(77,85,93)
    .rating
      padding: 18px
      .title
        font-size: 14px
        line-height: 14px
        font-weight: 500
        color: rgb(7,17,27)
        margin-bottom: 6px
      .rating-select
        margin-top: 12px
      .ratings
        .rating
          width: 100%
          padding: 16px 0
          border-bottom: 1px solid rgba(7,17,27,0.1)
          .rating-info
            position: relative
            height: 12px
            font-size: 10px
            line-height: 12px
            padding-bottom: 6px
            color: rgb(147,153,159)
            .time
              position: absolute
              left: 0
            .user-name
              position: absolute
              right: 18px
            .user-avatar
              position: absolute
              right: 0
              width: 12px
              height: 12px
              border-radius: 50%
          .rating-content
            font-size: 0
            .icon-thumb_up
              font-size: 12px
              line-height: 24px
              margin-right: 4px
              color: rgb(0,160,220)
            .icon-thumb_down
              font-size: 12px
              line-height: 24px
              margin-right: 4px
              color: rgb(147,153,159)
            span
              font-size: 12px
              color: rgb(7,17,27)
              line-height: 16px
</style>
