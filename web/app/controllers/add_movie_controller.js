MovieApp.controller('AddMovieController', function($scope, MovieService, $location){

	$scope.movies = MovieService.getMovies();


	$scope.addMovie = function(){
		if ($scope.movieName !== '' && $scope.movieDirector !== '' &&
			$scope.movieYear !== '' && $scope.movieDesc !== ''){

			MovieService.addMovie({	
				name: $scope.movieName,
				director: $scope.movieDirector,
				year: $scope.movieYear,
				description: $scope.movieDesc
			});
	}

	$scope.movieName = '';
	$scope.movieDirector = '';
	$scope.movieDesc = '';
	$scope.movieYear = '';

	$location.path('/movies/');
};


});