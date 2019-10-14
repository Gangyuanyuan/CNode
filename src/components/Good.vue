<template>
  <div class="good">
    <div class="loading" v-if="isLoading">
			<img src="../assets/loading.gif" alt="">
		</div>
		<div class="content" v-else>
			<div class="panel">
				<!-- 帖子导航 -->
				<div class="header">
					<a href="#" id="all" @click="changeAll">全部</a>
					<a href="#" id="good" class="current-tab" @click="changeGood">精华</a>
					<a href="#" id="share" @click="changeShare">分享</a>
					<a href="#" id="ask" @click="changeAsk">问答</a>
					<a href="#" id="job" @click="changeJob">招聘</a>
					<a href="#" id="client" @click="changeClient">客户端测试</a>
				</div>
				<!-- 帖子列表 -->
				<div class="inner">
					<div class="posts">
						<ul>
							<li v-for="post in arrGood">
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
								<!-- 帖子分类 -->
								<span class="put-good">精华</span>
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
								<pagination @handleList="renderList"></pagination>
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
		name: 'Good',
		data: function(){
			return{
				isLoading: false,
				posts: [],
				arrGood: [],
				postPage: 1
			}
		},
		components: {
			pagination
		},
		methods: {
			getData: function(){
				this.$http.get('https://cnodejs.org/api/v1/topics', {
					params: {
						page: this.postPage,
						limit: 20,
					}
				})
					.then((res)=>{
						this.isLoading = false // 加载成功去除动画
						this.posts = res.data.data
						for(let i=0; i<posts.length; i++){
							if(posts[i].good == true){
								if(arrGood.length<=20){
									arrGood.push(posts[i])
								}
							}
						}
						console.log(arrGood)
					})
					.catch(function(err){
						console.log(err)
					})
			},
    	renderList: function(value){
				this.postPage = value
				this.getData()
			},
			changeAll(){
				$('#all').addClass('current-tab').siblings().removeClass('current-tab')
			},
			changeGood(){
				$('#good').addClass('current-tab').siblings().removeClass('current-tab')
			},
			changeShare(){
				$('#share').addClass('current-tab').siblings().removeClass('current-tab')
			},
			changeAsk(){
				$('#ask').addClass('current-tab').siblings().removeClass('current-tab')
			},
			changeJob(){
				$('#job').addClass('current-tab').siblings().removeClass('current-tab')
			},
			changeClient(){
				$('#client').addClass('current-tab').siblings().removeClass('current-tab')
			}
		},
		beforeMount(){
			this.isLoading = true
			this.getData()
		}
  }
</script>

<style scoped>
  .loading {
    text-align: center;
    padding-top: 240px;
  }
	.content{
		padding: 0 100px;
	}
	.panel{
		margin-bottom: 13px;
	}
	.header{
		background: #F6F6F6;
		border-radius: 3px 3px 0 0;
		padding: 10px;
	}
	.header a{
		text-decoration: none;
		color: #80BD01;
		margin: 0 10px;
		cursor: pointer;
	}
	.header a:hover{
		color: #005580;
	}
	.header a.current-tab{
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
	.posts li:nth:child(1){
		border-top: none;
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
	.put-good,{
		background: #80bd01;
		color: #fff;
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
</style>