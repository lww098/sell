<template>
  <div class="seller" ref="seller">
    <div class="seller-wrapper">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="24" :score="seller.foodScore"></star>
          <span class="num">({{seller.ratingCount}})</span>
          <span class="count">月销{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="remark-item">
            <div class="info">起送价</div>
            <div class="price">
              <span class="price-num">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="remark-item">
            <div class="info">商家配送</div>
            <div class="price">
              <span class="price-num">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="remark-item">
            <div class="info">平均配送时间</div>
            <div class="price">
              <span class="price-num">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="_toggleFaovrite">
          <div class="icon-favorite" :class="{'active' : isFavorite}"></div>
          <p class="text">{{favoriteText}}</p>
        </div>
      </div>
      <split></split>
      <div class="bulletin-wrapper">
        <h1 class="title">公告与活动</h1>
        <div class="text">{{seller.bulletin}}</div>
        <ul class="supports-wrapper">
          <li class="support" v-for="(support,index) in seller.supports" :key="index">
            <i class="icon" :class="classMap[support.type]"></i>
            <span class="item">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="img-wrapper">
        <h1 class="title">商家实景</h1>
        <div ref="picWrapper">
          <ul ref="picList">
            <li class="img-item" v-for="(pic,index) in seller.pics" :key="index">
              <img width="120px" height="90px" :src="pic" alt />
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info-wrapper">
        <h1>商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import { saveToLocal, loadFromLocal } from "../../common/js/store";
import star from "../../components/star/star";
import split from "../../components/split/split";

export default {
  data() {
    return {
      isFavorite: (() => {
        return loadFromLocal(this.seller.id, "isFavorite", false);
      })()
    };
  },
  computed: {
    favoriteText() {
      return this.isFavorite ? "已收藏" : "收藏";
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split
  },
  watch: {
    seller() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPicScroll();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
      this._initPicScroll();
    });
  },
  methods: {
    _toggleFaovrite() {
      this.isFavorite = !this.isFavorite;
      saveToLocal(this.seller.id, "isFavorite", this.isFavorite);
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    _initPicScroll() {
      if (this.seller.pics) {
        var picW = 120;
        var margin = 6;
        var w = (picW + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = w + "px";
        if (!this.picScroll) {
          this.picScroll = new BScroll(this.$refs.picWrapper, {
            click: true,
            scrollX: true,
            eventPassthrough: "vertial"
          });
        } else {
          this.picScroll.refresh();
        }
      }
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  }
};
</script>

<style lang='stylus'>
@import '../../common/stylus/base';

.seller {
  width: 100%;
  position: absolute;
  top: 174px;
  left: 0;
  bottom: 0;
  overflow: hidden;

  .overview {
    position: relative;
    padding: 18px;

    .title {
      font-size: 14px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-weight: 700;
    }

    .desc {
      padding: 8px 0 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .star {
        display: inline-block;
        margin-right: 8px;
      }

      .num, .count {
        font-size: 10px;
        line-height: 12px;
        color: rgb(77, 85, 93);
      }

      .num {
        margin-right: 12px;
      }
    }

    .remark {
      display: flex;
      padding-top: 18px;

      .remark-item {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27 0.1);
        font-size: 0;

        &:last-child {
          border-right: none;
        }

        .info {
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 159);
          margin-bottom: 4px;
        }

        .price {
          font-size: 10px;
          font-weight: 200;
          line-height: 24px;
          color: rgb(7, 17, 27);

          .price-num {
            font-size: 24px;
          }
        }
      }
    }

    .favorite {
      position: absolute;
      width: 50px;
      right: 11px;
      top: 18px;
      text-align: center;

      .icon-favorite {
        font-size: 24px;
        line-height: 24px;
        margin-bottom: 4px;
        color: #d4d6d9;

        &.active {
          color: rgb(240, 20, 20);
        }
      }

      .text {
        font-size: 10px;
        line-height: 10px;
        color: rgb(77, 85, 93);
      }
    }
  }

  .bulletin-wrapper {
    padding: 18px;

    .title {
      font-size: 14px;
      line-height: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }

    .text {
      font-size: 12px;
      line-height: 24px;
      font-weight: 200;
      color: rgb(240, 20, 20);
      padding: 8px 12px 16px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .support {
      padding: 16px 12px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 16px;
        height: 16px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
        margin-right: 6px;

        &.decrease {
          bg-image('decrease_4');
        }

        &.discount {
          bg-image('discount_4');
        }

        &.invoice {
          bg-image('invoice_4');
        }

        &.special {
          bg-image('special_4');
        }

        &.guarantee {
          bg-image('guarantee_4');
        }
      }

      .item {
        font-size: 12px;
        line-height: 16px;
        font-weight: 200;
        color: rgb(7, 17, 27);
      }
    }
  }

  .img-wrapper {
    padding: 18px;

    h1 {
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 14px;
      color: rgb(7, 17, 27);
    }

    .img-item {
      display: inline-block;
      margin-right: 6px;

      &:last-child {
        margin-right: 0;
      }

      img {
        display: inline-block;
      }
    }
  }

  .info-wrapper {
    padding: 18px;

    h1 {
      padding-bottom: 12px;
      font-size: 14px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .info-item {
      padding: 16px 12px;
      font-size: 12px;
      line-height: 16px;
      font-weight: 200;
      color: rgb(7, 17, 27);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
