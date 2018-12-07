import React from "react";
import PropTypes from "prop-types";

import "./styles/Track.css";

// Here we use destructuring to extract the props into separate variables
// See https://wesbos.com/destructuring-objects/
// I think it extends component automatically but i'm adding it to be safe
class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: this.props.favorite
    };

    this.title = props.title;
    this.artist = props.artist;
    this.playtime = props.playtime;
    this.albumart = props.albumart;
  } // End of constructor

  onFavoriteChange = () => {
    // Toggle favorite value in state via setstate
    this.setState({ favorite: !this.state.favorite });
  };

  render() {
    return (
      <li className="track">
        <img
          className="track--albumart"
          alt={`album art for ${this.title}`}
          src={this.albumart}
        />
        <h3 className="track--title">{this.title}</h3>
        <input
          type="checkbox"
          className="track--favorite"
          checked={!this.state.favorite}
          onChange={this.onFavoriteChange}
        />
        <p className="track--artist">{this.artist}</p>
        <p className="track--playtime">{this.playtime}</p>
        <button className="track--control track--to-top">
          <span role="img" aria-label="send to top">
            🔝
          </span>
        </button>
        <button className="track--control track--switch">
          <span role="img" aria-label="switch lists">
            ↔
          </span>
        </button>
      </li>
    ); // End of return
  } // End of render
} // End of class

Track.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
  playtime: PropTypes.string,
  albumart: PropTypes.string,
  favorite: PropTypes.bool
};

export default Track;
