<template>
	<div class="topNavBar">
		<div class="container">
			<router-link :to="{name:'root'}" class="brand">
				<img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" alt="">
			</router-link>
			<form action="/search" class="searchBar">
				<input type="text" id="text" name="name">
			</form>
			<ul class="navRight">
				<li><a href="./APP.vue">首页</a></li>
				<li><a href="#">新手入门</a></li>
				<li><a href="#">API</a></li>
				<li><a href="#">关于</a></li>
				<li><a href="#">注册</a></li>
				<li><a href="#">登录</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Header'
	}
</script>

<style scoped>
	.topNavBar{
		background: #444444;
		width: 100%;
		height: 50px;
	}
	.topNavBar .container{
		width: 90%;
		margin: 0 auto;
		padding: 5px;
		max-width: 1400px;
		min-width: 960px;
		overflow: hidden; /*解决因子元素浮动父元素高度无法撑开的问题*/
	}
	.brand{
		display: block;
		float: left;
		width: 120px;
		height: 34px;
		line-height: 34px;
		padding: 3px 20px;
		margin-left: -20px;
		vertical-align: initial;
	}
	.searchBar{
		float: left;
		margin-top: 6px;
		margin-bottom: 0;
		font-size: 13px;
		border-radius: 15px;
	}
	.searchBar input{
		background: url(../assets/search.png) 4px 4px no-repeat #888;
		width: 206px;
		height: 20px;
		color: #666;
		border: none;
		border-radius: 15px;
		padding: 3px 5px 3px 22px;
		margin-top: 2px;
    transition: all 0.5s;
	}
	.searchBar input:hover{
    background-color: #fff;
	}
	.searchBar input:focus{
		background-color: #fff;
		border-color: rgba(82,168,236,.8);
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6);
	}
	.navRight{
		list-style: none;
		float: right;
		font-size: 0; /*消除li之间的空隙*/
	}
	.navRight li{
		display: inline-block;
		line-height: 20px;
	}
	.navRight li a{
		display: block;
		text-decoration: none;
		color: #ccc;
		padding: 10px 15px;
		font-size: 13px;
	}
	.navRight li a:hover {
    color: #fff;
}
</style>