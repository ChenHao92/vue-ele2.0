<template>
  <div class="ratings-wrapper" ref="ratings">
    <div class="ratings">
      <div class="total">
        <div class="left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="right">
          <div class="score">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="num">{{seller.serviceScore}}</span>
          </div>
          <div class="score">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="num">{{seller.foodScore}}</span>
          </div>
          <div class="score">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select :select-type="selectType"
                     :is-only-content="isOnlyContent"
                     :desc="desc"
                     :ratings="ratings">
      </rating-select>
      <ul class="comments">
        <li v-for="rating in showRatings" class="comment" v-show="selectType === 2 || selectType === rating.rateType">
          <div class="avatar">
            <img :src="rating.avatar">
          </div>
          <div class="content">
            <div class="info">
              <div class="user-info">
                <span class="user-name">{{rating.username}}</span>
                <span class="time">{{rating.rateTime | formatDate}}</span>
              </div>
              <div class="delivery-info">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery-time" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
            </div>
            <div class="text">{{rating.text}}</div>
            <div class="foods">
              <i :class="classType[rating.rateType]"></i>
              <span class="recommend" v-for="recommend in rating.recommend">
                {{recommend}}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import ratingSelect from 'components/ratingSelect/ratingSelect';
  import {formatDate} from 'common/js/date';

  const ERR_OK = 0;
  const ALL = 2;
  // const NEGATIVE = 1;
  // const POSITIVE = 0;

  export default {
    props: {
      seller: {
        type: Object,
        default: []
      }
    },
    created () {
      this.$http.get('api/ratings').then((response) => {
        response = response.body;
        if (ERR_OK === response.errno) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        isOnlyContent: false,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        },
        classType: ['icon-thumb_up', 'icon-thumb_down']
      };
    },
    computed: {
      showRatings () {
        if (!this.isOnlyContent) {
          return this.ratings;
        } else {
          return this.ratings.filter((rating) => {
            return rating.text !== '';
          });
        }
      }
    },
    components: {
      star,
      split,
      ratingSelect
    },
    events: {
      'ratingTypeChanged': function (type) {
        this.selectType = type;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
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
            this.scroll = new BScroll(this.$refs.ratings, {
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
  .ratings-wrapper
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    overflow: hidden
    .ratings
      .total
        display: flex
        margin: 18px 0
        .left
          flex: 0 0 137.5px
          width: 137.5px
          padding: 0
          text-align: center
          box-sizing: border-box
          border-right: 1px solid rgba(147,153,159,0.2)
          .score
            margin-bottom: 6px
            font-size: 24px
            line-height: 28px
            color: rgb(255,153,0)
          .title
            margin-bottom: 8px
            font-size: 12px
            line-height: 12px
          .rankRate
            margin-bottom: 6px
            font-size: 10px
            line-height: 1
            color: rgb(147,153,159)
        .right
          flex: 1
          padding: 0 15px
          .score
            width: 100%
            height: 18px
            margin-bottom: 8px
            &:last-child
              margin-bottom: 0
            .title
              vertical-align: top
              font-size: 12px
              line-height: 18px
              margin-right: 12px
            .star
              display: inline-block
              margin-right: 8px
            .num
              margin: 0
              font-size: 12px
              line-height: 18px
              color: rgb(255,153,0)
            .delivery-time
              font-size: 12px
              line-height: 18px
              color: rgb(147,153,159)
      .rating-select
        margin-top: 18px
        padding: 0 18px
      .comments
        .comment
          display: flex
          padding: 18px
          border-bottom: 1px solid rgba(7,17,27,0.1)
          .avatar
            flex: 0 0 28px
            margin-right: 12px
            img
              width: 28px
              height: 28px
          .content
            flex: 1
            .info
              width: 100%
              position: relative
              margin: 0
              margin-bottom: 6px
              font-size: 0
              .user-info
                font-size: 10px
                line-height: 12px
                margin-bottom: 4px
                .user-name
                  color: rgb(7,17,27)
                .time
                  position: absolute
                  right: 0
                  top: 0
                  font-weight: 200
                  color: rgb(147,153,159)
              .delivery-info
                .star
                  display: inline-block
                  margin-right: 6px
                .delivery-time
                  font-size: 10px
                  line-height: 12px
                  font-weight: 200
            .text
              font-size: 12px
              line-height: 18px
              margin-bottom: 8px
            .foods
              border-radius: 2px
              background: #fff
              .icon-thumb_up
                font-size: 12px
                line-height: 16px
                margin-right: 8px
                color: rgb(0,160,220)
              .icon-thumb_down
                font-size: 12px
                line-height: 16px
                margin-right: 8px
                color: rgb(147,153,159)
              .recommend
                padding: 0 6px
                margin-right: 8px
                font-size: 9px
                line-height: 16px
                color: rgb(147,153,159)
</style>
