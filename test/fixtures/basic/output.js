import MediaQuery from "react-responsive";
import React, { Component } from "react";

class Desktop extends Component {
  render() {
    return React.createElement(
      MediaQuery,
      {
        query: "(min-device-width: 1224px)"
      },
      this.props.children
    );
  }
}

class Mobile extends Component {
  render() {
    return React.createElement(
      MediaQuery,
      {
        query: "(max-device-width: 1224px)"
      },
      this.props.children
    );
  }
}

export class MyPage extends Component {
  render() {
    return React.createElement(
      "div",
      null,
      null,
      React.createElement(Mobile, null, "This will show on mobile.")
    );
  }
}