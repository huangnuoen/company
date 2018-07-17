       <template>
  <div class="slider"  @touchstart="sliderStart" @touchmove.stop.prevent="sliderMove">
    <div class="box" ref="box" :data-index="index" v-for="(item,index) in arr" :class="{'active':currentIndex==index}"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      arr: new Array(50),
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
      let boxWidth = document.documentElement.clientWidth/ this.$refs.box.length;
      // let boxWidth = this.$refs.box[0].clientWidth;
      let firstT = e.touches[0];
      this.touch.x2 = firstT.clientX;
      let delta = (this.touch.x2 - this.touch.x1) / boxWidth;
      let index = parseInt(this.touch.anchorIndex) + Math.round(delta);
      this.scrollTo(index);
    },
    scrollTo(i) {
      if(i<0) {
        i=0;
      } else if(i>=this.$refs.box.length) {
        i = this.$refs.box.length-1
      }
      this.currentIndex = i;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.slider {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 20px;
  display: flex;
  border-bottom: 4px solid red;
  .box {
    width: 2%;
    box-sizing: border-box;
    border-left: solid 2px #fff;
    border-right: solid 2px #fff;
    height: 60%;
      transition: all .4s;
    background-color: pink;
    &.active {
      height: 100%;
      // transform: scaleY(2);
      background-color: red;
      transition: all .4s;
    }
  }
}
</style>

