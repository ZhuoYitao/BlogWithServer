import axios from 'axios';
import {browserHistory} from 'react-router';

export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';
export const GET_POSTS = 'GET_POSTS';

// 记得添加请求用到的协议，例如http
const ROOT_URL = 'http://localhost:3090';

// 用于发起注册请求
export function signupUser({email, password}){
    // 使用redux-thunk作为middle-ware的话，action返回函数
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password}).then((response)=>{
            // dispatch接收一个action作为参数
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', response.data.token);
            // 返回上一个页面
            browserHistory.goBack();
        }).catch((response)=>{
            dispatch(authError(response.response.data.error));
            // 注意第三方库的API可能改动
            // 这可以是bug的成因之一
            // dispatch(authError(response.data.error));
        });
    }
}

export function signinUser({email, password}){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signin`, {email, password}).then(
            response=>{
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/');
                // browserHistory.goBack();
            }
        ).catch((response)=>{
            console.log(response.response);
            dispatch(authError(response.response.data));
        });
    }
}

export function signoutUser(){
    return function(dispatch){
        dispatch({
            type: AUTH_SIGNOUT
        });
        localStorage.removeItem('token');
        browserHistory.push('/signout');
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function getPosts(){
    return function(dispatch){
        console.log('发出get posts请求');
        axios.get(`${ROOT_URL}/posts`,{
            headers: {authorization: localStorage.getItem('token')}
        }).then(response=>{
            dispatch({
                type: GET_POSTS,
                payload: response.data.posts
            });
        });
    }
}

export function clearPosts(){
    return {
        type: 'clearPosts'
    };
}

export function createPost({title, content}){
    return function(dispatch){
        // 怎么同时使用axios.post和server端的jwt认证？
        // post时，第二个参数是request.body
        // 第三个参数用于提供request.headers
        // 只要在request.headers里正确得提供认证所需的token
        // 就可以同时使用axios.post和jwt认证了
        axios.post(`${ROOT_URL}/posts/new`,
            {title, content},
            {headers: {
                authorization: localStorage.getItem('token')
            }}
            ).then(response=>{
            dispatch({
                type: 'createPost',
                payload: {
                    'postId': response.data.postId,
                    'title': title
                }
            });
            browserHistory.goBack();
        }).catch(error=>{
            console.log(error);
        });
    }
}

export function deletePost(postId){
    return function(dispatch){
        axios.delete(`${ROOT_URL}/posts/${postId}`,
            {headers:{authorization:localStorage.getItem('token')
            }}
        ).then(response=>{
            console.log('deleted');
            dispatch({
                type: 'deletePost',
                payload: postId
            });
        }).catch(error=>{
            console.log(error);
        });
    }
}

export function getPostDetail(postId){
    return function(dispatch){
        axios.get(`${ROOT_URL}/posts/${postId}`,
            {headers:{
            authorization: localStorage.getItem('token')
            }}
        ).then(response=>{
            dispatch({
                type: 'getPostDetail',
                payload: response.data
            })
        }).catch(error=>{
            console.log(error)
        });
    }
}