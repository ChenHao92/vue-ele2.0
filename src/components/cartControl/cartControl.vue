<template>
  <div class="cartControl">
    <i class="icon-remove_circle_outline" v-show="food.count > 0" @click.stop="decFood"></i>
    <span class="num" v-show="food.count > 0">{{food.count}}</span>
    <i class="icon-add_circle" v-on:click.stop="incFood"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      incFood (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decFood (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .icon-remove_circle_outline
    display: inline-block
    font-size: 24px
    line-height: 24px
    color: rgb(0,160,220)
  .num
    display: inline-block
    margin: 0 7px
    vertical-align: top
    font-size: 10px
    color: rgb(147,153,159)
    line-height: 24px
  .icon-add_circle
    display: inline-block
    font-size: 24px
    line-height: 24px
    color: rgb(0,160,220)
</style>
