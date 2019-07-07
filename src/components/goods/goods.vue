<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            @click="selectMenu(index,$event)"
            :class="{'current':currentIndex===index}"
            class="menu-item"
            v-for="(item,index) in goods"
            :key="index"
          >
            <span class="text">
              <span class="icon" v-if="item.type>0" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="foodList foodListHook" v-for="(item,index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li
                @click="seclectFood(food)"
                class="foodItem"
                v-for="(food,index) in item.foods"
                :key="index"
              >
                <div class="icon">
                  <img :src="food.icon" width="57" height="57" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="description">{{food.description}}</p>
                  <div class="extre">
                    <span class="sellCount">月销{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="newPrice">￥{{food.price}}</span>
                    <span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @cart-add="cartAdd"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart
        ref="shopcart"
        :selectFoods="selectFoods"
        :delivery="seller.deliveryPrice"
        :min-price="seller.minPrice"
      ></shopcart>
    </div>
    <food :food="seclectedFood" ref="food" @add="cartAdd"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import food from "../../components/food/food";
import BScroll from "better-scroll";
import shopcart from "../../components/shopcart/shopcart";
import cartcontrol from "../../components/cartcontrol/cartcontrol";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      seclectedFood: {},
      heightList: [],
      scrollY: 0
    };
  },
  components: {
    food,
    shopcart,
    cartcontrol
  },
  created() {
    this.axios
      .get("/api/goods")
      .then(response => {
        var res = response.data;
        if (res.error === 0) {
          this.goods = res.data;
          this.$nextTick(() => {
            this._initScroll();
            this._caculateHeight();
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.heightList.length; i++) {
        let height1 = this.heightList[i];
        let height2 = this.heightList[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      var res = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            res.push(food);
          }
        });
      });
      return res;
    }
  },
  methods: {
    cartAdd(target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    seclectFood(food) {
      this.seclectedFood = food;
      this.$refs.food.show();
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      var foodItem = this.$refs.foodsWrapper.getElementsByClassName(
        "foodListHook"
      );
      this.foodsScroll.scrollToElement(foodItem[index], 300);
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _caculateHeight() {
      var height = 0;
      this.heightList.push(height);
      var foodItem = this.$refs.foodsWrapper.getElementsByClassName(
        "foodListHook"
      );
      for (var i = 0; i < foodItem.length; i++) {
        height += foodItem[i].clientHeight;
        this.heightList.push(height);
      }
    }
  }
};
</script>

<style lang='stylus' rel="stylesheet/stylus">
@import '../../common/stylus/base';

.goods {
  width: 100%;
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;

    .menu-item {
      display: table;
      width: 56px;
      height: 54px;
      line-height: 14px;
      padding: 0 12px;
      font-size: 0;

      &.current {
        position: relative;
        margin-top: -1px;
        font-weight: 700;
        z-index: 10;
        background-color: #fff;

        .text {
          border-bottom: none;
        }
      }

      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-repeat: no-repeat;
        background-size: 12px 12px;
        vertical-align: top;
        margin-right: 2px;

        &.decrease {
          bg-image('decrease_3');
        }

        &.discount {
          bg-image('discount_3');
        }

        &.invoice {
          bg-image('invoice_3');
        }

        &.special {
          bg-image('special_3');
        }

        &.guarantee {
          bg-image('guarantee_3');
        }
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        font-weight: 200;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      height: 26px;
      line-height: 26px;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
      border-left: 2px solid #d9dde1;
      padding: 0 14px;
    }

    .foodItem {
      display: flex;
      position: relative;
      margin: 18px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      &:last-child {
        border-bottom: none;
        padding-bottom: none;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          font-size: 14px;
          line-height: 14px;
          margin-top: 2px;
          color: rgb(7, 17, 27);
        }

        .description {
          margin-top: 8px;
          font-size: 10px;
          line-height: 12px;
          color: rgb(147, 153, 159);
        }

        .extre {
          font-size: 0;
          margin-top: 8px;

          span {
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
            margin-right: 12px;
          }
        }

        .price {
          margin-top: 8px;

          .newPrice {
            font-size: 14px;
            line-height: 24px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }

          .oldPrice {
            font-size: 10px;
            font-weight: normal;
            text-decoration: line-through;
            line-height: 24px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
