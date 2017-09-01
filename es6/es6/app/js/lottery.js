import 'babel-polyfill';
//整合所有彩票相关模块
import Base from './lottery/base.js';
import Timer from './lottery/timer.js';
import Calculate from './lottery/calculate.js';
import Interface from  './lottery/interface.js';
import $ from 'jquery';

//深度copy
const copyProperties = function(target, source) {
	for(let key of Reflect.ownKeys(source)) {
		if(key !== 'constructor' && key !== 'prototype' && key !== 'name') {
			let desc = Object.getOwnPropertyDescriptor(source, key);
			Object.defineProperty(target, key, desc);
		}
	}
}

//多重继承
const mix = function(...mixins) {
	class Mix{};
	//继承每个类
	for(let mixin of mixins) {
		copyProperties(Mix, mixin);
		copyProperties(Mix.prototype, mixin.prototype);
	}
	return Mix;
}
//定义类继承多个类
class Lottery extends mix(Base, Calculate, Interface, Timer) {
	constructor(name = 'syy', cname = '11选5', issue = '**', state = '**') {
		super();
		this.name = name;
		this.cname = cname;
		this.issue = issue;
		this.state = state;
		this.omit = new Map();
		this.open_code = new Set();
		this.open_code_list = new Set();
		this.play_list = new Map();
		this.number = new Set();
		this.issue_el = '#curr_issue';
		this.countdown_el = '#countdown';
		this.cart_el = '.codelist';
		this.state_el = '.state_el';
		this.omit_el = '';
		this.cur_play = 'r5';
		this.initPlayList();
		this.initNumber();
		this.updateState();
		this.initEvent();
	}
	/*状态更新*/
	updateState() {
		let self = this;
		this.getState().then(function(res) {
			self.issue = res.issue;
			self.end_time = res.end_time;
			self.state = res.state;
			$(self.issue_el).text(res.issue);
			//倒计时开始
			self.countdown(res.end_time, function(time){
				$(self.countdown_el).html(time);
				//$(self.countdown_el).text(time);
			}, function(){
				//回调函数
				setTimeout(function(){
					//再次更新状态
					self.updateState();
					//获取遗漏 获取开奖号
					self.getOmit(self.issue).then(function(res) {});
					self.getOpenCode(self.issue).then(function(res){});
				}, 500)
			})
		});
	}
	/*初始化事件绑定*/
	initEvent() {
		let self = this;
		//玩法绑定
		$('#plays').on('click', 'li', self.changePlayNav.bind(self));//把this指向调用initEvent的当前对象
		//号码绑定
		$('.boll-list').on('click', '.btn-boll', self.toggleCodeActive.bind(self));
		//确认投注
		$('#confirm_sel_code').on('click', self.addCode.bind(self));
		//机选操作
		$('.qkmethod').on('click', '.btn-middle', self.getRandomCode.bind(self));
		//操作区
		$('.dxjo').on('click', 'li', self.assistHandle.bind(self));
	}
}

export default Lottery;
