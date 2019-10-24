const apiKey = `74fed2a7`;
const searchType = `movie`;
export const rootUrl = `http://omdbapi.com/?apiKey=${apiKey}`;
export const searchUrl = `${rootUrl}&type=${searchType}`;
// => rootUrl = http://omdbapi.com/?apiKey=74fed2a7
// => searchUrl = http://omdbapi.com/?apiKey=74fed2a7&type=movie


// console.log(rootUrl);      // http://omdbapi.com/?apiKey=74fed2a7
// console.log(searchUrl);    // http://omdbapi.com/?apiKey=74fed2a7&type=movie

