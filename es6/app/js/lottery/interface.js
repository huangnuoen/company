/*接口*/
import $ from 'jquery';

//接口类
class Interface{
	/*获取遗漏数据
		issue 当前期号*/
	getOmit(issue) {
		let self = this;
		return new Promise(function(resolve, reject){
			//向服务端发送请求
			$.ajax({
				url: '/get/omit',//接口地址
				data: {
					issue: issue//前后端约定格式
				},
				dataType: 'json',
				success: function(res){
					self.setOmit(res, data) //将数据保存到变量
					resolve.call(self, res);
				},//请求成功的回调函数，传入处理后的数据为参数
				error: function(err){
					reject.call(err);
				}
			})
		});
	}

	/*获取开奖号码
		issue 当前期号*/
	getOpenCode(issue) {
		let self = this;
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '/get/opencode',
				data: {
					issue: issue
				},
				dataType: 'json',
				success: function(res) {
					self.setOpenCode(res, data);
					resolve.call(self, res);
				},
				error: function(err){
					reject.call(err);
				}
			})
		})
	}
	/*获取状态*/
	getState(issue) {
		let self = this;
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '/get/state',
				data: {
					issue: issue
				},
				dataType: 'json',
				success: function(res) {
					resolve.call(self, res);
				},
				error: function(err){
					reject.call(err);
				}
			})
		})

	}
}

export default Interface;