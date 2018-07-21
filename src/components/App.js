import React, { Component } from 'react';
import { debounce } from 'lodash';
import Navbar from './navbar/Navbar';
import ImageGrid from './imagegrid/ImageGrid';
import Footer from './footer/Footer';

import keys from '../config.js/keys';

class App extends Component {
  state = {
    search: '',
    count: 100,
    images: []
  };

  OnChangeInput = debounce(search => {
    this.setState({ search }, () => {
      if (this.state.search.length !== 0) {
        const { search, count } = this.state;
        let url = `https://pixabay.com/api/?key=${
          keys.apiKey
        }&q=${search}&image_type=photo&per_page=${count}&safesearch=true`;
        fetch(url)
          .then(data => data.json())
          .then(response => {
            this.setState({
              images: response.hits
            });
          })
          .catch(err => console.log(err));
      }
    });
  }, 500);

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="search-form">
          <input
            type="text"
            className="search-input"
            onChange={e => this.OnChangeInput(e.target.value)}
          />
          <label className="search-label">Search</label>
        </div>
        {this.state.images.length > 0 ? (
          <ImageGrid images={this.state.images} />
        ) : (
          <h1>Search and find stunning free images!</h1>
        )}
        <Footer />
      </div>
    );
  }
}

export default App;
