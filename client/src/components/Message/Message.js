import { Alert } from "react-bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import { removeMessage } from "../../redux/actions/messages";

class Message extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Dismiss the alert after 3 seconds
    setTimeout(() => {
      this.props.removeMessage();
    }, 3000);
  }

  render() {
    const { variant, children } = this.props;
    return <Alert variant={variant}>{children}</Alert>;
  }
}

Message.defaultProps = {
  variant: "info",
};

export default connect(null, { removeMessage })(Message);
