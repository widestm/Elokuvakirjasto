MovieApp.controller('MovieController', function($scope, MovieService){
	$scope.movies = MovieService.getMovies();


});