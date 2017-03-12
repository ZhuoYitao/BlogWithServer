import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

export default function(ComposedComponent){
    class RequireAuth extends Component{
        renderHelper(){
            console.log('render helper');
            if(this.props.authenticated || localStorage.getItem('token')){
                return <ComposedComponent {...this.props}/>;
            }else{
                return <Link to="/signin">您尚未登录，请点击此处登录</Link>
            }
        }

        render(){
            return (
                <div>
                    {this.renderHelper()}
                </div>
            );
        }
    }

    function mapStateToProps(state){
        return {
            authenticated: state.auth.authenticated
        };
    }

    return connect(mapStateToProps)(RequireAuth);
}
