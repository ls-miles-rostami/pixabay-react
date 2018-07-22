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
    order: 'popular',
    images: []
  };

  onOrderChange = order => {
    this.setState({ order }, () => this.getImages());
  };

  OnChangeInput = debounce(search => {
    this.setState({ search }, () => this.getImages());
  }, 500);

   async getImages() {
    if (this.state.search.length !== 0) {
      const { search, count, order } = this.state;
      let url = `https://pixabay.com/api/?key=${keys.apiKey}&q=${search}&image_type=photo&order=${order}&per_page=${count}&safesearch=true`;
      let data = await fetch(url)
      let response = await data.json()
      this.setState({ images: response.hits})
    }
  }

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
          <div className="sort">
            Sort by:
            <a
              className={this.state.order === 'popular' ? 'sort-active' : null}
              onClick={() => this.onOrderChange('popular')}
              href="#"
            >
              Popular
            </a>|
            <a
              className={this.state.order === 'latest' ? 'sort-active' : null}
              onClick={() => this.onOrderChange('latest')}
              href="#"
            >
              Latest
            </a>
          </div>
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
