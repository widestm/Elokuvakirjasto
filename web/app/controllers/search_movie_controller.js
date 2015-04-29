MovieApp.controller('SearchController', function($scope, APIService){

	$scope.findMovie = function(){
		$scope.notice='';
		$scope.movies = [];

		if ($scope.searchName !== '' || $scope.searchYear !== '') {
			
			APIService.findMovie($scope.searchName, $scope.searchYear).success(function(response){
				if (response.Response === 'False'){
					//$scope.notice = "Hakusanalla ei löytynyt elokuvia";
					$scope.movies = [];
				}				

				$scope.movies = response.Search;
				console.log(response.Search);
			});

		};


	};

	
});