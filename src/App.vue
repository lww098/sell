<template>
<body>
  <vheader :seller="seller"></vheader>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评价</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/sellers">商家</router-link>
    </div>
  </div>
  <keep-alive>
    <router-view :seller="seller"></router-view>
  </keep-alive>
</body>
</template>

<script>
import header from "./components/header/header";
import { urlParse } from "./common/js/tools";

export default {
  data() {
    return {
      seller: {
        id: (() => {
          var queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.axios
      .get("/api/seller?id" + this.seller.id)
      .then(response => {
        var res = response.data;
        if (res.error === 0) {
          this.seller = Object.assign({}, this.seller, res.data);
          console.log(this.seller);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  components: {
    vheader: header
  }
};
</script>

// <style lang='stylus'>
@import './common/stylus/index.styl';

.tab {
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);

  .tab-item {
    height: 40px;
    flex: 1;
    text-align: center;
    line-height: 40px;

    router-link {
      color: rgb(77, 85, 93);
      line-height: 28px;
      font-size: 28px;

      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
