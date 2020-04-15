import React from "react";
import { connect } from "react-redux";
import { fetchStream, fetchStreamServerIp } from "../../actions";
import StreamChat from "./StreamChat";
import flv from "flv.js";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStreamServerIp();
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream || !this.props.server) {
      return;
    }
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://${this.props.server.ip}:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    const { title, description, gametag } = this.props.stream;
    const username =
      this.props.stream.user_info && this.props.stream.user_info.username;
    return (
      <div id="stream-show" className="ui grid stackable">
        <div id="stream-container" className="twelve wide column">
          <div className="ui secondary menu header">
            <div className="item white-text">{username || "User"}'s Stream</div>
            <div
              className="item right"
              style={{ paddingTop: 0, paddingBottom: 0 }}
            >
              <button className="ui teal button floated">Subscribe</button>
            </div>
          </div>
          <div
            className="content-scrollable white-text"
            style={{ paddingLeft: 5 }}
          >
            <video ref={this.videoRef} style={{ width: "100%" }} controls />
            <div>
              <h1>{title}</h1>
              <h4>
                <span>#{gametag}</span>
                <span style={{ float: "right", marginRight: "1em" }}>
                  Viewers: {this.props.viewer_count || 0}
                </span>
              </h4>
              <h5>{description}</h5>
            </div>
          </div>
        </div>
        <StreamChat stream={this.props.stream} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    server: state.streamServer.serverIp,
    viewer_count: state.chat.viewer_count,
  };
};

export default connect(mapStateToProps, { fetchStream, fetchStreamServerIp })(
  StreamShow
);
