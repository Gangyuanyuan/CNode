<template>
  <div class="userinfo">
    <div class="loading" v-if="isLoading">
			<img src="../assets/loading.gif" alt="">
		</div>
		<div class="content" v-else>
      <div class="panel">
        <div class="header">
          <a href="#">主页</a>
          <span class="divider"> /</span>
        </div>
        <div class="inner userinfo">
          <img :src="userinfo.avatar_url" alt="">
          <span class="name">{{userinfo.loginname}}</span>
          <p class="score">{{userinfo.score}} 积分</p>
          <p class="col">注册时间 {{userinfo.create_at | formatDate}}</p>
        </div>
      </div>
        
      <div class="panel">
        <div class="header">
          <span>最近创建的话题</span>
        </div>
        <div v-if="userinfo.recent_topics.length>0">
          <li v-for="item in userinfo.recent_topics">
            <img :src="item.author.avatar_url" alt="">
            <router-link :to="{
              name: 'post-content',
              params: {
                id: item.id
              }
            }">
              <span class="topic-title">
                {{item.title}}
              </span>
            </router-link>
            <span class="last-time">
              {{item.last_reply_at | formatDate}}
            </span>
          </li>
        </div>
        <div v-else>
          <li>无话题</li>
        </div>
      </div>
      <div class="panel">
        <div class="header">
          <span>最近参与的话题</span>
        </div>
        <div v-if="userinfo.recent_replies.length>0">
          <li v-for="item in userinfo.recent_replies">
            <img :src="item.author.avatar_url" alt="">
            <router-link :to="{
              name: 'post-content',
              params: {
                id: item.id
              }
            }">
              <span class="topic-title">
                {{item.title}}
              </span>
            </router-link>
            <span class="last-time">
              {{item.last_reply_at | formatDate}}
            </span>
          </li>
        </div>
        <div v-else>
          <li>无话题</li>
        </div>
      </div>
		</div>
  </div>
</template>

<script>
  export default {
    name: 'Userinfo',
    data(){
    	return{
    		isLoading: false,
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
    beforeMount(){
      this.isLoading = true
      this.getData()
    }
  }
</script>

<style scoped>
  .loading{
    text-align: center;
    padding-top: 240px;
  }
  .content{
    padding: 0 150px;
  }
  .panel{
    margin-bottom: 13px;
  }
  .header{
    padding: 10px;
    background: #f6f6f6;
    border-radius: 3px 3px 0 0;
  }
  .header a{
    color: #80bd01;
  }
  .header .divider{
    color: #ccc;
  }
  .header span{
    color: #444;
  }
  .panel .inner{
    line-height: 2em;
    background: #fff;
    border-radius: 0 0 3px 3px;
  }
  .panel .inner.userinfo{
    padding: 10px;
    border-top: 1px solid #e5e5e5;
  }
  .inner.userinfo img{
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 3px;
  }
  .inner.userinfo .name{
    margin-left: 10px;
    color: #778087;
  }
  .inner.userinfo .score{
    margin-top: 20px;
  }
  .inner.userinfo .col{
    color: #ababab;
  }
  .inner.userinfo p{
    margin: 0 0 6px;
  }
  li{
    list-style: none;
    padding: 10px;
    background: #fff;
    border-top: 1px solid #f0f0f0;
  }
  li img{
    float: left;
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }
  li .last-time{
    float: right;
    font-size: 11px;
    color: #777;
    margin-left: 20px;
  }
  li .topic-title{
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    line-height: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 20px;
  }
  a{
    text-decoration: none;
    color: #08c;
  }
</style>