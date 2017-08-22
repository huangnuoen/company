/*
 * 本地存储
 */
export function saveToLocal(id, key, val) {
	// 数据存储在__seller__
	let seller = window.localStorage.__seller__;
	if (!seller) {
		// 先初始化seller
		seller = {};
		// 初始化该id
		seller[id] = {};
	} else {
		// 将seller字符串解析为对象
		seller = JSON.parse(seller);
		if (!seller[id]) {
			seller[id] = {};
		};
	}
	seller[id][key] = val;
	// 将seller对象转为json字符串
	// localStorage存储键值对字符串
	window.localStorage.__seller__ = JSON.stringify(seller);
};

/*
 * 本地读取
 * @def  默认值
 */
export function loadFromLocal(id, key, def) {
	let seller = window.localStorage.__seller__;
	if (!seller) {
		return def;
	}
	seller = JSON.parse(seller)[id];
	return seller[key] || def;
};
