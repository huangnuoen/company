<template>
  <div class="seller">
  	<div class="seller-content">
  		<div class="overview">
  			<div class="title">{{seller.name}}</div>
  			<div class="desc border-1px">
  				<star :size="36" :score="seller.score"></star>
  				<span class="text">（{{seller.ratingCount}}）</span>
  				<span class="text">月售{{seller.sellCount}}单</span>
  			</div>
  			<ul class="remark">
  				<li class="block">
  					<h2>起送价</h2>
  					<div class="content">
  						<span class="stress">{{seller.minPrice}}</span>元
  					</div>
  				</li>
  				<li class="block">
  					<h2>商家配送</h2>
  					<div class="content">
  						<span class="stress">{{seller.deliveryPrice}}</span>元
  					</div>
  				</li>
  				<li class="block">
  					<h2>平均配送时间</h2>
  					<div class="content">
  						<span class="stress">{{seller.deliveryTime}}</span>分钟
  					</div>
  				</li>
  			</ul>
  		</div>
      <split></split>
  	</div>
  </div>
</template>

<script>
  import star from 'components/star/star';
  import split from 'components/split/split';
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			star,
      split
		}
	};
</script>

<!-- lang="stylus" rel="stylesheet/stylus" -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .desc
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, .1))
        color: rgb(77, 85, 93)
        .star
          display: inline-block
          margin-right: 8px
          vertical-align: top
        .text
          display: inline-block
          line-height: 18px
          margin-right: 12px
          vertical-align: top
          font-size: 10px
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, .1)
          &:last-child
            border-right: none
          h2
            margin-bottom: 4px
            color: rgb(147, 153, 159)
            font-size: 10px
            line-height: 10px
          .content
            color: rgb(7, 17, 27)
            font-size: 10px
            font-weight: 200
            line-height: 24px
            .stress
              font-size: 24px

</style>
