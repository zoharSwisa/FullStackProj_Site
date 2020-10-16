const axios = require('axios');

const url = 'http://localhost:8080/api/movies/';

exports.getAllMovies = function()
{
    return axios.get(url);
}

exports.getMovieById = function(id)
{
    return axios.get(url + id);
}

exports.addMovie = function(movie)
{
    return axios.post(url, movie);
}

exports.deleteMovie = function(id)
{
    return axios.delete(url + id);
}

exports.editMovie = function(movie)
{
    return axios.put(url + movie.id, movie);
}