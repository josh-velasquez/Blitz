import React from "react";
import "./style.css";
import HolderPNG from "./holder.png";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
    };
  }

  retrieveSubscribers() {
    /*replace this code with actual code to populate subcriptions state*/
    this.setState((state) => ({
      subscriptions: [HolderPNG, HolderPNG],
    }));
  }

  componentDidMount() {
    this.retrieveSubscribers();
  }

  displaySubscribers() {
    let arr = [];
    for (let i = 0; i < this.state.subscriptions.length; i++) {
      arr.push(
        <div className="subIcon" key={i}>
          <img
            src={this.state.subscriptions[i]}
            style={{ width: "20px", height: "20px" }}
            alt="Subscription Avatar"
          ></img>
        </div>
      );
    }
    return arr;
  }

  render() {
    return (
      <div className="sidenav hide-on-mobile" style={{ backgroundColor: "#1F1F23" }}>
        <div className="subIcon">
          <span>
            <i className="bars large icon white-text"></i>
          </span>
        </div>
        {this.displaySubscribers()}
      </div>
    );
  }
}

export default SideNav;
