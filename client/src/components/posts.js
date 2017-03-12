import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link} from 'react-router';

import PostItem from './postItem';

class Posts extends Component{
    // 做下改进，不用每次刷新页面都重新加载数据
    // 让博客按发表的顺序从新到旧从上排到下

    // 组件第一次渲染前获取博客列表
    componentDidMount() {
        this.props.getPosts();
    }

    renderPosts(){
        if(this.props.posts){
            return this.props.posts.map(post=>{
                return (
                    <PostItem
                        key={post.id}
                        postId={post.id}
                        postTitle={post.title}
                    />
                );
            })
        }
    }

    render(){
        return(
            <ul className="list-group">
                <Link to="/posts/new">添加博客</Link>
                {this.renderPosts()}
            </ul>
        );
    }
}

function mapStateToProps(state){
    return {
        posts: state.post.posts,
        authenticated: state.auth.authenticated
    };
}


export default connect(mapStateToProps, actions)(Posts);