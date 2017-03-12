import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../actions';
import {connect} from 'react-redux';

class Signout extends Component{
    componentWillMount(){
        this.props.signoutUser();
        this.props.clearPosts();
    }

    render(){
        return (
            <Link to="/">您已成功退出，点击此处可以返回首页。</Link>
        );
    }
}

export default connect(null, actions)(Signout);