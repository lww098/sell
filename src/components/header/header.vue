<template>
  <div class="page">
    <div class="content-wrapper">
      <div class="avater">
        <img height="64" width="64" :src="seller.avatar">
      </div>
      <div class="descript">
        <div class="name-content">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="express-content">
          <span class="express">{{seller.description}}/</span><span class="time">{{seller.deliveryTime}}分钟送达</span>
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon"></span>
          <span class="support-item">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <div>
        <span class="icon"></span>
        <span class="bulletin">{{seller.bulletin}}</span>
        <i class='icon-arrow_lift'></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    seller: {
      type: Object
    }
  }
};
</script>

<style lang='stylus'>
.content-wrapper {
  padding: 24px 12px 18px 24px;
  background-color: #000;
  color: #fff;
}
.content-wrapper .avater {
  display: inline-block;
  padding-right: 16px;
}
.content-wrapper .descript {
  display: inline-block;
  height: 64px;
  padding: 2px 0;
  font-size: 0;
}
.name-content {
  padding-bottom: 8px;
  padding-top: 2px;
}
.express-content {
  padding-bottom: 10px;
}
.content-wrapper .descript .name {
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
}
.content-wrapper .descript .brand {
  vertical-align: top;
  display: inline-block;
  width: 30px;
  height: 18px;
  background-image: url("brand@3x.png");
  background-repeat: no-repeat;
  background-size: 30px 18px;
  margin-right: 6px;
}
.content-wrapper .descript .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  vertical-align: top;
  background-image: url("decrease_2@3x.png");
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.content-wrapper .descript .express,
.content-wrapper .descript .time {
  font-size: 12px;
  line-height: 12px;
  font-weight: 200;
}
.content-wrapper .descript .support {
  font-size: 10px;
  line-height: 12px;
  font-weight: 200;
}
.bulletin-wrapper {
  position: relative;
  height: 28px;
  line-height: 28px;
  padding: 0 22px 0 12px;
  background-color: rgba(7, 17, 27, 0.2);
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bulletin-wrapper .icon {
  display: inline-block;
  background-image: url("bulletin@3x.png");
  background-repeat: no-repeat;
  background-size: 22px 12px;
  height: 12px;
  width: 22px;
  vertical-align: top;
  margin-top: 8px;
}
.bulletin {
  margin: 0 4px;
  font-size: 10px;
  vertical-align: top;
}
.bulletin-wrapper .more {
  position: absolute;
  font-size: 12px;
  right: 12px;
  top: 8px;
}

</style>
