import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import * as actions from '../actions';

const rootReducer = combineReducers({
    form,
    auth: authReducer,
    post: postReducer
});

function authReducer(state={}, action){
    switch (action.type){
        case actions.AUTH_USER:
            return {...state, error: '', authenticated: true};
        case actions.AUTH_ERROR:
            return {...state, error: action.payload};
        case actions.AUTH_SIGNOUT:
            return {...state, authenticated: false};
        default:
            return state;
    }
};

function postReducer(state={posts:[], postDetail:{}}, action){
    let newPosts = [];
    switch (action.type){
        case actions.GET_POSTS:
            return {...state, posts: action.payload};
        case 'clearPosts':
            // 如果希望posts是个数组，就不要在重置它时将其设为空对象
            // 不然可能会引发type error
            return {...state, posts: []};
        case 'createPost':
            // 不能直接更新posts
            // 要生成一个新对象，然后把新对象赋给posts
            newPosts = [
                {'id': action.payload.postId, 'title':action.payload.title}
                ];
            for(let post of state.posts){
                newPosts.push(post);
            }
            return {...state, posts: newPosts};
        case 'deletePost':
            // 删除指定的postId
            newPosts = state.posts.filter((post)=>{
                return post.id != action.payload;
            });
            return {...state, posts: newPosts};
        case 'getPostDetail':
            return {...state, postDetail: action.payload};
        case 'editPostDetail':
            return {...state, postDetail: action.payload};
        default:
            return state;
    }
}

export default rootReducer;
