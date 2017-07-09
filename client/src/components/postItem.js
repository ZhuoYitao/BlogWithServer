import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../actions';
import ReactDOM from 'react-dom';
import BlockWithHiddenEles from './blockWithHiddenEles';

class PostItem extends Component{
    onButtonDelete(){
        this.props.deletePost(this.props.postId);
    }

    render(){
        return (
            <BlockWithHiddenEles caller={this} hiddenNum={1}>
                <li className="list-group-item">
                    <Link to={`posts/${this.props.postId}`}>
                        <strong>{this.props.postTitle}</strong>
                    </Link>
                    {/*<Link className="btn btn-default my-display-hidden" ref={"hidden-0"}>*/}
                        {/*编辑*/}
                    {/*</Link>*/}
                    <button
                        className="btn btn-danger pull-xs-right deleteButton"
                        onClick={this.onButtonDelete.bind(this)}
                    >
                        删除博客
                    </button>
                </li>
             </BlockWithHiddenEles>
        );
    }
}

export default connect(null, actions)(PostItem);