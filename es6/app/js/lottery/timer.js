/*倒计时模块*/
class Timer {
	countdown(end, update, handle) {
		const now = new Date().getTime();//取得当前时间
		const self = this;
		if(now - end) {
			handle.call(self);//当前时间大于截止时间，即倒计时结束，执行回调
		} else {
			let last_time = end - now;//距离截止时间
			// a day's ms ,a hour's ms,a minute's ms,a second's ms
			const px_d = 24 * 60 * 60 * 1000; 
			const px_h = 60 * 60 * 1000; 
			const px_m = 60 * 1000;
			const px_s = 1000; 
			//剩余天数+小时数+分钟数+秒数
			let d = Math.floor(last_time/px_d);
			let h = Math.floor((last_time - d * px_d)/px_h);
			let m = Math.floor((last_time - d * px_d - h * px_h)/px_m);
			let s = Math.floor((last_time - d * px_d - h * px_h - m * px_m)/px_s);
			//存放
			let r = [];
			if(d > 0) {
				r.push(`<em>${d}</em>天`);
			}
			if(r.length || h > 0) {
				r.push(`<em>${h}</em>时`);
			}
			if(r.length || m > 0) {
				r.push(`<em>${m}</em>分`);
			}
			if(r.length || s > 0) {
				r.push(`<em>${s}</em>秒`);
			}
			self.last_time = r.join('');//保存变量
			update.call(self, r.join(''));//将变量传入更新函数
			setTimeout(function() {
				self.countdown(end, update, handle);
			}, 1000);//1s后再调用计时方法
		}
	}
}

export default Timer;