var MovieApp = angular.module('MovieApp', ['ngRoute', 'firebase', 'validation.match']);


MovieApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller: 'MovieController',
		templateUrl: 'app/views/listMovies.html'
	})
	.when('/movies/', {
		controller: 'MovieController',
		templateUrl: 'app/views/listMovies.html'
	})
	.when('/movies/new', {
		controller: 'AddMovieController',
		templateUrl: 'app/views/movieForm.html'
	})
	.when('/movies/:id', {
		controller: 'MovieController',
		templateUrl: 'app/templates/movie.html'
	})
	.when('/movies/:id/edit', {
		controller: 'EditMovieController',
		templateUrl: 'app/views/movieForm.html'
	});
});