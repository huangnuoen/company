<template>
  <div class="slider" @touchstart="sliderStart" @touchmove.stop.prevent="sliderMove">
    <div class="box" ref="box" :data-index="index" v-for="(item,index) in arr" :class="{'active':currentIndex==index}"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      arr: new Array(20),
      currentIndex: 0,
      touch: {}
    };
  },
  methods: {
    sliderStart(e) {
      let i = e.target.getAttribute("data-index");
      let firstT = e.touches[0];
      this.touch.x1 = firstT.clientX;
      this.touch.anchorIndex = i;
      console.log(this.touch.anchorIndex);
      this.scrollTo(this.touch.anchorIndex);
    },
    sliderMove(e) {
      let boxWidth=this.$refs.box[0].clientWidth;
      let firstT = e.touches[0];
      this.touch.x2 = firstT.clientX;
      let delta=(this.touch.x2-this.touch.x1)/boxWidth;
      let index=parseInt(this.touch.anchorIndex)+Math.round(delta)
      this.scrollTo(index);
      
    },
    scrollTo(i) {
      this.currentIndex = i;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.slider {
  width: 100%;
  height: 20px;
  display: flex;
  .box {
    width: 5%;
    height: 100%;
    background-color: pink;
    &.active {
      background-color: red;
    }
  }
}
</style>

