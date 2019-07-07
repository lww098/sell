<template>
  <div class="cartcontrol">
    <transition name="move">
      <div @click.stop.prevent="removeCart" class="decrease" v-show="food.count">
        <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="num" v-show="food.count">{{food.count}}</div>
    <div class="add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      this.$emit("cart-add", event.target);
    },
    removeCart(event) {
      if (!event._constructed) {
        return;
      }
      this.food.count--;
    }
  }
};
</script>

<style scoped lang="stylus">
.cartcontrol {
  font-size: 0;

  .decrease {
    display: inline-block;
    vertical-align: top;
    padding: 6px;
    transition: all 0.4s linear;

    .inner {
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
      transition: all 0.4s linear;
    }

    &.move-enter-active, &.move-leave-active {
      transform: translate3d(0, 0, 0);
      opacity: 1;

      .inner {
        transform: rotate(0);
      }
    }

    &.move-enter, &.move-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0);

      .inner {
        transform: rotate(180deg);
      }
    }
  }

  .num {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    font-size: 10px;
    line-height: 24px;
    color: rgb(147, 153, 159);
  }

  .add {
    display: inline-block;
    padding: 6px;
    vertical-align: top;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
