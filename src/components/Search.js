import { Component } from "react";

export default class Search extends Component {
  state = {
    searchString: "",
    filter: "",
  };

  setSearchInputValueInState = (e) => {
    if (e.target.value === "series" || e.target.value === "movie") {
      this.setState({
        [e.target.name]: `&type=${e.target.value}`,
      });
    } else if (e.target.value === "all") {
      this.setState({
        [e.target.name]: "",
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  onKeyPressSearh = (e) => {
    if (e.code === "Enter") {
      console.log("press");
      this.props.searchFilmByName(this.state.searchString, this.state.filter);
    }
  };

  render() {
    const { searchString, filter } = this.state;

    return (
      <div className="row">
        <div className="input-field col s12">
          <input
            id="search"
            type="search"
            className="validate"
            placeholder="Search"
            name="searchString"
            value={searchString}
            onChange={this.setSearchInputValueInState}
            onKeyDown={this.onKeyPressSearh}
          />
          <button onClick={() => this.props.searchFilmByName(searchString, filter)} className="buttonSearch">
            Search
          </button>
          <div className="inputRadio">
            <label>
              <input
                className="with-gap"
                name="filter"
                value="all"
                type="radio"
                onChange={this.setSearchInputValueInState}
              />
              <span>All</span>
            </label>
            <label>
              <input
                className="with-gap"
                name="filter"
                value="movie"
                type="radio"
                onChange={this.setSearchInputValueInState}
              />
              <span>Movie</span>
            </label>
            <label>
              <input
                className="with-gap"
                name="filter"
                value="series"
                type="radio"
                onChange={this.setSearchInputValueInState}
              />
              <span>Series</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}
