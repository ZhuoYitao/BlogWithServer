import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// 带有隐藏元素的block元素
// 需要:
// 1. 调用者声明自己的身份，即在属性栏里添加"caller={this}"
// 2. 调用者声明隐藏元素的个数，即在属性栏里添加"hiddenNum={<number>}"
// 3. 隐藏元素拥有"hidden-<number>"这个ref
class BlockWithHiddenEles extends Component{
    divOnMouseEnter(){
        for(let i=0;i<this.props.hiddenNum;i++){
            ReactDOM.findDOMNode(this.props.caller.refs["hidden-"+i]).style.display = "inline";
        }
    }

    divOnMouseLeave(){
        for(let i=0;i<this.props.hiddenNum;i++){
            ReactDOM.findDOMNode(this.props.caller.refs["hidden-"+i]).style.display = "none";
        }
    }

    render(){
        return (
            <div
                onMouseEnter={this.divOnMouseEnter.bind(this)}
                onMouseLeave={this.divOnMouseLeave.bind(this)}
            >
                {this.props.children}
            </div>
        );
    };
}

export default BlockWithHiddenEles;
