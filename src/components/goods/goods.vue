<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="(item,index) in goods" :key=index>
            <span class="text">
              <span class="icon" v-if="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="good-wrapper">
        <ul>
          <li class="foodList" v-for="(item,index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="seclectFood(food)" class="foodItem" v-for="(food,index) in item.foods" :key="index">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="description">{{food.description}}</p>
                  <div class="extre">
                    <span class="sellCount">月销{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="newPrice">￥{{food.price}}</span>
                    <span v-if='food.oldPrice'>￥{{food.oldPrice}}</span>
                  </div>
                </div>     
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  <food :food="seclectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import food from '../../components/food/food'
export default {
  props: {},
  data() {
    return {
      goods: [],
      seclectedFood: {}
    };
  },
  components: {
    food
  },
  created() {
    this.axios
      .get("/api/goods")
      .then(response => {
        var res = response.data;
        if (res.error === 0) {
          this.goods = res.data;
          console.log(this.goods)
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  computed: {
    seclectFoods() {
      var result = {}
      this.goods.forEach(function(good) {
        good.foods.forEach(function(food) {
        })
      })
    }
  },
  methods: {
    seclectFood(food) {
      console.log(food)
      this.seclectedFood = food
      this.$refs.food.show()
    }
  }
};
</script>

<style lang='stylus' rel="stylesheet/stylus">
@import '../../common/stylus/base'

.goods
  width: 100%;
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  overflow: hidden;
  .menu-wrapper
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    padding 0 12px
    .menu-item
      display table
      width 56px
      height 54px
      line-height 14px
      .icon
        display inline-block
        width 12px
        height 12px
        background-repeat no-repeat
        background-size 12px 12px
        vertical-align top
        margin-right 2px
        &.decrease
          bg-image("decrease_3")
        &.discount
          bg-image('discount_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
        &.guarantee
          bg-image('guarantee_3')
      .text
        display table-cell
        width 56px
        vertical-align middle
        font-size 12px
        font-weight 200
        border-bottom 1px solid rgba(7,17,27,0.1)
  .good-wrapper
    flex: 1;
    .title
      height 26px
      line-height 26px
      font-size 12px
      color rgb(147,153,159)
      background #f3f5f7
      border-left 2px solid #d9dde1
      padding 0 14px
    .foodItem
      display flex
      margin 18px
      padding-bottom 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      &:last-child
        border-bottom none
        padding-bottom none
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          font-size 14px
          line-height 14px
          margin-top 2px
          color rgb(7,17,27)
        .description
          margin-top 8px
          font-size 10px
          line-height 10px
          color rgb(147,153,159)
        .extre
          font-size 0
          margin-top 8px
          span
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
            margin-right 12px
        .price
          margin-top 8px
          .newPrice
            font-size 14px
            line-height 24px
            font-weight 700
            color rgb(240,20,20)
          .oldPrice
            font-size 10px
            font-weight normal
            text-decoration line-through
            line-height 24px
            color rgb(147,153,159)
            
</style>
