<template>
  <div class="pagination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-if="jduge">......</button>
    <button v-for="btn in pagebtns" @click="changeBtn(btn)"
    	:class="[{currentPage:btn==currentPage},'pagebtn']">
    	{{btn}}
    </button>
    <button>......</button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
	import $ from 'jquery'

  export default {
    name: 'Pagination',
    props:[
      'tab'
    ],
    data(){
    	return {
    		pagebtns: [1,2,3,4,5],
    		currentPage: 1,
    		jduge: false
    	}
    },
    methods: {
    	changeBtn(page){
    		// 点击首页、上一页、下一页
    		if(typeof page != 'number'){
    			switch(page.target.innerText){
    				case '上一页':
    					$('button.currentPage').prev().click()
    					break
    				case '下一页':
    					$('button.currentPage').next().click()
    					break
    				case '首页':
    					this.pagebtns = [1,2,3,4,5]
    					this.changeBtn(1)
    					break
    				default:
    					break
    			}
    			return
    		}
    		this.currentPage = page
    		if(page == this.pagebtns[4]){
    			this.pagebtns.shift() // 移除第一个元素
    			this.pagebtns.splice(4,0,this.pagebtns[3]+1) // 添加最后一个元素
    		}else if(page==this.pagebtns[0] && page!=1){
    			this.pagebtns.unshift(this.pagebtns[0]-1) // 添加第一个元素
    			this.pagebtns.splice(5,1) // 移除最后一个元素
    		}
    		if(this.pagebtns.indexOf(1) == -1){
    			this.jduge = true;
    		}else{
    			this.jduge = false;
    		}
    		// if(page >= 5){
    		// 	this.jduge = true;
    		// }else if(page>1 && page<5 && this.pagebtns[4]>='6'){
    		// 	this.jduge = true;
    		// }else{
    		// 	this.jduge = false;
    		// }
    		this.$emit('handleList',this.currentPage)
    	}
    },
    watch: {
      // 页码发生跳转后点击帖子分类切换回到该分类首页
      tab: function(val, oldVal){
        this.pagebtns = [1,2,3,4,5]
        this.changeBtn(1)
      }
    }
  }
</script>

<style scoped>
  .pagination{
  	border: 1px solid #888;
  	border-radius: 5px;
  	padding: 6px 20px;
  	margin: 6px 0 20px 0;
  }
  button{
  	outline: 0;
  	background: #fff;
  	color: #778087;
  	border: 1px solid #ddd;
  	border-radius: 3px;
  	cursor: pointer;
  	padding: 5px 10px;
  	margin: 0 1px;
  	/*transition: all 0.5s;*/
  }
  .pagebtn{
  	padding: 5px 15px;
  	margin: 0 2px;
  }
  .currentPage {
    color: #fff;
    background-color: #1f1b1b;
  }
</style>