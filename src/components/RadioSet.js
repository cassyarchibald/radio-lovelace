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
  // Find song in playlist -
  // Update state for that song

  markSwitchListsClick = (trackIndex, playlistSide) => {
    // Track should move to top of  opposite playlist
    if (playlistSide === "Evening") {
      // Add to morning tracks
      const { morningTracks } = this.state;
      morningTracks.unshift(this.state.eveningTracks[trackIndex]);
      // Remove from evening playlist
      const { eveningTracks } = this.state;
      eveningTracks.splice(trackIndex, 1);

      this.setState({
        // Update state of evening and morning tracks
        eveningTracks: eveningTracks,
        morningTracks: morningTracks
      });

      // Add to morning playlist (use unshift?)
    } else {
      // Add to evening tracks
      const { morningTracks } = this.state;
      const { eveningTracks } = this.state;
      eveningTracks.unshift(this.state.morningTracks[trackIndex]);
      // Remove from morning playlist
      morningTracks.splice(trackIndex, 1);

      this.setState({
        // Update state of evening and morning tracks
        eveningTracks: eveningTracks,
        morningTracks: morningTracks
      });
    }
  };
  // Refactor - listOfTracks is the list from state we are revising
  moveToTop = (listOfTracks, trackIndex) => {
    const trackToMove = listOfTracks[trackIndex];
    // Create copy of array
    const updatedListOfTracks = listOfTracks;
    // remove song
    updatedListOfTracks.splice(trackIndex, 1);
    // add song to front
    updatedListOfTracks.splice(0, 0, trackToMove);
    // Return revised list
    return updatedListOfTracks;
  };

  switchFavorite = (listOfTracks, trackIndex) => {
    // Make a new track with all of old track's values
    // Then do opposite favorite value
    // Braces create new object
    const newTrack = { ...listOfTracks[trackIndex] };
    newTrack.favorite = !newTrack.favorite;
    // Need to set the updated track
    // TODO - Build new list and return new list
    const newList = listOfTracks
      .slice(0, trackIndex)
      .concat([newTrack], listOfTracks.slice(trackIndex + 1));
    // debugger;

    // listOfTracks[trackIndex] = newTrack;
    // Creating new list object
    return newList;
  };
  // Need to make a new list object to force a render from React
  // Slice from 0, index for prior to track
  // track as an array element all by itself
  // Slice from index + 1, will do the end of array automaticallu

  updateTrackFavorite = (trackIndex, playlistSide) => {
    // Update state
    if (playlistSide === "Evening") {
      // Evening
      const updatedEveningTracks = this.switchFavorite(
        this.state.eveningTracks,
        trackIndex
      );
      this.setState({
        //Update state - set eveningTracks to be new songs collection
        eveningTracks: updatedEveningTracks
      });
    } else {
      // Do morning
      const updatedMorningTracks = this.switchFavorite(
        this.state.morningTracks,
        trackIndex
      );
      // Add moveToTop
      this.setState({
        //Update state - set morningTracks to be new songs collection
        morningTracks: updatedMorningTracks
      });
    }
  };

  markGoToTopClick = (trackIndex, playlistSide) => {
    if (playlistSide === "Evening") {
      // Remove item and store it
      // Then add in at first part of array
      const updatedEveningTracks = this.moveToTop(
        this.state.eveningTracks,
        trackIndex
      );
      this.setState({
        //Update state - set eveningTracks to be new songs collection
        eveningTracks: updatedEveningTracks
      });
      // State is not getting updated
    } else {
      const updatedMorningTracks = this.moveToTop(
        this.state.morningTracks,
        trackIndex
      );
      // Add moveToTop
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
            markUpdateTrackFavoriteCallback={this.updateTrackFavorite}
          />
          <Playlist
            side="Evening"
            tracks={this.state.eveningTracks}
            markGoToTopClickCallback={this.markGoToTopClick}
            markSwitchListsClickCallback={this.markSwitchListsClick}
            markUpdateTrackFavoriteCallback={this.updateTrackFavorite}
          />
        </section>
      </div>
    );
  }
}

export default RadioSet;
