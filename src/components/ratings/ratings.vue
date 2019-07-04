<template>
  <div class="ratings">
      <div class="rating-wrapper">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="desc">综合评分</div>
            <div class="detail">高于周边商家{{seller.rankScore}}%</div>
          </div>
          <div class="overview-right">
            <div class="item">
              <span class="info">服务态度</span>
              <star class="star" :size='36' :score='seller.serviceScore'></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="item">
              <span class="info">商品评分</span>
              <star class="star" :size='36' :score='seller.foodScore'></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="item">
              <span class="info">送到时间</span>
              <span class="time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import split from "../../components/split/split"
import star from '../../components/star/star'
export default {
  props:{
    seller:{
      type:Object
    }
  },
  components: {
    split,
    star
  }
}
</script>

<style lang='stylus'>
.ratings
  width 100%
  position absolute
  top 174px
  bottom 0
  left 0
  overflow hidden
  .overview
    display flex
    padding 18px 0
    .overview-left
      flex 0 0 135px
      text-align center
      padding 6px 0
      border-right 1px solid rgba(7, 17, 27, 0.1)
      .score
        font-size 24px
        line-height 28px
        color rgb(255,153,0)
        margin-bottom 6px
      .desc
        font-size 12px
        line-height 12px
        color rgb(7,17,27)
        margin-bottom 8px
      .detail
        font-size 10px
        line-height 10px
        color rgb(147, 153, 159)
        margin-bottom 6px
    .overview-right
      flex 1
      padding-left 24px
      .item
        font-size 0
        margin-bottom 8px
        line-height 12px
        &:last-child
          margin-bottom 0
        .info
          display inline-block
          font-size 12px
          margin-right 12px
          color rgb(7,17,27)
          vertical-align top
        .star
          display inline-block
          vertical-align top
        .score
          display inline-block
          vertical-align top
          margin-left 12px
          font-size 12px
          color rgb(255,153,0)
        .time
          font-size 12px
          color rgb(147,153,159)

          
        
</style>
