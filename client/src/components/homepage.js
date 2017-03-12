import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import FoldableList from './foldableList';

class Homepage extends Component{
    render(){
        let hotPosts = ["热门博客一", "热门博客二"];
        let recPosts = ["推荐博客一", "推荐博客二"];

        console.log(browserHistory);
        return (
            <div>
                <FoldableList title={"热门博客（点击可折叠）"} items={hotPosts}/>
                <FoldableList title={"推荐博客"} items={recPosts}/>
            </div>
        );
    }
}

export default Homepage;