import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../actions';


class PostDetail extends Component{
    componentDidMount(){
        this.props.getPostDetail(this.props.params.postId);
    }

    renderHelper(){
        if(this.props.postDetail){
            return (
                <div>
                    <Link to={`/posts/edit/${this.props.params.postId}`} className="btn btn-default">
                        编辑
                    </Link>
                    <h3>{this.props.postDetail.title}</h3>
                    <p>{this.props.postDetail.content}</p>
                </div>
            );
        }else{
            return (
                <div>{'出错啦!!!！'}</div>
            );
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
        postDetail: state.post.postDetail
    };
}

export default connect(mapStateToProps, actions)(PostDetail);