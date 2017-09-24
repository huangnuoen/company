import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'
import TopList from 'components/top-list/top-list'

Vue.use(Router)

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
			component: Search
		}
	]
})
