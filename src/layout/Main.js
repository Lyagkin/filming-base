import { Component } from "react";
import Movies from "../components/Movies";
import Preloader from "../components/Preloader";
import Search from "../components/Search";
import Page404 from "../components/Page404";

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);

export default class Main extends Component {
  state = {
    films: [],
    firstMovieList: "die hard",
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.onRequest(`http://www.omdbapi.com/?apikey=${API_KEY}&s`, this.state.firstMovieList);
  }

  componentDidUpdate() {
    console.log("update");
  }

  onLoad = () => {
    this.setState({
      loading: true,
    });
  };

  onError = () => {
    this.setState({
      error: false,
    });
  };

  onRequest = (url, str, filter = "") => {
    fetch(`${url}=${str}${filter}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.Error === "Movie not found!" || res.Error === "Too many results.") {
          this.setState({
            films: "movie not found!",
            loading: false,
          });
        } else {
          this.setState({
            films: res.Search,
            loading: false,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          error: true,
          loading: false,
        });
      });
  };

  searchFilmByName = (name, filter) => {
    if (!name) {
      return;
    } else {
      this.onLoad();
      this.onError();
      this.onRequest(`http://www.omdbapi.com/?apikey=${API_KEY}&s`, name, filter);
    }
  };

  render() {
    const { films, loading, error } = this.state;

    let style;

    const movieNotFound = films === "movie not found!" || error ? <Page404 /> : null;
    const movie = typeof films === "object" && !loading ? <Movies films={films} /> : null;
    const preloader = loading ? <Preloader /> : null;

    if (movieNotFound || preloader) {
      style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
    } else {
      style = null;
    }

    return (
      <>
        <Search searchFilmByName={this.searchFilmByName} />
        <main style={style} className="content">
          {movie} {preloader} {movieNotFound}
        </main>
      </>
    );
  }
}
