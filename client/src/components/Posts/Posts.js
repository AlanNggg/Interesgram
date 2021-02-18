import React, { Component } from "react";
import Post from "../Post/Post";
import "./Posts.css";
import { getPosts } from "../../redux/actions/posts";
import { connect } from "react-redux";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }
  async componentDidMount() {
    await this.props.getPosts();
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    return (
      !isLoading && (
        <div className="Posts">
          {this.props.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { getPosts })(Posts);
