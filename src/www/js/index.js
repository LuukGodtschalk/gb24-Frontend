var angular = require('angular');
var ngRoute = require('angular-route');

var app = angular.module('gb24', ['ngRoute']);
var components = require('./components');
require('./eventManager');
require('./countdown');

console.log(app);
app.config(['$routeProvider', function ($routeProvider) {
  for (var n = 0; n < components.length; n++) {
    var route = components[n];
    console.log(route);
    $routeProvider.when(route.url, {
      title: route.name,
      parent: route.parent,
      controller: route.controller,
      templateUrl: route.templateUrl
    });
  }
  /*
  $routeProvider
    .when('/deelnemers', {
      title: 'Deelnemers',
      controller: 'gb24Participants',
      templateUrl: '/participants.html'
    })
    .when('/deelnemers/:id', {
      title: 'Details',
      controller: 'gb24ParticipantDetails',
      templateUrl: '/participantDetails.html'
    })
    .when('/categorieen', {
      title: 'Categorieën',
      controller: 'gb24Categories',
      templateUrl: '/categories.html'
    })
    */
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);


//return app;
