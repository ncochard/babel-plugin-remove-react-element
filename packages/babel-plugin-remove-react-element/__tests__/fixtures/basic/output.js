import MediaQuery from "react-responsive";
import React, { Component } from "react";
class Desktop extends Component {
  render() {
    return /*#__PURE__*/ React.createElement(
      MediaQuery,
      {
        query: "(min-device-width: 1224px)",
      },
      this.props.children
    );
  }
}
class Mobile extends Component {
  render() {
    return /*#__PURE__*/ React.createElement(
      MediaQuery,
      {
        query: "(max-device-width: 1224px)",
      },
      this.props.children
    );
  }
}
export class MyPage extends Component {
  render() {
    return /*#__PURE__*/ React.createElement(
      "div",
      null,
      /*#__PURE__*/ React.createElement(
        Mobile,
        null,
        "This will show on mobile."
      )
    );
  }
}