// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
// import $ from 'jquery'

Vue.prototype.$http = Axios // 挂载到Vue原型上
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 时间过滤器
Vue.filter('formatDate', function(str){
	if(!str) return ''
	var date = new Date(str)
	var time = new Date().getTime() - date.getTime() // 现在时间-传入时间（毫秒）
	if(time < 0){
		return ''
	}else if(time/1000 < 30) {
		return '刚刚'
	}else if(time/1000 < 60) {
		return parseInt(time/1000) + ' 秒前'
	}else if(time/60000 < 60) {
		return parseInt(time/60000) + ' 分钟前'
	}else if(time/3600000 < 24) {
		return parseInt(time/3600000) + ' 小时前'
	}else if(time/86400000 < 31) {
		return parseInt(time/86400000) + ' 天前'
	}else if(time/2592000000 < 12) {
		return parseInt(time/2592000000) + ' 个月前'
	}else {
		return parseInt(time/31104000000) + ' 年前'
	}
})

// 处理帖子的分类显示
Vue.filter('tabFormatter',function(post){
	if(post.good == true){
		return '精华'
	}else if(post.top == true){
		return '置顶'
	}else if(post.tab == 'ask'){
		return '问答'
	}else if(post.tab == 'share'){
		return '分享'
	}else{
		return '招聘'
	}
})

// 搜索功能
var searchKey = document.querySelector('#text')
searchKey.onkeyup = function(e){
	if(e.key == 'Enter'){
		var value = document.getElementById("text").value
		window.open('http://www.baidu.com/s?wd='+value)
	}
}

// 点击添加类名
// var allList = document.getElementsByClassName('topic-tab')
// console.log(allList)

// var $allList = $(".topic-tab")
// console.log($allList)
// for(var i=0; i<allList.length; i++){
// 	$allList[i].click(function(){
// 		$allList[i].addClass("current-tab").siblings().removeClass("current-tab")
// 	})
// }



	


