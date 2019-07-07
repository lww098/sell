<template>
  <div class="ratingSelect">
    <div class="selectType">
      <span @click="select(2)" class="span all" :class="{'active':selectType===2}">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span @click="select(0)" class="span positive" :class="{'active':selectType===0}">
        {{desc.positive}}
        <span class="count">{{positive.length}}</span>
      </span>
      <span @click="select(1)" class="span negative" :class="{'active':selectType===1}">
        {{desc.negative}}
        <span class="count">{{negative.length}}</span>
      </span>
    </div>
    <div class="onlyContent" :class="{'on':onlyContent}">
      <i class="icon-check_circle" @click="toggleContent"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const Positive = 0;
const Negative = 1;
const all = 2;
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: all
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  methods: {
    select(type) {
      this.$emit("update:selectType", type);
    },
    toggleContent() {
      this.$emit("update:onlyContent", !this.onlyContent);
    }
  },
  computed: {
    positive() {
      return this.ratings.filter(rating => {
        return rating.rateType === Positive;
      });
    },
    negative() {
      return this.ratings.filter(rating => {
        return rating.rateType === Negative;
      });
    }
  }
};
</script>

<style lang="stylus">
.ratingSelect {
  margin-top: 18px;

  .selectType {
    margin-left: 18px;
    margin-right: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 0;

    .span {
      display: inline-block;
      margin-right: 8px;
      padding: 8px 12px;
      font-size: 12px;
      line-height: 16px;
      border-radius: 1px;
      color: rgb(77, 85, 93);
      margin-bottom: 18px;

      .count {
        font-size: 8px;
        margin-left: 2px;
      }

      &.active {
        color: #ffffff;
      }

      &.all, &.positive {
        background-color: rgba(0, 160, 220, 0.2);

        &.active {
          background-color: rgb(0, 160, 220);
        }
      }

      &.negative {
        background: rgba(77, 85, 93, 0.2);

        &.active {
          background-color: rgb(77, 85, 93);
        }
      }
    }
  }

  .onlyContent {
    padding: 12px 0px 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 0;

    &.on {
      .icon-check_circle {
        color: #00c850;
      }
    }

    .icon-check_circle {
      display: inline-block;
      font-size: 24px;
      color: rgb(147, 153, 159);
      margin-right: 4px;
      vertical-align: top;
    }

    .text {
      display: inline-block;
      font-size: 12px;
      color: rgb(147, 153, 159);
    }
  }
}
</style>
