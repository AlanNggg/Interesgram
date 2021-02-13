import React, { Component } from "react";
import Post from "../Post/Post";
import "./Posts.css";
import config from "../../config";

class Posts extends Component {
  render() {
    const { user, posts, cookies } = this.props;
    return (
      <div className="Posts">
        {posts.map((post) => (
          <Post
            key={post._id}
            user={user}
            id={post._id}
            author={post.author}
            images={post.images}
            description={post.description}
            createdAt={post.createdAt}
            cookies={cookies}
          />
        ))}
      </div>
    );
  }
}

export default Posts;
