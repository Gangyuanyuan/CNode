<template>
  <div class="slidebar">
    <div class="panel">
    	<div class="header">
    		<span>作者</span>
    	</div>
    	<div class="inner author-summary">
    		<router-link :to="{
					name: 'user-info',
					params: {
						name: userinfo.loginname
					}
				}">
					<img :src="userinfo.avatar_url" alt="">
				</router-link>
				<span class="username">{{userinfo.loginname}}</span>
				<p class="score">积分：{{userinfo.score}}</p>
    	</div>
    </div>
    <div class="panel">
    	<div class="header">
    		<span>作者最近话题</span>
    	</div>
    	<div class="inner recent-topics">
    		<ul>
    			<li v-for="list in topicLimitBy5">
    				<router-link :to="{
    					name: 'post-content',
    					params: {
    						id: list.id,
    						name: list.author.loginname
    					}
    				}">
    					{{list.title}}
    				</router-link>
    			</li>
    		</ul>
    	</div>
    </div>
    <div class="panel">
    	<div class="header">
    		<span>作者最近回复</span>
    	</div>
    	<div class="inner recent-replies">
        <!-- 判断对象是否为空 -->
        <!-- 若直接用length判断，当请求的数据未返回时，length会报错 -->
        <ul v-if="userinfo.recent_replies!=undefined && userinfo.recent_replies.length>0">
    			<li v-for="list in replyLimitBy5">
    				<router-link :to="{
    					name: 'post-content',
    					params: {
    						id: list.id,
    						name: list.author.loginname
    					}
    				}">
    					{{list.title}}
    				</router-link>
    			</li>
    		</ul>
        <ul v-else> 
          <li>无</li>
        </ul>
    	</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SlideBar',
    data(){
    	return {
    		userinfo: {}
    	}
    },
    methods: {
      getData(){
        this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then((res)=>{
            if(res.data.success == true){
              this.isLoading = false
              this.userinfo = res.data.data
            }
          })
          .catch(function(err){
            console.log(err)
          })
      }
    },
    computed: {
    	topicLimitBy5(){
    		if(this.userinfo.recent_topics){
    			return this.userinfo.recent_topics.slice(0,5)
    		}
    	},
    	replyLimitBy5(){
    		if(this.userinfo.recent_replies){
    			return this.userinfo.recent_replies.slice(0,5)
    		}
    	}
    },
    beforeMount(){
      this.isLoading = true
      this.getData()
    }
  }
</script>

<style scoped>
  .slidebar{
  	float: right;
    width: 290px;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .panel{
  	margin-bottom: 13px;
  }
  .panel .header{
		padding: 10px;
  	background: #f6f6f6;
  	border-radius: 3px 3px 0 0;
  }
  .panel .inner{
    line-height: 2em;
    background: #fff;
    border-radius: 0 0 3px 3px;
    padding: 10px;
  }
  .inner img{
  	width: 48px;
  	height: 48px;
  	border-radius: 3px;
  	vertical-align: middle;
  }
  .inner .username{
  	color: #778087;
  	font-size: 16px;
  	margin-left: 10px;
  	max-width: 120px;
  	white-space: nowrap;
  	vertical-align: middle;
  }
  .inner .score{
		font-size: 14px;
		margin-top: 10px;
  }
  .inner ul{
  	list-style: none;
  	margin: 0 0 10px 0;
  }
  .inner ul li{
    background: #fff;
    font-size: 14px;
    line-height: 30px;
    max-width: 270px;
    white-space: nowrap;
  	overflow: hidden;
  	text-overflow: ellipsis;
  }
   a{
    text-decoration: none;
    color: #778087;
  }
</style>