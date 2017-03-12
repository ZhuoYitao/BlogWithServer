import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../actions';
import {Link} from 'react-router';

class PostCreate extends Component{
    formSubmit(formProps){
        this.props.createPost(formProps);
    }

    render(){
        const {handleSubmit, fields:{title, content}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>标题</label>
                    <input className="form-control" type="'text" {...title}/>
                </fieldset>
                <fieldset className="form-group">
                    <label>内容</label>
                    <textarea className="form-control" {...content}/>
                </fieldset>
                <button className="btn btn-primary" type="submit">发布</button>
                <Link id="new-post-back" to="/posts" className="btn btn-danger">返回</Link>
            </form>
        );
    }
}

export default reduxForm(
    {
        form: 'creatNewPost',
        fields: ['title', 'content']
    }, null, actions
)(PostCreate);