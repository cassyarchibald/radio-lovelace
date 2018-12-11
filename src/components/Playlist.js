import React from "react";
import PropTypes from "prop-types";
import "./styles/Playlist.css";

import Track from "./Track";

// Method to remove track from current position/insert at top of trackElements
// const markGoToTopClick = trackIndex => {
//   // Have this happen when go to top is clicked
//   // Moves track in trackElements to the top of current playlist
//   console.log("CLICKED");
//   console.log(trackIndex);
//   console.log(this);
// };
// class Playlist extends React.Component {
//   // array_move = (arr, old_index, new_index) => {
//   //   if (new_index >= arr.length) {
//   //     var k = new_index - arr.length + 1;
//   //     while (k--) {
//   //       arr.push(undefined);
//   //     }
//   //   }
//   //   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
//   //   return arr;
//   // };
//
//   markGoToTopClick = trackIndex => {
//     // Have this happen when go to top is clicked
//     // Moves track in trackElements to the top of current playlist
//     console.log("CLICKED");
//     console.log(trackIndex);
//   };
//
//   calculatePlayTime = tracks => {
//     let minutes = 0;
//     let seconds = 0;
//     tracks.forEach(track => {
//       const times = track.playtime.split(":");
//       minutes += parseInt(times[0]);
//       seconds += parseInt(times[1]);
//     });
//
//     minutes += Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//
//     seconds %= 60;
//     minutes %= 60;
//
//     seconds = ("" + seconds).padStart(2, "0");
//     minutes = ("" + minutes).padStart(2, "0");
//
//     return `${hours}:${minutes}:${seconds}`;
//   };
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       // Stuff here, maybe track elements?
//     };
//     this.tracks = props.tracks;
//     this.trackCount = this.tracks.length;
//     this.playtime = this.calculatePlayTime(this.tracks);
//     this.trackElements = this.tracks.map((track, i) => {
//       return (
//         <Track
//           key={i}
//           index={i}
//           playlist={props.side}
//           markGoToTopClickCallback={this.markGoToTopClick}
//           {...track}
//         />
//       );
//     });
//   } // End of constructor
//   render() {
//     return (
//       <div className="playlist">
//         <h2>{this.props.side} Playlist</h2>
//         <p>
//           {this.trackCount} tracks - {this.playtime}
//         </p>
//         <ul className="playlist--track-list">{this.trackElements}</ul>
//       </div>
//     );
//   }
// } // End of class

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

const Playlist = props => {
  // Need to send both index and track elements up the chain
  // Index is provided by track
  const onGoToTopClick = trackIndex => {
    // Sending tracks/track index up the chain
    props.markGoToTopClickCallback(trackIndex, props.side);
  };
  const onSwitchListsClick = trackIndex => {
    props.markSwitchListsClickCallback(trackIndex, props.side);
  };
  const onUpdateTrackFavoriteClick = trackIndex => {
    props.markUpdateTrackFavoriteCallback(trackIndex, props.side);
  };
  const tracks = props.tracks;
  const trackCount = tracks.length;
  const playtime = calculatePlayTime(tracks);
  const trackElements = tracks.map((track, i) => {
    // We use "spread syntax" here to pass in all the properties of
    // the variable 'track' as props. Go look it up!
    return (
      <Track
        key={track.id}
        index={i}
        playlist={props.side}
        markGoToTopClickCallback={onGoToTopClick}
        markSwitchListsClickCallback={onSwitchListsClick}
        markUpdateTrackFavoriteCallback={onUpdateTrackFavoriteClick}
        {...track}
      />
    );
  });

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
  side: PropTypes.string,
  markGoToTopClickCallback: PropTypes.func,
  markSwitchListsClickCallback: PropTypes.func,
  markUpdateTrackFavoriteCallback: PropTypes.func
};

export default Playlist;
