import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import AlbumList from './components/AlbumList';
import TrackList from './components/TrackList';
import * as musicApi from './api/musicApi';

class App extends React.Component {
  constructor() {
    super();
    this.state = ({
      albums: [],
      tracks: [],
    });
    this.currentPreview = null;
    this.getAlbums = this.getAlbums.bind(this);
    this.processAlbums = this.processAlbums.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this.processTracks = this.processTracks.bind(this);
    this.playPreview = this.playPreview.bind(this);
  }

  getAlbums(artist) {
    musicApi.getAlbums(artist, this.processAlbums);
  }

  getTracks(albumId) {
    musicApi.getTracks(albumId, this.processTracks);
  }

  processAlbums(payload) {
    this.setState({
      albums: payload.albums.items,
      tracks: [],
    });
  }

  processTracks(payload) {
    this.setState({
      tracks: payload.tracks.items,
    });
  }

  playPreview(previewUrl) {
    if (this.currentPreview) {
      const curAudioObject = this.currentPreview;
      curAudioObject.pause();
    }

    const newAudioObject = new Audio(previewUrl);
    this.currentPreview = newAudioObject;

    newAudioObject.play();
  }

  render() {
    return (
      <div>
        <SearchBar getAlbums={this.getAlbums} />
        <AlbumList albums={this.state.albums} getTracks={this.getTracks} />
        <TrackList tracks={this.state.tracks} playPreview={this.playPreview} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
