describe('Show movie', function(){
	var controller, scope;

	var FirebaseServiceMock, RouteParamsMock;

	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
  		module('MovieApp');

  		FirebaseServiceMock = (function(){
  			var movies= [];
  			return {
  				getMovies: function(){
  					return movies;
  				},getMovie: function(key, done){
  					if(key == 'abc123'){
  						done({
  							name: 'Joku leffa',
  							director: 'Kalle Ilves',
  							release: 2015,
  							description: 'Mahtava leffa!'
  						});
  					}else{
  						done(null);
  					}
  				},

  			};
  		})();

  		RouteParamsMock = (function(){
  			return {
  				id: 'abc123'
  			};
  		})();

		// Lisää vakoilijat
	    spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();

	    inject(function($controller, $rootScope) {
	    	scope = $rootScope.$new();
	    	controller = $controller('MovieController', {
	    		$scope: scope,
	    		MovieService: FirebaseServiceMock,
	    		$routeParams: RouteParamsMock
	    	});
	    });
	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/* 
  	* Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
  	* käyttämällä toBeCalled-oletusta.
  	*/
  	it('should show current movie from Firebase', function(){
  		expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
  		expect(scope.movie.name).toBe('Joku leffa');
  	});
  });
