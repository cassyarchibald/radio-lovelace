import React from "react";
import "./styles/RadioSet.css";

import Playlist from "./Playlist";

class RadioSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      morningTracks: this.props.tracks.slice(0, this.props.tracks.length / 2),
      eveningTracks: this.props.tracks.slice(
        this.props.tracks.length / 2,
        this.props.tracks.length
      )
    };
  } // End of constructor

  markSwitchListsClick = (trackIndex, playlistSide) => {
    // Track should move to top of  opposite playlist
    // Remove from current list
    // Add to top of other list (similar to markGoToTopClick)
    console.log(trackIndex);
    console.log(playlistSide);
  };

  markGoToTopClick = (trackIndex, playlistSide) => {
    if (playlistSide === "Evening") {
      // Remove item and store it
      // Then add in at first part of array
      const songToMove = this.state.eveningTracks[trackIndex];
      // Create copy of array
      const updatedEveningTracks = this.state.eveningTracks;
      // remove song
      updatedEveningTracks.splice(trackIndex, 1);
      // add song to front
      updatedEveningTracks.splice(0, 0, songToMove);

      this.setState({
        //Update state - set eveningTracks to be new songs collection
        eveningTracks: updatedEveningTracks
      });
      // State is not getting updated
    } else {
      const songToMove = this.state.morningTracks[trackIndex];
      // Create copy of array
      const updatedMorningTracks = this.state.morningTracks;
      // remove song
      updatedMorningTracks.splice(trackIndex, 1);
      // add song to front
      updatedMorningTracks.splice(0, 0, songToMove);
      this.setState({
        //Update state - set morningTracks to be new songs collection
        morningTracks: updatedMorningTracks
      });
    }
  };
  //
  render() {
    return (
      <div className="radio-set">
        <section className="radio-set--playlist-container">
          <Playlist
            side="Morning"
            tracks={this.state.morningTracks}
            markGoToTopClickCallback={this.markGoToTopClick}
            markSwitchListsClickCallback={this.markSwitchListsClick}
          />
          <Playlist
            side="Evening"
            tracks={this.state.eveningTracks}
            markGoToTopClickCallback={this.markGoToTopClick}
            markSwitchListsClickCallback={this.markSwitchListsClick}
          />
        </section>
      </div>
    );
  }
}

export default RadioSet;
