import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../actions';

class Signin extends Component{
    handleFormSubmit({email, password}){
        this.props.signinUser({email, password});
    }

    renderError(){
        if(this.props.errorMessage){
            return (
                <div>
                    <strong>{this.props.errorMessage}</strong>
                </div>
            );
        }
    }

    render(){
        const {handleSubmit, fields: {email, password}} = this.props;
        // bind用于告诉回调函数谁是它的this
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>登录邮箱:</label>
                    <input className="form-control" {...email}/>
                </fieldset>
                <fieldset className="form-group">
                    <label>密码:</label>
                    <input className="form-control" type="password"{...password}/>
                    {}
                </fieldset>
                {this.renderError()}
                <button action="submit" className="btn btn-primary">登录</button>
            </form>
        );
    }
}

function mapStateToProps(state){
    return {
        errorMessage: state.auth.error
    };
}

export default reduxForm({
    form: 'signin',
    fields: ['email','password']
}, mapStateToProps, actions)(Signin);