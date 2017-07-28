/*解构赋值*/
{
	let metaData = {
		title: 'json',
		desc: [{title: 'description'}]
	};
	let {title, desc} = metaData;
	console.log(title, desc);//json [Object]
}