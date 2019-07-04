<template>
  <div class="ratings" ref=ratings>
    <div class="rating-wrapper" >
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="desc">综合评分</div>
          <div class="detail">高于周边商家{{seller.rankScore}}%</div>
        </div>
        <div class="overview-right">
          <div class="item">
            <span class="info">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="item">
            <span class="info">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="item">
            <span class="info">送到时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        :ratings="ratings"
        :select-type.sync="selectType"
        :only-content.sync="onlyContent"
      ></ratingselect>
      <div class="rating-content">
        <ul>
          <li v-show='needShow(rating.rateType,rating.text)' class="rating-item" v-for="(rating,index) in ratings" :key='index'>
            <div class="avatar-wrapper">
              <img :src="rating.avatar" width='28' height="28px">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="commend">
                <star  class='star' :score='rating.score' :size='24'></star>
                <span class="dtime" v-if='rating.deliveryTime'>{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-if='rating.recommend && rating.recommend.length'>
                <i class="icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
                <span  v-for='(item,index) in rating.recommend' :key='index' class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {formatDate} from '../../common/js/data'
import BScroll from 'better-scroll'
import split from "../../components/split/split";
import star from "../../components/star/star";
import ratingselect from "../../components/ratingselect/ratingselect";

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      selectType: 2,
      onlyContent: false,
      ratings: []
    };
  },
  methods: {
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
  created() {
    this.axios.get("/api/ratings").then(respond => {
      var res = respond.data;
      if (res.error === 0) {
        this.ratings = res.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    });
  },
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    split,
    star,
    ratingselect
  }
};
</script>

<style lang='stylus'>
.ratings
  width: 100%;
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  overflow: hidden;
  .overview
    display: flex;
    padding: 18px 0;
    .overview-left
      flex: 0 0 135px;
      width: 135px;
      text-align: center;
      padding: 6px 0;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      @media only screen and (max-width: 320px)
        flex: 0 0 120px;
        width: 120px;
      .score
        font-size: 24px;
        line-height: 28px;
        color: rgb(255, 153, 0);
        margin-bottom: 6px;
      .desc
        font-size: 12px;
        line-height: 12px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
      .detail
        font-size: 10px;
        line-height: 10px;
        color: rgb(147, 153, 159);
        margin-bottom: 6px;
    .overview-right
      flex: 1;
      padding: 6px 0 6px 24px;
      @media only screen and (max-width: 320px) 
        padding-left: 6px;
      .item
        font-size: 0;
        margin-bottom: 8px;
        &:last-child
          margin-bottom: 0;
        .info
          display: inline-block;
          font-size: 12px;
          margin-right: 12px;
          color: rgb(7, 17, 27);
          vertical-align: top;
          line-height: 18px;
        .star
          display: inline-block;
          vertical-align: top;
        .score
          display: inline-block;
          vertical-align: top;
          margin-left: 12px;
          font-size: 12px;
          color: rgb(255, 153, 0);
          line-height: 18px;
        .time
          font-size: 12px;
          line-height: 18px;
          color: rgb(147, 153, 159);
  .rating-content
    .rating-item
      display flex
      margin 18px
      padding-bottom 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      .avatar-wrapper
        flex 0 0 28px
        width 28px
        margin-right 12px
        img
          border-radius 50%
      .content
        flex 1
        position relative
        .name
          font-size 10px
          line-height 12px
          color rgb(7,17,27)
        .commend
          font-size 0
          margin 4px 0 6px
          .star
            display inline-block
            margin-right 6px
            vertical-align top
          .dtime
            display inline-block
            font-weight 200
            font-size 10px
            line-height 12px
            color rgb(147,153,159)
        .text
          font-size 12px
          font-weight 200
          line-height 12px
          color rgb(7,17,27)
          margin-bottom 8px
        .recommend
          font-size 0
         .icon
           display inline-block
           font-size 12px
           line-height 16px
           margin-right 8px
           color rgb(0,160,220)
          .item
            display inline-block
            padding 0 6px
            margin-right 8px
            font-size 9px
            line-height 16px
            color rgb(147,153,159)
            border-radius 2px
            border 1px solid rgba(7,17,27,0.1)
            margin-bottom 4px
        .time
          position absolute
          top 0
          right 0
          font-size 10px
          line-height 12px
          font-weight 200
          color rgb(147,153,159)
</style>
