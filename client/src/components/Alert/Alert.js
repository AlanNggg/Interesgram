import { Alert } from "react-bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount() {
    // Dismiss the alert after 3 seconds
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 3000);
  }

  handleShow() {
    this.setState({});
  }

  render() {
    return Alert;
  }
}

const mapStateToProps = (state) => {};

export default connect()(Feedback);
