<template>
  <div class="sides">
    <div class="panel">
    	<div class="inner info">
    		<p>CNode：Node.js专业中文社区</p>
    		<div>
    			您可以 <a href="#">登录</a> 或 <a href="#">注册</a>，也可以
		    	<button>通过 GitHub 登录</button>
    		</div>
    	</div>
    </div>
    <div class="panel">
    	<div class="header">关于作者</div>
    	<div class="inner">
    		<ul>
    			<li><a href="https://github.com/Gangyuanyuan">GitHub</a></li>
    			<li><a href="https://gangyuanyuan.top/">Blog</a></li>
    			<li><a href="https://www.jianshu.com/u/9f534f79952c">JianShu</a></li>
    		</ul>
    	</div>
    </div>
    <div class="panel">
    	<div class="header">客户端二维码</div>
    	<div class="inner client">
    		<img width="170" src="../assets/pixels.png" alt="">
    		<br>
    		<a href="https://github.com/soliury/noder-react-native" target="_blank">客户端源码地址</a>
    	</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sides'
  }
</script>

<style scoped>
  .sides{
  	float: right;
    width: 290px;
    font-size: 14px;
    margin-bottom: 20px;
    transition: all .2s ease-in-out;
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
  .inner p{
  	margin: 0 0 10px;
  }
  .inner.info a,
  .inner.client a{
		color: #778087;
		text-decoration: none;
  }
  .inner.info a:hover,
  .inner.client a:hover{
		text-decoration: underline;
  }
  .inner button{
  	background: #5bc0de;
  	color: #fff;
  	border: none;
		padding: 3px 10px;
		border-radius: 3px;
		line-height: 2em;
		font-size: 14px;
		cursor: pointer;
		letter-spacing: 2px;
  }
  .inner button:hover{
  	background: #2F96B4;
  }
  .inner ul{
  	list-style: none;
  	padding: 10px;
  }
  .inner ul li{
    background: #777;
    text-align: center; 
	  border-radius: 5px;
  }
  .inner ul li:not(:last-child){
		margin-bottom: 10px;
  }
  .inner ul li:hover{
  	background: #5bc0de;
  }
  li a{
  	text-decoration: none;
  	color: #fff;
  	font-size: 16px;
  	display: inline-block;
  	padding: 5px 0;
  }
  .inner.client{
  	padding: 20px 0;
  	text-align: center;
  }
  img{
  	height: auto;
  	vertical-align: middle;
  }
  .client a{
		font-size: 13px;
  }
</style>