import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Header extends Component{
    signoutClick(){
        this.props.signoutUser();
    }

    renderLinks(){
        // if(!this.props.authenticated){
        if(this.props.authenticated || localStorage.getItem('token')){
            return (
                <div className="nav nav-bar-nav navAuth">
                    {/*使用onclick进行跳转的话不能跳转到自己设定的url上，有bug？?*/}
                    <Link to="/signout" className="navbar-brand">登出</Link>
                </div>
            );
        }else{
            return (
                <div className="nav nav-bar-nav navAuth">
                    <Link to="/signin" className="navbar-brand" ref="test">登录</Link>
                    <Link to="/signup" className="navbar-brand">注册</Link>
                </div>
            );
        }
    }

    render(){
        return (
            <nav className="navbar navbar-light my_nav">
                <Link to="/" className="navbar-brand">返回首页</Link>
                <Link to="/posts" className="navbar-brand">我的博客</Link>
                {this.renderLinks()}
            </nav>
        );
    }
}

function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps, actions)(Header);