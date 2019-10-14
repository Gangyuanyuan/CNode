import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import Userinfo from '../components/Userinfo'
import SlideBar from '../components/SlideBar'
import Good from '../components/Good'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	name: 'root',
    	path: '/',
    	components: {
    		main: PostList
    	}
    },
    {
    	name: 'post-content',
    	path: '/topic/:id & author=:name',
    	components: {
    		main: Article,
            slidebar: SlideBar
    	}
    },
    {
        name: 'user-info',
        path: '/userinfo/:name',
        components: {
            main: Userinfo
        }
    },
    {
        name: 'good-list',
        path: '/Good',
        components: {
            main: Good
        }
    }
  ]
})
