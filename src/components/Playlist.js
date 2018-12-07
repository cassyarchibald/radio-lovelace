import React from "react";
import PropTypes from "prop-types";
import "./styles/Playlist.css";

import Track from "./Track";

const calculatePlayTime = tracks => {
  let minutes = 0;
  let seconds = 0;
  tracks.forEach(track => {
    const times = track.playtime.split(":");
    minutes += parseInt(times[0]);
    seconds += parseInt(times[1]);
  });

  minutes += Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;

  seconds = ("" + seconds).padStart(2, "0");
  minutes = ("" + minutes).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
// Method to remove track from current position/insert at top of trackElements
const onGoToTopClick = () => {
  // Have this happen when go to top is clicked
  // Moves track in trackElements to the top
  console.log("CLICKED");
};

const Playlist = props => {
  const tracks = props.tracks;
  const trackCount = tracks.length;
  const playtime = calculatePlayTime(tracks);

  const trackElements = tracks.map((track, i) => {
    // We use "spread syntax" here to pass in all the properties of
    // the variable 'track' as props. Go look it up!
    return (
      <Track
        key={i}
        index={i}
        playlist={props.side}
        onGoToTopClick={onGoToTopClick}
        {...track}
      />
    );
  });
  // Functino from SO to move an item in an array
  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  return (
    <div className="playlist">
      <h2>{props.side} Playlist</h2>
      <p>
        {trackCount} tracks - {playtime}
      </p>
      <ul className="playlist--track-list">{trackElements}</ul>
    </div>
  );
};

Playlist.propTypes = {
  tracks: PropTypes.array,
  side: PropTypes.string
};

export default Playlist;
