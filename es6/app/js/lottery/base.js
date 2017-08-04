import $ from 'jquery';
class Base {
	/* 初始化奖金，玩法和说明 */
	initPlayList(){
		//play_list是Map,
		this.play_list.set('r2', {
			bonus: 6,
			tip: '<span>从01～11中任选2个或多个号码，所选号码与开奖号码任意2个相同，即中奖<em class="red">6</em>元</span>',
			name: '任二'
		})
		.set('r3', {
			bonus: 19,
			tip: '<span>从01～11中任选3个或多个号码，所选号码与开奖号码任意3个相同，即中奖<em class="red">19</em>元</span>',
			name: '任三'
		})
		.set('r4', {
			bonus: 78,
			tip: '<span>从01～11中任选4个或多个号码，所选号码与开奖号码任意4个相同，即中奖<em class="red">78</em>元</span>',
			name: '任四'
		})
		.set('r5', {
			bonus: 540,
			tip: '<span>从01～11中任选5个或多个号码，所选号码与开奖号码任意5个相同，即中奖<em class="red">540</em>元</span>',
			name: '任五'
		})
		.set('r6', {
			bonus: 90,
			tip: '<span>从01～11中任选6个或多个号码，所选号码与开奖号码任意6个相同，即中奖<em class="red">90</em>元</span>',
			name: '任四'
		})
		.set('r7', {
			bonus: 26,
			tip: '<span>从01～11中任选7个或多个号码，所选号码与开奖号码任意7个相同，即中奖<em class="red">26</em>元</span>',
			name: '任四'
		})
		.set('r8', {
			bonus: 9,
			tip: '<span>从01～11中任选8个或多个号码，所选号码与开奖号码任意8个相同，即中奖<em class="red">9</em>元</span>',
			name: '任四'
		})
	}
	/* 初始化号码 */
	initNumber() {
		for(let i = 1; i < 12; i++) {
			//mumber是Set, 将号码转为2位的字符串
			this.number.add(''+ i).padStart(2, '0');
		}
	}
	/* 设置遗漏数据 */
	setOmit(omit) {
		let self = this;
		self.omit.clear();//先清空，Map对象
		for(let [index, item] of omit.entries()) {
			self.omit.set(index, item);//储存新的
		}
		$(self.omit_el).each(function(index, item) {
			$(item).text(self.omit.get(index));
		});
	}

	/* 设置开奖 */
	setOpenCode(code) {
		let self = this;
		self.open_code.clear();
		for(let item of code.values()) {
			self.open_code.add(item);//Set对象，号码不重复
		}
		//更新开奖号
		self.updateOpenCode && self.updateOpenCode.call(self, self.open_code);
	}

	/* 号码选中取消 */
	toggleCodeActive(e) {
		let self = this;
		let $cur = $(e.currentTarget);//触发事件的元素
		$cur.toggleClass('btn-boll-active');
		//
		self.getCount();
	}

	/* 玩法切换  玩法提示切换 */
	changePlayNav(e) {
		let self = this;
		let $cur = $(e.currentTarget);
		$cur.addClass('active').siblings().removeClass('active');
		//将当前玩法转换为小写，储存在cur_play
		self.cur_play = $cur.attr('desc').toLocaleLowerCase();
		$('#zx_sm span').html(self.play_list.get($cur_play).tip);
		//并清空当前选中的号码
		$('.boll-list .btn-boll').removeClass('btn-boll-active');
		//重新计算
		self.getCount();
	}

	/* 操作区 */
	assistHandle(e) {
		e.preventDefault();
		let self = this;
		let $cur = $(e.currentTarget);
		//相对于同胞元素的位置
		let index = $cur.index();
		//无论点击哪里，先清除
		$('.boll-list .btn-boll').removeClass('btn-boll-active');
		if(index === 0) {
		$('.boll-list .btn-boll').addClass('btn-boll-active');
		}
		if(index === 1) {
			$('.boll-list .btn-boll').each(function(i, item) {
				if(item.textContent - 5 > 0) {
					$(item).addClass('btn-boll-active');
				}
			})
		}
		if(index === 2) {
			$('.boll-list .btn-boll').each(function(i, item) {
				if(item.textContent - 5 <= 0) {
					$(item).addClass('btn-boll-active');
				}
			})
		}
		if(index === 3) {
			$('.boll-list .btn-boll').each(function(i, item) {
				if(item.textContent % 2 = 1) {
					$(item).addClass('btn-boll-active');
				}
			})
		}
		if(index === 4) {
			$('.boll-list .btn-boll').each(function(i, item) {
				if(item.textContent % 2 = 0) {
					$(item).addClass('btn-boll-active');
				}
			})
		}
	}

	/* 获取彩票名称 */
	getName(){
		return this.name;//this.playList.name
	}

	/* 添加号码 */
	addCode() {
		let self = this;
		$active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);//text返回所有元素的文本组成的字符串，再用match匹配2位一个的数组
		let active = $active ? $active.length : 0;
		let count = self.computeCount(active, self.cur_play);
		if(count > 0) {
			self.addCodeItem($active.join(' '), self.cur_play, self.playList.get(self.cur_play).name, count);
		}
	}

	/* 添加当前投注号码到列表 */
	addCodeItem(code, type, typeName, count) {
		let self = this;
		const tpl = `
		<li codes="${type}|${code}" bonus="${count*2}" count="${count}">
			<div class="code">
				<b>${typeName}${count>1 ? '复式' : '单式'}</b>
				<b class="em">${code}</b>
				[${count}, <em class="code-list-money">${count*2}</em>]
			</div>
		</li>
		`;
	}
}