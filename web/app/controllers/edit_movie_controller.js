MovieApp.controller('EditMovieController', function($scope, $location, $routeParams, MovieService){
	$scope.movies = MovieService.getMovies();
	MovieService.getMovie($routeParams.id, function(movie){
		if (!movie) {
			$location.path('/');
		}
		$scope.movieToEdit = movie;
		$scope.movieName = movie.name;
		$scope.movieDirector = movie.director;
		$scope.movieDesc = movie.description;
		$scope.movieYear = movie.year;

	});

	$scope.addMovie = function(){
		if ($scope.movieName !== '' && $scope.movieDirector !== '' &&
			$scope.movieYear !== '' && $scope.movieDesc !== ''){

			var movieToEdit = $scope.movieToEdit;


		movieToEdit.name = $scope.movieName;
		movieToEdit.director = $scope.movieDirector;
		movieToEdit.description = $scope.movieDesc;
		movieToEdit.year = $scope.movieYear;

		MovieService.editMovie(movieToEdit);
		$scope.movieToEdit = null;
		$location.path('/movies/'+movieToEdit.$id);
	}
	$location.path('/movies/');
};
});