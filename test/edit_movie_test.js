describe('Edit movie', function(){
	var controller, scope;

	var FirebaseServiceMock, RouteParamsMock;

	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
  		module('MovieApp');

      FirebaseServiceMock = (function(){
        var movies= [
        {
          name: 'Joku leffa',
          director: 'Kalle Ilves',
          year: 2015,
          description: 'Mahtava leffa!'
        }
        ];
        return {
          getMovies: function(){
            return movies;
          },getMovie: function(key, done){
            if(key == 'abc123'){
              done({
                name: 'Joku leffa',
                director: 'Kalle Ilves',
                year: 2015,
                description: 'Mahtava leffa!'
              });
            }else{
              done(null);
            }
          },
          editMovie: function(movie){
           for (var i = 0; i < movies.length; i++) {
            if (movies[i].name === movie.name) {
              movies[i].name = movie.name;
              movies[i].director = movie.director;
              movies[i].year = movie.year;
              movies[i].description = movie.description;
            }


          }
        }

      };
    })();

    RouteParamsMock = (function(){
      return {
        id: 'abc123'
      };
    })();
    spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
    spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();


      /*
	    editMovie: function(movie){
  					movieToEdit = movies.find(function(m){ return m.name = movie.name });
  					if(movieToEdit){
  						movieToEdit.name = movie.name;
  						movieToEdit.director = movie.director;
  						movieToEdit.year = movie.year;
  						movieToEdit.description =movie.description;
  					}
  				},
  				*/


    	// Injektoi toteuttamasi kontrolleri tähän
    	inject(function($controller, $rootScope) {
    		scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('EditMovieController', {
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
  	* Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/
  	it('should fill the edit form with the current information about the movie', function(){
  		expect(scope.movieName).toBe('Joku leffa');
      expect(scope.movieDirector).toBe('Kalle Ilves');
      expect(scope.movieYear).toBe(2015);
      expect(scope.movieDesc).toBe('Mahtava leffa!');
      expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();

    });

  	/* 
  	* Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/
  	it('should be able to edit a movie by its name, director, release date and description', function(){
  		
      scope.movieName = 'Joku leffa';
      scope.movieDirector = 'moi';
      scope.movieDesc = 'moi';
      scope.movieYear = 'moi';
      scope.addMovie();

      expect(scope.movies[0].name).toBe('Joku leffa');
      expect(scope.movies[0].director).toBe('moi');
      expect(FirebaseServiceMock.editMovie).toHaveBeenCalled();
      
    });

	/*
	* Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
  	* käyttämällä not.toBeCalled-oletusta.
  	*/
  	it('should not be able to edit a movie if its name, director, release date or description is empty', function(){
      scope.movieName = '';
      scope.movieDirector = 'moi';
      scope.movieDesc = '';
      scope.movieYear = 'moi';
      scope.addMovie();

      expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
      expect(scope.movies[0].director).toBe('Kalle Ilves');
    });
  });