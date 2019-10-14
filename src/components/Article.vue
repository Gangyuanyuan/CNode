<template>
  <div class="article">
		<div class="loading" v-if="isLoading">
			<img src="../assets/loading.gif" alt="">
		</div>
		<div class="content" v-else>
			<!-- 文章模块 -->
			<div class="panel">
				<!-- 标题栏 -->
				<div class="header topic">
					<span class="topic-title">{{post.title}}</span>
					<ul>
						<li>• 发布于 {{post.create_at | formatDate}}</li>
						<li>• 作者 {{post.author.loginname}}</li>
						<li>• {{post.visit_count}} 次浏览</li>
						<li>• 来自 {{post | tabFormatter}}</li>
					</ul>
				</div>
				<!-- 文章内容 -->
				<div class="inner topic">
					<div class="topic-content markdown-body" v-html="post.content"></div>
				</div>
			</div>
			<!-- 评论模块 -->
			<div class="panel">
				<div class="header reply">
					<span>{{post.reply_count}} 回复</span>
				</div>
				<div v-for="(reply,index) in post.replies" class="reply-item">
					<div class="author-content">
						<router-link :to="{
							name: 'user-info',
							params: {
								name: reply.author.loginname
							}
						}">
							<img :src="reply.author.avatar_url" alt="">
						</router-link>
						<div class="information">
							<span class="reply-author">{{reply.author.loginname}}</span>
							<span class="reply-time">{{index+1}}楼 •{{reply.create_at | formatDate}}</span>
						</div>
						<div class="ups">
							<span v-if="reply.ups.length>0">☝ {{reply.ups.length}}</span>
							<span v-else></span>
						</div>
					</div>
					<div class="reply-content" v-html="reply.content"></div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
  export default {
    name: 'Article',
    data(){
    	return {
    		isLoading: false,
    		posts: [] // 当前文章页面的所有内容和属性
    	}
    },
    methods: {
    	getArticleData(){
    		this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
    			.then((res)=>{
    				if(res.data.success == true){
    					this.isLoading = false
    					this.post = res.data.data
    				}
    			})
    			.catch(function(err){
    				console.log(err)
    			})
    	}
    },
    beforeMount(){
    	this.isLoading = true
    	this.getArticleData()
    },
    // 检测路由变化并对其做出响应
   	watch:{
      '$route'(to,from){
      	this.isLoading = true
        this.getArticleData()
      }
    }
  }
</script>

<style>
	/*@import '../assets/markdown-github.css';*/
	.article .loading{
		text-align: center;
		padding-top: 240px;
	}
	.article .content{
		padding: 0;
		margin-right: 305px;
	}
	.article .panel{
		margin-bottom: 13px;
	}
	.article .header{
		padding: 10px;
		background: #f6f6f6;
		border-radius: 3px 3px 0 0;
	}
	.article .header.topic{
		background: #fff;
	}
	.article .topic-title{
		font-size: 22px;
		font-weight: 700;
		padding: 8px 0;
		display: inline-block;
		vertical-align: bottom;
		width: 75%;
		line-height: 130%;
	}
	.article .header.topic ul{
		list-style: none;
	}
	.article .header.topic ul li{
		display: inline-block;
		font-size: 12px;
    color: #838383;
	}
	.article .panel .inner{
		line-height: 2em;
		background: #fff;
		border-radius: 0 0 3px 3px;
	}
	.article .panel .inner.topic{
		padding: 10px;
    border-top: 1px solid #e5e5e5;
	}
	.article .topic-content{
		margin: 0 10px;
		white-space: normal;
	}
	.article .markdown-text img {
    width: 92% !important;
  }
  .article .header.reply span{
    color: #444;
  }
  .article .reply-item{
  	padding: 10px;
  	background: #fff;
  	font-size: 14px;
  	border-top: 1px solid #f0f0f0;
  	overflow: hidden;
  }
  .article .reply-item img{
  	display: inline-block;
  	float: left;
  	width: 30px;
  	height: 30px;
  	border-radius: 3px;
  	vertical-align: middle;
  }
	.article .reply-item .information{
		margin-left: 10px;
		display: inline-block;
	}
	.article .reply-item .information .reply-author{
		color: #666;
		font-size: 12px;
		font-weight: 700;
	}
	.article .reply-item .information .reply-time{
		color: #08c;
		font-size: 11px;
	}
	.article .reply-item .ups{
		float: right;
		margin-left: 20px;
		font-size: 15px;
	}
	.article .reply-item .reply-content{
		margin-left: 50px;
		color: #333;
	}
	.article .reply-content p{
		font-size: 15px;
    line-height: 1.7em;
    overflow: auto;
	  margin-bottom: 15px;
	  word-wrap: break-word;
	}
	.article a{
		text-decoration: none;
		color: #08c;
	}
</style>