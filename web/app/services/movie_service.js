MovieApp.service('MovieService', function($firebase){
	var movieFirebaseRef = new Firebase('https://shining-inferno-773.firebaseio.com/movies');
	var movieSync = $firebase(movieFirebaseRef);
	var movies = movieSync.$asArray();


	this.getMovies = function(){
		return movies;
	}
	this.addMovie = function(movie){
		movies.$add(movie);
	}
	this.editMovie = function(movie){
		movies.$save(movie);
	}
	this.removeMovie = function(movie){
		movies.$remove(movie);
	}

});