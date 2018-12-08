import React from "react";
import "./styles/RadioSet.css";

import Playlist from "./Playlist";

const RadioSet = props => {
  console.log(`Radio set for ${props.tracks.length} tracks`);
  const playlists = {
    morningTracks: props.tracks.slice(0, props.tracks.length / 2),
    eveningTracks: props.tracks.slice(
      props.tracks.length / 2,
      props.tracks.length
    )
  };
  // Moves track within array
  const array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };
  const markGoToTopClick = trackIndex => {
    console.log("Clicked in radioset");
    console.log(trackIndex);
    console.log(this);
  };
  return (
    <div className="radio-set">
      <section className="radio-set--playlist-container">
        <Playlist
          side="Morning"
          tracks={playlists.morningTracks}
          markGoToTopClickCallback={markGoToTopClick}
        />
        <Playlist
          side="Evening"
          tracks={playlists.eveningTracks}
          markGoToTopClickCallback={markGoToTopClick}
        />
      </section>
    </div>
  );
};

export default RadioSet;
