import { Component } from '@angular/core';
import { Movie } from './movie.model';
import { searchUrl } from './endpoint';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  MOVIE_NAME_MIN_LENGTH: number;
  MOVIES_NUM_PER_REQUEST: number;
  endpoint: string;
  movies: Movie[];
  hasMoreMovies: boolean;
  isExistingMovieName: boolean;
  isMovieNameLongEnough: boolean;
  page: number;
  searchValue: string;
  isErrInSearchResult: boolean;
  errMessage: string;
  dataFromServer: any;
  toDisplayError: boolean;


  constructor() {
    this.MOVIE_NAME_MIN_LENGTH = 3;
    this.MOVIES_NUM_PER_REQUEST = 10;  // It is a server API
    this.endpoint = searchUrl;  // http://omdbapi.com/?apiKey=74fed2a7&type=movie
    this.searchValue = '';
    this.initDefaultValues();
  }


  initDefaultValues() {
    this.movies = [];
    this.page = 1;
    this.hasMoreMovies = false;
    this.isExistingMovieName = false;
    this.isMovieNameLongEnough = true;
    this.isErrInSearchResult = false;
    this.toDisplayError = true;
    this.errMessage = '';
  }


  searchMovie(e: Event, movieSearchInput: HTMLInputElement) {
    e.preventDefault();
    this.initDefaultValues();
    this.searchValue = movieSearchInput.value;

    if (this.searchValue.length >= this.MOVIE_NAME_MIN_LENGTH) {
      this.isMovieNameLongEnough = true;
      this.loadMovies();
    } else {
      this.isMovieNameLongEnough = false;
    }
  }


  loadMovies() {
    fetch(`${this.endpoint}&page=${this.page}&s=${this.searchValue}`)
    .then(
       response => {
        response.json()
        .then( data => {
          // console.log(data);
          data.Search ? this.setMovies(data.Search) : this.disableLoadMore();

          if (data.Error && this.toDisplayError) {
            this.isErrInSearchResult = true;
            this.errMessage = data.Error;
          }
        });
       }
    );
  }


  setMovies(movies: Movie[]) {
    if (movies.length < this.MOVIES_NUM_PER_REQUEST) { this.hasMoreMovies = false; } 
    else { this.hasMoreMovies = true; }

    this.toDisplayError = false;
    this.movies = this.movies.concat(movies);
    // console.log(this.movies);
    this.page++;
  }


  disableLoadMore() {
    this.hasMoreMovies = false;
  }
}
