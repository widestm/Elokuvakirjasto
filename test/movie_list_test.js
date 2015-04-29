describe('Movie list', function(){
	var controller, scope;

	var FirebaseServiceMock;

	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
  		module('MovieApp');

  		FirebaseServiceMock = (function(){
  			var movies = [
  			{
  				name: 'movie1',
  				year: '2000',
  				description: "description1",
  				director: "director1"
  			},
  			{
  				name: 'movie2',
  				year: '2002',
  				description: "description2",
  				director: "director2"
  			}
  			];

  			return {
  				getMovies: function(){
  					return movies;
  				},
  				removeMovie: function(movie){
  					movies.indexOf(movie)
  					movies.splice(movies.indexOf(movie), 1);
  					//movies = movies.filter(function(m){ m.name == movie.name });  			
  				}
  			}
  		})();

  		spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
  		spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
    	inject(function($controller, $rootScope) {
    		scope = $rootScope.$new();
    		controller = $controller('MovieController', {
    			$scope: scope,
    			MovieService: FirebaseServiceMock
    		});
    	});
    });

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/ 
  	it('should list all movies from the Firebase', function(){
  		expect(scope.movies[0].name).toBe('movie1')
  		expect(scope.movies[1].name).toBe('movie2')

  		expect(scope.movies.length).toBe(2);
  		expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
  	});

	/* 
	* Testaa, että elokuvan pystyy poistamaan Firebasesta.
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/
  	it('should be able to remove a movie', function(){
  		var movieToDelete = scope.movies[0];
  		scope.removeMovie(movieToDelete);

  		expect(scope.movies.length).toBe(1);
  		expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
  	});
  });

