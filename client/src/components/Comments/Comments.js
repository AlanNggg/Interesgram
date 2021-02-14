import React, { Component } from "react";
import Comment from "../Comment/Comment";
import "./Comments.css";
import { getPostComments } from "../../redux/actions/comments";
import { connect } from "react-redux";

class Comments extends Component {
  componentDidMount() {
    this.props.getPostComments(this.props.postId);
  }

  render() {
    const { comments } = this.props;
    return (
      <div className="Comments">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
});

export default connect(mapStateToProps, { getPostComments })(Comments);
