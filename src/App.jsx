import React, { Component } from 'react'
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
     console.log('this.state', this.state);
     const BASE_URL = 'https://api.spotify.com/v1/search?';
     let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
     const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
     //Obtained by running app in web-api.../authorization_code/ directory and logging in to Spotify. This changes every hour.  Will need to get new...
     //for help to complete lesson http://www.angular-city.com/2017/07/spotify-web-api-access.html
     var accessToken =
       'BQDvI24M5nKBA9L9HX7LV8zgs7Uh8KYzoj9SEKbwISMQN_brjKZANMghnaMjcl8pQcOORWRJfzkjsQloI9EW7ypXXTY3cR7vce-u-dKq2dOdyt4UXE6sRbwl3bM023HcxFMZmEnSL1VsFMwQIWh03FD4_FmEqghSVr-XaUqakHCVzajifA&refresh_token=AQD1d2r8zRdSTF6IrvkIqsBvyb1gMA2kgcMfPR8LlHq4cs7KU-LmRljqYQDOUbKzeN3ZbZY5_y8SOH8fsuzvzfGpw1XV4vdr17IOs2xiLJNngkEcSDFgcuG21FQS42s4kMU';
     //var myHeaders = new Headers();

     var myOptions = {
       method: 'GET',
       headers: {
         Authorization: 'Bearer ' + accessToken
       },
       mode: 'cors',
       cache: 'default'
     };

     fetch(FETCH_URL, myOptions)
       .then(res => res.json())
       .then(json => {
         const artist = json.artists.items[0];
         this.setState({ artist });

         FETCH_URL = ` ${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
         fetch(FETCH_URL, myOptions)
           .then(response => response.json())
           .then(json => {
             const { tracks } = json;
             this.setState({ tracks });
           });
       });
   }


  render() {
    return (
      <div className='App'>
        <div className="App-title">Music Master</div>
      <FormGroup>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search for an Artist..."
            value={this.state.query}
            onChange={event => {this.setState({query: event.target.value})}}
            onKeyPress={event => {
              if(event.key === 'Enter'){
                this.search()
              }
            }}
          />
          <InputGroup.Addon onClick={() => this.search()}>
            <Glyphicon glyph="search"></Glyphicon>
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      {
        this.state.artist !== null ?
        <div><Profile
          artist={this.state.artist}
        />
          <Gallery
            tracks={this.state.tracks}
          />
        </div>

          : <div></div>
      }

      </div>
    )
  }
}

export default App;
