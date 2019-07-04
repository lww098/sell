<template>
  <div>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
          <div class="food-wrapper">
            <div class="food-header">
                <img :src="food.image" alt="">
                <div class="back" @click="hide">
                  <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <div class="content">
              <h1 class="title">{{food.name}}</h1>
              <div class="detail">
                <span class="sell-count">月销{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="new">￥{{food.price}}</span>
                <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
              </div>
              <transition name="fade">
                <div @click.stop.prevent='addFirst' class="buy" v-show="!food.count||food.count===0">加入购物车</div>
              </transition>
            </div>
            <split v-if='food.info'></split>
            <div class="info-wrapper" v-if='food.info'>
              <h1 class="title">商品介绍</h1>
              <p class="info">{{food.info}}</p>
            </div>
            <split></split>
            <div class="food-ratings">
              <h1 class="title">商品评价</h1>
              <ratingselect :desc='desc' :select-type.sync='selectType' :only-content.sync='onlyContent' :ratings='food.ratings'></ratingselect>
            </div>
            <div class="ratings-wrapper">
              <ul class='have-ratings' v-if="food.ratings && food.ratings.length">
                <li  v-show='needShow(rating.rateType,rating.text)' class="rating-item" v-for="(rating,index) in food.ratings" :key='index'>
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" width='12' height="12">
                  </div>
                  <div class="time">{{rating.rateTime | formatDate}}</div>
                  <p class="text">
                    <i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class='no-ratings' v-if='!food.ratings||!food.ratings.length'></div>
            </div>
          </div>
        </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Vue from 'vue'
import split from '../../components/split/split'
import ratingselect from '../../components/ratingselect/ratingselect'
import {formatDate} from '../../common/js/data'

export default {
  props: {
    food: Object
  },
  data() {
    return {
      showFlag: false,
      selectType: 2,
      onlyContent: false,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  methods: {
    show() {
      this.showFlag = true
      this.selectType = 2
      this.onlyContent = false
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFirst() {
      Vue.set(this.food, "count", 1)
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === 2) {
        return true
      } else {
        return this.selectType === type
      }
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    split,
    ratingselect
  }
};
</script>

<style lang="stylus">
.food
  position: fixed;
  top: 0;
  left: 0;
  bottom: 46px;
  width: 100%;
  z-index: 30;
  background-color: #fff;
  &.move-enter, &.move-leave-to
      transform translate3d(100%,0,0)
  &.move-enter-active, &.move-leave-active
      transition all 0.5s
  .food-header
    width 100%
    height 0
    padding-top 100%
    position relative
    img
      width 100%
      height 100%
      position absolute
      top 0
      left 0
    .back
      position absolute
      left 0
      top 10px
      .icon-arrow_lift
        display block
        font-size 20px
        padding 10px
        color #fff
  .content
    position relative
    padding 18px
    border-bottom 1px  solid rgba(7,17,27,0.1)
    .title
      margin-bottom 8px
      font-size 14px
      font-weight 700
      line-height 14px
      color rgb(7,17,27)
    .detail
      font-size 0
      margin-bottom 18px
      line-height 10px
      span
        font-size 10px
        color rgb(147,153,159)
      .sell-count
        margin-right 12px
    .price
      font-size 0
      .new
        font-size 14px
        line-height 14px
        font-weight 700
        color rgb(240,20,20)
      .old
        text-decoration line-through
        font-size 10px
        line-height 10px
        font-weight normal
        color rgb(147,153,159)
    .buy
      position absolute
      height 24px
      line-height 24px
      padding 6px 12px
      right 18px
      bottom 18px
      background-color rgb(0,160,220)
      color #fff
      border-radius 24px;
      &.fade-enter-active, &.fade-leave-active
        transition all 0.5s
      &.fade-enter, &.fade-leave
        opacity 0
  .info-wrapper
    padding 18px
    .title
     font-size 14px
     color rgb(7,17,27)
     margin-bottom 6px
    .info
      padding 0 8px
      font-size 12px
      font-weight 200
      line-height 24px
      color rgb(77,85,93)
  .food-ratings
    padding-top 18px
    .title
      font-size 14px
      margin-left 18px
      color(7,17,27)
  .ratings-wrapper
    margin 0 18px
    .rating-item
      padding 12px 0
      position relative
      font-size 0
      border-bottom 1px solid rgba(7,17,27,0.1)
      .user
        position absolute
        right 0
        top 16px
        .name
          display inline-block
          margin-right 6px
          font-size 10px
          line-height 12px
          color rgb(147,153,159)
      .time
        margin-bottom 6px
        font-size 10px
        line-height 12px
        color rgb(147,153,159)
      .text
        font-size 12px
        line-height 16px
        color rgb(7,17,27)
        i
          margin-right 4px
          font-size 12px
          line-height 16px
          &.icon-thumb_up
            color rgb(0,160,220)
          &.icon-thumb_down
            color rgb(147,153,159)
</style>
