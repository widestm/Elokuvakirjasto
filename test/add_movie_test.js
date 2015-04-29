describe('Add movie', function(){
	var controller, scope;

	var FirebaseServiceMock;

	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
  		module('MovieApp');

  		FirebaseServiceMock = (function(){
  			var movies= [];
  			return {
  				addMovie: function(movie){
  					movies.push(movie);
  				},
  				getMovies: function(){
  					return movies;
  				}

  			}
  		})();

		// Lisää vakoilijat
		spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
    	inject(function($controller, $rootScope) {
    		scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('AddMovieController', {
	      	$scope: scope,
	      	MovieService: FirebaseServiceMock
	      });
	  });
    });

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
  	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
  	* on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
  	* toBeCalled-oletusta.
  	*/
  	it('should be able to add a movie by its name, director, release date and description', function(){

  		scope.movieName = 'movie';
  		scope.movieDirector = 'moi';
  		scope.movieDesc = 'moi';
  		scope.movieYear = 'moi';
  		scope.addMovie();

  		expect(scope.movies.length).toBe(1);
  	});

	/*	
	* Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
	* EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
	* not.toBeCalled-oletusta (muista not-negaatio!).
	*/
	it('should not be able to add a movie if its name, director, release date or description is empty', function(){
		
		scope.movieName = '';
		scope.movieDirector = 'moi';
		scope.movieDesc = '';
		scope.movieYear = 'moi';
		scope.addMovie();

		expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();

		expect(scope.movies.length).toBe(0);
	});
});