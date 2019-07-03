<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt>
      </div>
      <div class="content">
        <div class="title">
          <span class="barnd"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if='seller.supports' @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class=bulletin-title></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <transition name='fade'>
      <div class="detail" v-show="detailShow">
        <div class="detail-wapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="support" v-if="seller.supports">
              <li class="support-item"  v-for="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class=line></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../../components/star/star'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  components: {
    star
  }
};
</script>

<style lang='stylus'>
@import '../../common/stylus/base';

.header
  background rgba(7,17,27,0.5)
  color #fff
  position relative
  overflow hidden
  .content-wrapper
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position relative
    .avatar
      display: inline-block;
      vertical-align: top;
      img
        border-radius: 2px;
    .content
      display: inline-block;
      padding-left: 12px;
      .title
        margin: 2px 0 8px 0;
        .barnd
          display: inline-block;
          width: 30px;
          height: 18px;
          vertical-align: top;
          bg-image('brand');
          background-repeat: no-repeat;
          background-size: 30px 18px;
          margin-right: 6px;
        .name
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
      .description
        font-size: 12px;
        font-weight: 20;
        line-height: 12px;
        margin-bottom: 10px;
      .supports
        margin-bottom: 2px;
        .icon
          width: 12px;
          height: 12px;
          display: inline-block;
          vertical-align: top;
          background-repeat: no-repeat;
          background-size: 12px 12px;
          &.decrease
            bg-image('decrease_1');
          &.discount
            bg-image('discount_1');
          &.guarantee
            bg-image('guarantee_1');
          &.invoice
            bg-image('invoice_1');
          &.special
            bg-image('special_1');
        .text
          font-size: 10px;
          font-weight: 200;
          line-height: 12px;
          padding-left: 4px;
    .support-count
      position absolute
      bottom 14px
      right 12px
      height 24px
      line-height 24px
      padding 0 8px
      border-radius 14px
      text-align center
      background-color rgba(0,0,0,0.2)
      .count
        font-size 10px
        font-weight 200
        vertical-align top
      .icon-keyboard_arrow_right
        font-size 10px
        margin-left 2px
        line-height 24px
  .bulletin-wrapper
    position relative
    height 28px
    line-height 28px
    padding 0px 22px 0 12px
    background-color rgba(7,17,27,0.2)
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    color #fff
    .bulletin-title
      display inline-block
      width 22px
      height 12px
      bg-image('bulletin')
      background-repeat no-repeat
      background-size 22px 12px
      vertical-align top
      margin-top 8px
    .bulletin-text
      font-size 10px
      line-height 28px
      font-weight 200
      margin 0 4px
      vertical-align top
    .icon-keyboard_arrow_right
      position absolute
      right 12px
      font-size 10px
      line-height 28px
  .background
    position absolute
    top 0
    left 0
    filter blur(10px)
    width 100%
    height 100%
    z-index -1
  .detail
    width 100%
    height 100%
    position fixed
    top 0
    left 0
    z-index 999
    opacity 1
    background-color rgba(7,17,27,0.8)
    backdrop-filter blur(10px)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
      background-color: rgba(7,17,27,0)
    .detail-wapper
      min-height 100%
      width 100%
      .detail-main
        margin-top 69px
        padding-bottom 64px
        .name
          font-size 16px
          font-weight 700
          line-height 16px
          text-align center
        .star-wrapper
          margin 16px 0 28px
          width 100%
          text-align center
        .title
          display flex
          width 80%
          margin 0 auto 24px
          .line
            flex 1
            position relative
            top -8px
            border-bottom 1px solid rgba(255,255,255,0.2)
          .text
            padding 0 12px
            font-size 14px
            font-weight 700
        .support
          width 80%
          margin 0 auto 28px
          .support-item
            font-size 0
            height 16px
            line-height 16px
            padding 0 12px
            margin-bottom 12px
            &:last-child
              margin-bottom 0
            .icon
              display inline-block
              width 16px
              height 16px
              background-size 16px 16px
              vertical-align top
              margin-right 6px
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image("discount_2")
              &.invoice
                bg-image('invoice_2')
              &.guarantee
                bg-image('guarantee_2')
              &.special
                bg-image('special_2')
            .text
              line-height 16px
              font-size 12px
              font-weight 200
        .bulletin
          width 80%
          padding 0 12px
          margin 0 auto
          .content
            font-size 12px
            font-weight 200
            line-height 24px
    .detail-close
      margin -64px auto 0 auto
      clear both
      width 32px
      height 32px
      font-size 32px

</style>
