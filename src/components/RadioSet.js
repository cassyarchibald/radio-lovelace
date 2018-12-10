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
    // PROPS
    // this.playlists = {
    //   morningTracks: this.props.tracks.slice(0, this.props.tracks.length / 2),
    //   eveningTracks: this.props.tracks.slice(
    //     this.props.tracks.length / 2,
    //     this.props.tracks.length
    //   )
    // };
  } // End of constructor
  // console.log(`Radio set for ${this.props.tracks.length} tracks`);

  // // Moves track within array
  array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  };

  markGoToTopClick = (trackIndex, playlistSide, array_move) => {
    console.log("in radio");
    console.log(playlistSide);
    console.log(trackIndex);
    console.log(this.state);
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
      console.log("Evening");
      // Remove item and store it
      // Then add in at first part of array
      const songToMove = this.state.eveningTracks[trackIndex];
      // Create copy of array
      const songs = this.state.eveningTracks;
      // remove song
      songs.splice(trackIndex, 1);
      // add song to front
      songs.splice(0, 0, songToMove);
      // Log below shows that song did move to front but this does not show rendered :(
      console.log(songs);
      this.setState({
        //Update state - remove from current index, add to top index
        eveningTracks: songs
      });
    } else {
      console.log("Morning");
      this.setState({
        // Update state
        morningTracks: this.state.morningTracks.splice(
          1,
          0,
          this.state.morningTracks.splice(0, 1)[0]
        )
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
