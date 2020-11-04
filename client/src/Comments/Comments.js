import React, { Component } from "react";
import Comment from "../Comment/Comment";
import config from "../config";
import "./Comments.css";

class Comments extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="Comments">
        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
    );
  }
}

export default Comments;
