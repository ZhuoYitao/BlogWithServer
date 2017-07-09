import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';
import * as actions from '../actions';


// class PostEdit extends Component{
//     componentDidMount(){
//         this.props.getPostDetail(this.props.params.postId);
//     }
//
//     formSubmit(formProps){
//         this.props.editPost(formProps);
//     }
//
//     render(){
//         return (
//             <div>
//                 Edit
//                 <h3>{this.props.postDetail.title}</h3>
//                 <p>{this.props.postDetail.content}</p>
//             </div>
//         );
//     }
// }

class PostEdit extends Component{
    componentDidMount(){
        this.props.getPostDetail(this.props.params.postId);
    }

    formSubmit(formProps){
        // 用户没修改过title，则直接用之前的title
        if(formProps.title===undefined || formProps.title===''){
            formProps.title = this.props.postDetail.title;
        }
        // 用户没修改过content，则直接用之前的content
        if(formProps.content===undefined || formProps.content===''){
            formProps.content = this.props.postDetail.content;
        }
        // Todo：更改editPost这个action, 使其能发送请求给服务器，从而修改服务器里这篇post的数据
        this.props.editPost({...formProps, postId: this.props.params.postId});
    }

    render(){
        const {handleSubmit, fields:{title, content}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>标题</label>
                    <input className="form-control" type="'text" {...title} placeholder={this.props.postDetail.title}/>
                </fieldset>
                <fieldset className="form-group">
                    <label>内容</label>
                    <textarea className="form-control" {...content} placeholder={this.props.postDetail.content}/>
                </fieldset>
                <button className="btn btn-primary" type="submit">更改</button>
                <Link id="new-post-back" to={`/posts/${this.props.params.postId}`} className="btn btn-danger">返回</Link>
            </form>
        );
    }
}

function mapStateToProps(state){
    return {
        postDetail: state.post.postDetail
    };
}

export default reduxForm(
    {
        form: 'editNewPost',
        fields: ['title', 'content']
    }, mapStateToProps, actions
)(PostEdit);