/* 浏览器缓存 */
import storage from 'good-storage'

// 定义不同key
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

// 保存搜索历史
export function saveSearch(query) {
	// 先获取该key缓存，如果还没有，则默认为空数组
	let searches = storage.get(SEARCH_KEY, [])
	// 查找当前值是否存在缓存中，并插入
	insertArray(searches, query, (item) => {
		return item === query
	}, SEARCH_MAX_LENGTH)
	
	// 存入缓存
	storage.set(SEARCH_KEY, searches)

	return searches
}

// 查找值是否存在缓存中，并插入arr
function insertArray(arr, val, compare, maxLen) {
	// 找到val在arr的位置
	const index = arr.findIndex(compare)
	// 在第一个时
	if (index === 0) {
		return
	}
  // 有且不在第一个，先删除再插入最前
	if (index > 0) {
		arr.splice(index, 1)
	}
	arr.unshift(val)
	// 超出最大长度时删除最后一条
	if (maxLen && arr.length > maxLen) {
		arr.pop()
	}
}

// 读取本地搜索缓存
export function loadSearch() {
	return storage.get(SEARCH_KEY, [])
}