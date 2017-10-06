import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from 'components/recommend/recommend'
// import Singer from 'components/singer/singer'
// import Rank from 'components/rank/rank'
// import Search from 'components/search/search'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import Disc from 'components/disc/disc'
// import TopList from 'components/top-list/top-list'
// import UserCenter from 'components/user-center/user-center'

Vue.use(Router)

// 懒加载组件
const Recommend = (resolve) => {
	// import()是异步入口，返回promise,调用resolve方法处理
	import('components/recommend/recommend').then((module) => {
		resolve(module)
	})
}

const Singer = (resolve) => {
	import('components/singer/singer').then((module) => {
		resolve(module)
	})
}

const Rank = (resolve) => {
	import('components/rank/rank').then((module) => {
		resolve(module)
	})
}

const Search = (resolve) => {
	import('components/search/search').then((module) => {
		resolve(module)
	})
}

const SingerDetail = (resolve) => {
	import('components/singer-detail/singer-detail').then((module) => {
		resolve(module)
	})
}

const Disc = (resolve) => {
	import('components/disc/disc').then((module) => {
		resolve(module)
	})
}

const TopList = (resolve) => {
	import('components/top-list/top-list').then((module) => {
		resolve(module)
	})
}

const UserCenter = (resolve) => {
	import('components/user-center/user-center').then((module) => {
		resolve(module)
	})
}

export default new Router({
	routes: [
		{
			// 设置默认值
			path: '/',
			redirect: '/recommend'
		},
		{
			path: '/recommend',
			component: Recommend,
			children: [
				{
					// 动态路径参数
					path: ':id',
					component: Disc
				}
			]
		},
		{
			path: '/singer',
			component: Singer,
			children: [
				{
					// 传入不同id生成不同路由
					path: ':id',
					component: SingerDetail
				}
			]
		},
		{
			path: '/rank',
			component: Rank,
			children: [
				{
					path: ':id',
					component: TopList
				}
			]
		},
		{
			path: '/search',
			component: Search,
			children: [
				{
					// 传入不同id生成不同路由
					path: ':id',
					component: SingerDetail
				}
			]
		},
		{
			path: '/user',
			component: UserCenter
		}
	]
})
