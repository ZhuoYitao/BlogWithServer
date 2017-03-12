import React, {Component} from 'react';

// 一个可折叠的列表
// 使用时需要提供列表名title和列表项items
class FoldableList extends Component{
    constructor(props) {
        // 下面的语句是必须的
        super(props);
        // 初始化component内部的state
        this.state = {
            folded: false
        };
    }

    // 如果要返回一组元素，就返回一个存了对应JSX的数组
    renderHelperItems(){
        if(this.props.items){
            let index = -1;
            return this.props.items.map((item)=>{
                index += 1;
                return (
                    <div key={index}>
                    <li>{item}</li>
                    <hr/>
                    </div>
                );
            });
        }
    }

    // 点击后隐藏或显示列表的具体内容
    // 点击后修改标题前面的图标
    headingOnClick(){
        if (!this.state.folded){
            this.refs.ul.style.display = "none";
            this.refs.icon.className = "glyphicon glyphicon-triangle-right";
            this.setState({folded: true});
        }else{
            this.refs.ul.style.display = "block";
            this.refs.icon.className = "glyphicon glyphicon-triangle-bottom";
            this.setState({folded: false});
        }
    }

    render(){
        // this.props.title和items是从父元素那传过来的
        console.log("rendering");
        return (
            <div>
                <i className="glyphicon glyphicon-triangle-bottom" ref={"icon"}></i>
                <h2 className="headingAfterIcon" onClick={this.headingOnClick.bind(this)}>{this.props.title}</h2>
                <ul ref={"ul"}>
                    {this.renderHelperItems()}
                </ul>
            </div>
        );
    }
}

export default FoldableList;