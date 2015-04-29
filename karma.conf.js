module.exports = function(config){
  config.set({

    basePath : './',

    files : [
    'web/bower_components/angular/angular.min.js',
    'web/bower_components/angular-mocks/angular-mocks.js',
    'web/bower_components/angular-route/angular-route.min.js',
    'web/bower_components/firebase/firebase.js',
    'web/bower_components/angularfire/dist/angularfire.min.js',
    'web/app/app.js',
    'web/app/**/**.js',
    'test/*.js',
    'web/bower_components/angular-validation-match/dist/angular-input-match.min.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
    'karma-chrome-launcher',
    'karma-jasmine'
    ],

  });
};
