MovieApp.controller('MovieController', function($scope, MovieService){
	$scope.movies = MovieService.getMovies();


	$scope.removeMovie = function(movie){
		MovieService.removeMovie(movie);
	};
	$scope.editMovie = function(movie){
	};
});