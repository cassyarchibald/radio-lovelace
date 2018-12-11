import React from "react";
import "./styles/RadioSet.css";

import Playlist from "./Playlist";

class RadioSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // State items here - What to place here...
      // Would like radio to keep track of order of songs in playlist
      // But is it bad to store all the tracks in state?
      morningTracks: this.props.tracks.slice(0, this.props.tracks.length / 2),
      eveningTracks: this.props.tracks.slice(
        this.props.tracks.length / 2,
        this.props.tracks.length
      )
    };
  } // End of constructor
  // console.log(`Radio set for ${this.props.tracks.length} tracks`);

  // // Moves track within array
  // array_move = (arr, old_index, new_index) => {
  //   if (new_index >= arr.length) {
  //     var k = new_index - arr.length + 1;
  //     while (k--) {
  //       arr.push(undefined);
  //     }
  //   }
  //   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  // };

  markGoToTopClick = (trackIndex, playlistSide) => {
    // Could use unshift to add to front of array
    // Could use filter to remove from array
    // console.log(playlistSide);
    // console.log(trackIndex);
    // console.log(this.state);
    // if (playlistSide === "Evening") {
    //   // this.playlist = "eveningTracks";
    //   console.log("Evening Action");
    //   this.setState({
    //     // eveningTracks: this.state.eveningTracks.splice(
    //     //   0,
    //     //   0,
    //     //   this.state.eveningTracks.splice(trackIndex, 1)[0]
    //     // )
    //     eveningTracks: this.state.eveningTracks.splice(trackIndex, 1),
    //     eveningTracks: this.state.eveningTracks.splice(0, 0, songToMove)
    //   });
    // } else {
    //   // this.playlist = "morningTracks";
    //   console.log("Morning action");
    //   this.state.morningTracks.splice(
    //     0,
    //     0,
    //     this.state.morningTracks.splice(trackIndex, 1)[0]
    //   );
    // }
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
      // QUESTION Log below shows that song did move to front but this does not show rendered :(
      // console.log(updatedEveningTracks);
      this.setState({
        //Update state - set eveningTracks to be new songs collection
        eveningTracks: updatedEveningTracks
      });
      // State is not getting updated
      console.log(this.state.eveningTracks);
    } else {
      const songToMove = this.state.eveningTracks[trackIndex];
      // Create copy of array
      const updatedMorningTracks = this.state.eveningTracks;
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
          />
          <Playlist
            side="Evening"
            tracks={this.state.eveningTracks}
            markGoToTopClickCallback={this.markGoToTopClick}
          />
        </section>
      </div>
    );
  }
}

export default RadioSet;
