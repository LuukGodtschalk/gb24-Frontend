var app = angular.module('gb24');

var components = [
  require('./home'),
  require('./participants'),
  require('./participantDetails'),
  require('./categories'),
  require('./ranking'),
  require('./information'),
  require('./debug')
];
var tabs = components.filter(function (element, index, array) {return element.id !== undefined;});

app.controller('gb24Navbar', ['$scope', '$rootScope', '$location', '$anchorScroll',
 function ($scope, $rootScope, $location, $anchorScroll) {
  $scope.tabs = tabs;
  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    if ($location.hash()) {
      $anchorScroll();
    }
    var route = current.$$route || {title: 'Home'};
    $rootScope.title = route.title;
    $rootScope.back = route.parent;
    $rootScope.socketStatus = route.socketStatus;
    $scope.currentUrl = route.originalPath;
  });
  $rootScope.endtime = new Date(2016, 8, 24, 13, 0);
}]);

module.exports = components;
