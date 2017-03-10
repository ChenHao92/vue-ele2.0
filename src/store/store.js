/*
* @Author: ch
* @Date:   2017-03-10 14:07:54
* @Last Modified by:   ch
* @Last Modified time: 2017-03-10 16:00:41
*/

'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    goods: [],
    selectFood: {},
    selectedFoods: [],
    selectType: 2,
    isOnlyContent: false
  },
  mutations: {
    initGoods (state, goods) {
      if (state.goods.length !== 0)
        return;
      state.goods = goods;
    },
    changeSelectFood (state, food) {
      state.selectFood = food;
    },
    setSelectedFoods (state, foods) {
      state.selectedFoods = foods;
    },
    setSelectType (state, type) {
      console.log("setSelectType");
      state.selectType = type;
    },
    toggleIsOnlyContent (state) {
      state.isOnlyContent = !state.isOnlyContent;
    }
  }
});
