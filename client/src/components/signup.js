import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../actions';

class Signup extends Component{
    handleFormSubmit(formProps){
        this.props.signupUser(formProps);
    }

    renderError(){
        if(this.props.errorMessage){
            console.log(this.props.errorMessage);
            return (
                <div className="alert alert-danger">
                    <strong>{this.props.errorMessage}</strong>
                </div>
            );
        }
    }

    render(){
        const {handleSubmit, fields:{email, password, passwordConfirm}} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input className="form-control" {...email} type="email"/>
                    {/* 如果这三个都是 true，则返回最后一个*/}
                    {email.touched && email.error && <div className="error">{email.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input className="form-control" {...password} type="password"/>
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <input className="form-control" {...passwordConfirm} type="password"/>
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderError()}
                <button action="sumbit" className="btn btn-primary">注册</button>
            </form>
        );
    }
}

// 只要表格的内容发生变动，这个validate函数就会被调用
// 注意，错误信息需要手动添加到html里
// formProps记录了表单各域的值
function validate(formProps){
    const errors = {};

    if(!formProps.email){
        errors.email = "请填入一个邮箱地址";
    }
    if(!formProps.password){
        errors.password = "请填入密码";
    }
    if(!formProps.passwordConfirm){
        errors.passwordConfirm = "请填入确认密码";
    }
    if(formProps.password!==formProps.passwordConfirm){
        errors.password = '密码不匹配';
    }
    // 可以检查下email是否已经被用过了

    return errors;
}

function mapStateToProps(state){
    return {errorMessage: state.auth.error}
}

// reduxForm是个high order component (HOC)，其修饰了Signup这个component
// HOC为被修饰的component提供额外的功能或数据，例如一个与global state关联了的表单
export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
},mapStateToProps, actions)(Signup);