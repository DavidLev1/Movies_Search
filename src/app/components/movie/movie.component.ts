import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../movie.model';
import { rootUrl } from '../../endpoint';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})


export class MovieComponent implements OnInit {
  noMoviePosterImg: string;
  @Input() movie: Movie;

  endpoint: string;
  movieDetails: {}[];
  isMoviePosterExist: boolean;
  toShowMovieDetails: boolean;


  constructor() {
    this.endpoint = rootUrl;  // http://omdbapi.com/?apiKey=74fed2a7
    this.movieDetails = [];
  }


  ngOnInit() {
    this.noMoviePosterImg  = './././assets/images/no_poster.jpg';
    if (this.movie.Poster === 'N/A') {  this.isMoviePosterExist = false; }
    else { this.isMoviePosterExist = true; }
    this.toShowMovieDetails = true;
  }


  showDetails(movieIMDbId: string) {
    fetch(`${this.endpoint}&i=${movieIMDbId}`)
    .then( response => {
      response.json()
      .then( data => {
        this.setData(data);
      });
    });

    this.toShowMovieDetails = false;
  }


  hideDetails(movieIMDbId: string) {
    while (this.movieDetails.length > 0) {
      this.movieDetails.pop();
    }
    this.toShowMovieDetails = true;
  }


  setData(movieDetailsData: object) {
    // console.log(movieDetailsData);
    for (const detailKeyName in movieDetailsData) {
      if (detailKeyName === 'Ratings') {
        this.addRatings(movieDetailsData[detailKeyName]);
      } else {
        this.movieDetails.push({key: `${detailKeyName}`, value: `${movieDetailsData[detailKeyName]}`});
      }
    }
    // console.log(this.movieDetails);
  }


  addRatings(ratings) {
  ratings.map( rating =>
    this.movieDetails.push( {key: `${rating.Source}`, value: `${rating.Value}`} ) );
  }

}
