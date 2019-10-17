<template>
	<div class="postlist">
		<!-- 在数据未返回的时候，显示这个正在加载的gif -->
		<div class="loading" v-if="isLoading">
			<img src="../assets/loading.gif" alt="">
		</div>
		<div class="content" v-else>
			<div class="panel">
				<!-- 帖子导航 -->
				<div class="header">
					<span :class="{'current-tab':active==1}" @click="changeTab('all',1)">全部</span>
					<span :class="{'current-tab':active==2}" @click="changeTab('good',2)">精华</span>
					<span :class="{'current-tab':active==3}" @click="changeTab('share',3)">分享</span>
					<span :class="{'current-tab':active==4}" @click="changeTab('ask',4)">问答</span>
					<span :class="{'current-tab':active==5}" @click="changeTab('job',5)">招聘</span>
					<span :class="{'current-tab':active==6}" @click="changeTab('',6)">客户端测试</span>

					<!-- <a href="#" v-for="(item,index) in parts" @click="changeClass(index)"
					:class="[{'current-tab':index==currentClick},'topic-tab']">{{item}}</a> -->
				</div>
				<!-- 帖子列表 -->
				<div class="inner">
					<div class="posts">
						<ul>
							<li v-for="post in posts">
								<!-- 头像 -->
								<router-link :to="{
									name: 'user-info',
									params: {
										name: post.author.loginname
									}
								}">
									<img :src="post.author.avatar_url" alt="">
								</router-link>
								<!-- 回复量/浏览量 -->
								<span class="all-count">
									<span class="reply-count">{{post.reply_count}}</span>
									<span class="count-seperator">/</span>
									<span class="visit-count">{{post.visit_count}}</span>
								</span>
								<!-- 帖子分类（动态绑定class） -->
								<span :class="[{'put-good':(post.good == true),'put-top':(post.top == true),'topiclist-tab':(post.good != true && post.top != true)}]">{{post | tabFormatter}}</span>
								<!-- 帖子标题 -->
								<router-link :to="{
									name: 'post-content',
									params: {
										id: post.id,
										name: post.author.loginname
									}
								}">
									<span class="topic-title">{{post.title}}</span>
								</router-link>
								<!-- 最终回复时间 -->
								<span class="last-time">
									{{post.last_reply_at | formatDate}}
								</span>
							</li>
							<li>
								<!-- 分页 -->
								<pagination @handleList="renderList" :tab='tab'></pagination>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import pagination from './Pagination'

	export default {
		name: 'PostList',
		data: function(){
			return{
				isLoading: false,
				// parts: ['全部','精华','分享','问答','招聘','客户端测试'],
				// currentClick: 0,
				posts: [], // 代表页面列表的数组
				pageNumber: 1,
				tab: '',
				active: 1
			}
		},
		components: {
			pagination
		},
		methods: {
			getData: function(){
				this.$http.get('https://cnodejs.org/api/v1/topics', {
					params: {
						page: this.pageNumber,
						limit: 20,
						tab: this.tab
					}
				})
					.then((res)=>{
						this.isLoading = false // 加载成功去除动画
						this.posts = res.data.data
					})
					.catch(function(err){
						console.log(err)
					})
			},
			// changeClass: function(index){
    	// 	this.currentClick = index
    	// },
    	changeTab: function(value, index){
    		this.tab = value
				this.active = index
				this.getData()
			},
    	renderList: function(value){ // 翻页
				this.pageNumber = value
				this.getData()
			}
		},
		beforeMount(){
			this.isLoading = true // 加载成功之前显示加载动画
			this.getData() //  在页面加载之前获取数据
		}
	}
</script>

<style scoped>
	.loading {
    text-align: center;
    padding-top: 240px;
  }
	.content{
		padding: 0;
		margin-right: 305px;
	}
	.panel{
		margin-bottom: 13px;
	}
	.header{
		background: #F6F6F6;
		border-radius: 3px 3px 0 0;
		padding: 10px;
	}
	.header span{
		text-decoration: none;
		color: #80BD01;
		margin: 0 10px;
		cursor: pointer;
	}
	.header span:hover{
		color: #005580;
	}
	.header span.current-tab{
		background: #80BD01;
		color: #fff;
		padding: 3px 4px;
		border-radius: 3px;
	}
	.inner{
		background: #fff;
		border-radius: 0 0 3px 3px
	}
	.posts ul{
		list-style: none;
		width: 100%;
	}
	.posts li{
		border-top: 1px solid #F0F0F0;
		padding: 10px;
		font-size: 14px;
		line-height: 2em;
		overflow: hidden;
	}
	.posts li:first-child{
		border-top: none;
	}
	.posts li:hover {
	  background: #f5f5f5;
	}
	.posts li img{
		width: 30px;
		height: 30px;
		float: left;
	}
	.posts li .all-count{
		width: 70px;
		dispaly: inline-block;
		text-align: center;
		float: left;
	}
	.posts .reply-count{
		color: #9E78C0;
	}
	.posts .count-seperator{
		font-size: 10px;
		margin: 0 -3px;
	}
	.posts .visit-count{
		font-size: 10px;
		color: #B4B4B4;
	}
	.posts li .last-time{
		color: #778087;
		font-size: 11px;
		float: right;
		margin-left: 20px;
	}
	.put-good,
	.put-top{
		background: #80bd01;
		color: #fff;
		font-size: 12px;
		padding: 2px 4px;
		border-radius: 3px;
	}
	.topiclist-tab{
		background: #e5e5e5;
		color: #999;
		font-size: 12px;
		padding: 2px 4px;
		border-radius: 3px;
	}
	.topic-title{
		color: #333;
		font-size: 16px;
		line-height: 30px;
		display: inline-block;
		vertical-align: bottom; /*解决同时设置inline-block和hidden出现的高度不一致*/
		max-width: 70%;
		white-space: nowrap; /*不换行*/
		text-overflow: ellipsis; /*用省略符号替代被修剪的文本*/
		overflow: hidden;
	}
	a span:hover{
		text-decoration: underline;
	}
</style>