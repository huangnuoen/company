/* 唯一入口文件 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
// 引入样式
import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
// Vue.config.productionTip = false;

let app = Vue.extend(App);

let router = new VueRouter({
	linkActiveClass: 'active' // vue1
});

router.map({// vue1
	'/goods': {
		component: goods
	},
	'/ratings': {
		component: ratings
	},
	'/seller': {
		component: seller
	}
});

router.start(app, '#app');// vue1
// router.go('/goods');// vue1
