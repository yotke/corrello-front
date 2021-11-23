import { Component } from 'react';
import { unSplashService } from '../services/unsplash.service';
import { Loader } from '../cmps/loader.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';

export class ImagePalette extends Component {
  state = {
    imgs: [],
    keyword: '',
  };

  componentDidMount() {
    this.fetchImages();
  }

  loadImgs = async () => {
    try {
      const imgs = await unSplashService.getInitialImgs();

      this.setState({ imgs: imgs });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ keyword: value }, () => {
      if (value.length >= 3) this.onSearch();
      else if (value.length === 0) this.loadImgs();
    });
  };

  onSearch = async () => {
    try {
      const imgs = await unSplashService.searchImgs(this.state.keyword);
      this.setState({ imgs });
    } catch (err) {
      console.log(err);
    }
  };

  fetchImages = async () => {
    const { count, start, keyword } = this.state;
    this.setState({ start: this.state.start++ });
    const imgs = await unSplashService.getInitialImgs(keyword, count, start);

    this.setState({ imgs: this.state.imgs.concat(imgs) });
  };

  render() {
    const { imgs, keyword } = this.state;
    const { handleChange } = this.props;
    console.log('images', imgs);

    if (!imgs) return <Loader />;

    return (
      <div
        className="image-palette"
        id="scrollableDiv"
        style={{
          overflowY: 'auto',
          overflowX: 'auto',
        }}
      >
        <div className="image-palette-search">
          <input
            type="text"
            className="search-input"
            value={keyword}
            onChange={this.handleChange}
            onKeyDown={this.handleChange}
            placeholder="&#xF002; Search Photos"
            style={{
              fontFamily: 'FontAwesome',
              fontStyle: 'normal',
              fontWeight: 'normal',
              textDecoration: 'inherit',
            }}
          />
        </div>

        <div className="images">
          {imgs.map((img) => {
            return (
              <label
                key={img.id}
                name="label-img"
                className="flex align-center justify-center"
                style={{ backgroundImage: `url(${img.small})` }}
                htmlFor={`img-${img.id}`}
              >
                <input
                  type="radio"
                  name="color"
                  id={`img-${img.id}`}
                  value={img.full}
                  onClick={handleChange}
                />
              </label>
            );
          })}
        </div>
      </div>
    );
  }
}
