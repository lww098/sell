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
          </div>
        </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Vue from 'vue'
import Split from '../../components/split/split'

export default {
  props: {
    food: Object
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true
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
      Vue.set(this.food, "count" ,1)
    }
  },
  components:{
    Split
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
</style>
