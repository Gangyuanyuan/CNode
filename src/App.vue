<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="sides"></router-view>
      <router-view name="slidebar"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header'
  import PostList from './components/PostList'

  export default {
    name: 'App',
    components: {
      Header,
      PostList
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  body{
    background: #E1E1E1;
    font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif !important;
    font-size: 14px;
    word-break: break-word;
    line-height: 20px;
    color: #333;
    font-weight: 400;
  }
  ul{
    padding: 0;
    margin: 0; 
  }
  .main{
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 15px auto;
    min-height: 400px;
  }
</style>
