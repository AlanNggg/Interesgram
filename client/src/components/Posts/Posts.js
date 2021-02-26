import React, { Component } from "react";
import Post from "../Post/Post";
import "./Posts.css";
import Loader from "../Loader/Loader";
import { getPosts } from "../../redux/actions/posts";
import { connect } from "react-redux";

class Posts extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.getPosts();
  }

  render() {
    const { posts } = this.props;

    return posts.isLoading ? (
      <Loader />
    ) : (
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
