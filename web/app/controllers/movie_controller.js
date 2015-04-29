MovieApp.controller('MovieController', function($scope, $location, $routeParams, MovieService){
	$scope.movies = MovieService.getMovies();
	MovieService.getMovie($routeParams.id, function(movie){
		$scope.movie = movie;
	});

	$scope.removeMovie = function(movie){
		MovieService.removeMovie(movie);
	};
});