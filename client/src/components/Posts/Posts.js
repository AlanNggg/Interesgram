import React, { Component } from "react";
import Post from "../Post/Post";
import "./Posts.css";
import { getPosts } from "../../redux/actions/posts";
import { connect } from "react-redux";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts } = this.props;
    return (
      <div className="Posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { getPosts })(Posts);
