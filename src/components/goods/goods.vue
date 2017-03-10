<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu">
        <li class="good" v-for="(good, index) in goods" :class="{'current': currentIndex===index}" v-on:click="selectGood(index,$event)">
          <span class="name border-1px"><span v-if="good.type>-1" class="icon" :class="classMap[good.type]"></span>{{ good.name }}</span>
        </li >
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul class="foods">
            <li class="food border-1px" v-for="food in item.foods" @click="selectFood(food,$event)">
              <div class="food-image">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="food-content">
                <h2 class="name">{{ food.name }}</h2>
                <p v-if="food.description" class="description">{{ food.description }}</p>
                <div class="extra">
                  <span class="sellCount">月售{{ food.sellCount }}份</span>
                  <span class="rating">好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice"><p>¥</p>{{ food.price }}</span>
                  <span v-show="food.oldPrice" class="oldPrice">¥{{ food.oldPrice }}</span>
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0;
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartControl from 'components/cartControl/cartControl';
  import food from 'components/food/food';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i];
          let heightNext = this.listHeight[i + 1];
          if (!heightNext || (this.scrollY >= height && this.scrollY < heightNext)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count > 0) {
              foods.push(food);
            }
          });
        });
        this.$store.commit('setSelectedFoods', foods);
        return foods;
      },
      selectedFood () {
        return this.$store.state.selectFood;
      },
      goods () {
        return this.$store.state.goods;
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.$store.commit('initGoods', response.data);
          this.$nextTick(() => {
            this._initScroll();
            this._caclLHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _caclLHeight () {
        let foodsWrapper = this.$refs.foodsWrapper;
        let foodLists = foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodLists.length; i++) {
          height += foodLists[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectGood (index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 500);
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return;
        }
        this.$store.commit('changeSelectFood', food);
        this.$refs.food.show();
      }
    },
    components: {
      shopcart,
      cartControl,
      food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 48px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .good
        display: table
        width: 56px
        height: 54px
        line-height: 14px
        padding: 0 12px
        &.current
          position: relative
          margin-top: 1px
          z-index: 10
          background: #fff
          .name
            border-none()
            font-weight: 700
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .name
          display: table-cell
          vertical-align: middle
          border-1px(rgba(7,17,17,0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      font-size: 0
      .title
        padding-left: 14px
        height: 26px
        font-size: 12px
        color: rgb(147,153,159)
        line-height: 26px
        border-left: 2px solid #d9dde1
        background-color: #f3f5f7
      .foods
        .food
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7,17,17,0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .food-image
            flex: 0 0 57px
            vertical-align: top
            margin-right: 10px
          .food-content
            flex: 1
            .name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              font-weight: 700
              color: rgb(7,17,27)
            .description
              font-size: 10px
              line-height: 12px
              margin-bottom: 8px
              color: rgb(147,153,159)
            .extra
              .sellCount
                margin-right: 12px
                font-size: 10px
                line-height: 10px
                color: rgb(147,153,159)
              .rating
                font-size: 10px
                line-height: 10px
                color: rgb(147,153,159)
            .price
              position: relative
              margin-top: 8px
              .nowPrice
                font-size: 14px
                color: rgb(240,20,20)
                font-weight: 700
                line-height: 24px
                margin-right: 8px
                p
                  display: inline-block
                  font-size: 10px
                  font-weight: normal
              .oldPrice
                font-size: 10px
                line-height: 10px
                text-decoration: line-through
                color: rgb(147,153,159)
              .cartControl
                position: absolute
                right: 18px
                top: 0
                vertical-align: top
                display: inline-block
                font-size: 0
</style>
