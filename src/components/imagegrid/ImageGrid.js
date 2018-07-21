import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

class ImageGrid extends Component {
  state = {
    count: 20
  };

  changeCount = () => {
    this.setState({
      count: this.state.count + 10
    });
  };

  render() {
    let imagegrid;
    const { count } = this.state;
    const { images } = this.props;
    if (images) {
      imagegrid = images.slice(0, count).map(image => {
        return (
          <div className="image-card" key={image.id}>
            <img className="image" src={image.largeImageURL} alt={image.tags} />
          </div>
        );
      });
    } else {
      imagegrid = (
        <Loader type="Puff" color="#00BFFF" height="100" width="100" />
      );
    }
    return (
      <div className="imagegrid">
        {imagegrid}
        <button onClick={this.changeCount} className="btn-more">
          Discover more...
        </button>
      </div>
    );
  }
}

ImageGrid.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageGrid;
