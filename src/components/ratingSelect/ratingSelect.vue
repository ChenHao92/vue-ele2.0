<!--
  @Author: chenhao
  @Date:   2017-03-06 13:45:30
  @Last Modified by:   ch
  @Last Modified time: 2017-03-06 13:45:30
-->
<template>
  <div class="rating-select">
    <div class="rating-type">
      <span class="all" :class="{'highlight': selectType===2}" @click="changeSelectType(2, $event)">{{desc.all}} <span class="count">{{ratings.length}}</span></span>
      <span class="positive" :class="{'highlight': selectType===0}" @click="changeSelectType(0, $event)">{{desc.positive}} <span class="count">{{positive.length}}</span></span>
      <span class="negative" :class="{'highlight': selectType===1}" @click="changeSelectType(1, $event)">{{desc.negative}} <span class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch" @click="showOnlyContent($event)" :class="{'highlight': isOnlyContent === true}">
      <i class="icon-check_circle"></i>
      <span>只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 2;
  const NEGATIVE = 1;
  const POSITIVE = 0;
  export default {
    props: {
      // 用户评价
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      // 显示的评价类型
      selectType: {
        type: Number,
        default: ALL
      },
      // 是否只显示有内容的评价
      isOnlyContent: {
        type: Boolean,
        default: true
      },
      // 按钮描述文字
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    methods: {
      changeSelectType (type, event) {
        if (!event._constructed) {
          return;
        }
       this.selectType = type;
       this.$dispatch('ratingTypeChanged', type);
      },
      showOnlyContent (event) {
        if (!event._constructed) {
          return;
        }
        this.isOnlyContent = !this.isOnlyContent;
        this.$dispatch('isOnlyContentChanged', this.isOnlyContent);
      }
    },
    computed: {
      positive () {
        let newRatings = this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
        return newRatings;
      },
      negative () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .rating-select
    .rating-type
      font-size: 0px
      line-height: 16px
      margin-bottom: 18px
      span
        display: inline-block
        padding: 8px 12px
        font-size: 12px
        margin-right: 8px
        border-radius: 2px
      .all, .positive
        background: rgba(0,160,220,0.2)
        color: rgb(77,85,93)
        &.highlight
          background: rgb(0,160,220)
          color: #fff
      .negative
        background: rgba(77,85,93,0.2)
        color: rgb(77,85,93)
        &.highlight
          background: rgb(77,85,93)
          color: #fff
      .count
        font-size: 8px
        padding: 0
        margin: 0
    .switch
      padding: 12px 0
      color: rgb(147,153,159)
      &.highlight
        color: rgb(0,160,220)
      .icon-check_circle
        vertical-align: middle
        font-size: 24px
        line-height: 24px
      span
        font-size: 12px
        line-height: 24px
</style>
