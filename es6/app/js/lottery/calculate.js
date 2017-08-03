class Calculate {
	/*计算注数
		@param {number} active [当前选中号码个数]
		@param {string} play_name [当前玩法标识]
		@return {number} [注数]*/
	computeCount(active, play_name) {
		let count = 0;
		const exist = this.play_list.has(play_name);//玩法列表任一到任八
		const arr = new Array(active).fill(0);//生成长度为active的数组,默认元素为0
		if(exist && play_name.at(0) === 'r') {
			count = Calculate.combine(arr, play_name.split('')[1]);//排列组合计算注数
		}
		return count;
	}

	/* 奖金范围预测
			@param {number} active     [当前选中的号码个数]
			@param {string} play_name    [当前玩法标识] 任二表示2个一注
			@return {array}        [奖金范围]*/
	computeBonus(active, play_name) {
		const play = play_name.split('');
		const self = this;
		//长度为玩法标识，元素为0的数组
		let arr = new Array(play[1] * 1).fill(0);
		let min, max;
		if(play[0] === 'r') {
			let min_active = 5 - (11 - active);//最小命中数
			if(min_active > 0) {//即至少要买7个码
				if(min_active >= play[1]) {
					arr = new Array(min_active).fill(0);
					//根据基数，单独计算会命中的号码生成的注数，全中
					min = Calculate.combine(arr, play[1]).length;
				} else {// 命中数小于玩法基数时
					//任6 7 8 ,且选中号码数大于等于玩法基数
					if(play[1] > 5 && active >= play[1]) {
						arr = new Array(active-5).fill(0);
						//
						min = Calculate.combine(arr, play[1]-5).length;
					} else {
						min = active-play[1]>-1 ? 1 : 0;
					}
				}
			} else {
				min = active-play[1]>-1 ? 1 : 0;
			}
		}
	}	

	/* 排列组合计算 静态方法
			@param {arrary} arr     [参加组合运算的数组]
			@param {string} size    [组合运算的基数]
			@return {number}        [注数]*/
	static combine(arr, size) {
		let allResult = [];//存放所有组合情况
		(function f(arr, size, result) {
			let arrLen = arr.length;
			if(size > arrLen) {
				return;
			}
			if(size === arrLen) {
				allResult.push([].concat(result, arr));//只有1种组合情况，将参加运算的数组和结果数组连接，添加到所有结果数组中
			} else {
				for(let i = 0; i < arrLen; i++) {
					let newResult = [].concat(result);//生成一个新数组
					newResult.push(arr[i]);//添加参加运算的数组元素
					if(size === 1) {//基数为1时，说明已经到最后一个元素，添加新结果，不需再递归
						allResult.push(newResult);
					} else {
						let newArr = [].concat(arr); 
						newArr.splice(0, i+1);//删除从0位置到i位置的元素,形成新子集进行下一步运算
						f(newArr, size-1, newResult);//再调用f(),传入去掉已经作为第一个元素的newArr，基数-1，要与剩余元素组合的newResult
					}
				}
			}
		})(arr, size, []);
		return allResult;
	}

}