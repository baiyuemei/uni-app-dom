<template>
	<view>
		<view class="input">
			<view class="uni-title">
				<text class="uni-title-text">
					<uni-icons custom-prefix="iconfont" type="icon-search" size="30"></uni-icons> 搜索</text>
				<text class="uni-subtitle-text" </text>
			</view>
		</view>
		<!-- 轮播图区域 -->
		<swiper class="top-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
			:circular="true">

			<!-- 循环渲染轮播图的 item 项 -->
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator :url="`/pages_sub1/product-detail/product-detail?pid=${item.goods_id}`"
					class="swiper-content">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航区域 -->
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="gotocateGory(item.name)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">

			<!-- 楼层 item 项 -->
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">

				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title">

					<!-- 楼层图片区域 -->
					<view class="floor-img-box">

						<!-- 左侧 1 个大图 -->
						<view class="left-img-box" @click="gotoLeft()">
							<image :src="item.product_list[0].image_src"
								:style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix"></image>
						</view>

						<!-- 右侧 4 个小图 -->
						<view class="right-img-box">
							<block v-for="(product, idx) in item.product_list" :key="idx" @click='gotoProduct()'>
								<view class="right-img-item" v-if="idx !== 0">
									<image :src="product.image_src" :style="{ width: product.image_width + 'rpx' }"
										mode="widthFix"></image>
								</view>
							</block>
						</view>

					</view>
				</image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []

			}
		},
		created() {
			this.getswiper()
			this.getnavList()
			this.getfloorList()
		},
		methods: {
			async getswiper() {
				const {
					message,
					meta: {
						status
					}
				} = await this.$fly.get("/home/swiperdata")

				if (status !== 200) {
					this.$msg()
				}
				this.swiperList = message

			},
			async getnavList() {

				const {
					message,
					meta
				} = await this.$fly.get("/home/catitems")

				if (meta.status !== 200) {
					this.$msg()
				}
				this.navList = message
			},
			gotocateGory(name) {
				if (name === "分类") {
					uni.switchTab({
						url: "/pages/category/category"
					})
				}

			},
			//获取楼层数据
			async getfloorList() {

				const {
					message,
					meta
				} = await this.$fly.get('home/floordata')
				if (meta.status !== 200) {
					this.$msg()
				}
				this.floorList = message

			}
		}
	}
</script>

<style lang="scss">
	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 30rpx 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.top-swiper {
		height: 330rpx;

		.swiper-content,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.input {

		height: 100rpx;
		// width: 100%;
		padding: 0rpx 18rpx 0rpx 18rpx;
		background-color: #b12318;
	}

	.uni-title-text {
		padding-left: 303rpx;
		padding-top: 10rpx;
		text-align: center;
		font-size: 31rpx;
		color: #0e0e0c;
	}

	.uni-title {
		display: flex;
		padding: 8rpx 13rpx;
		height: 60rpx;
		border-radius: 40rpx;
		// margin: 8px 8px;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #ffffff;
	}

	.uni-input {
		height: 80rpx;
		font-size: 15px;
		// padding: 8px;
		flex: 1;
		background-color: #ffffff;
	}

	.uni-icon {
		width: 24px;
		height: 24px;
	}

	.uni-input-placeholder-class {
		font-size: 10px;
	}

	.floor-title {
		display: flex;
		width: 100%;
		height: 60rpx;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}
</style>