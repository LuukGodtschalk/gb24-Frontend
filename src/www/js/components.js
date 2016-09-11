var app = angular.module('gb24');

var components = [
  require('./home'),
  require('./participants'),
  require('./participantDetails'),
  require('./categories'),
  require('./information'),
  require('./debug')
];
var tabs = components.filter(function (element, index, array) {return element.id !== undefined;});
console.log(components, tabs);

app.controller('gb24Navbar', ['$scope', '$rootScope', '$location', '$anchorScroll',
 function ($scope, $rootScope, $location, $anchorScroll) {
  $scope.tabs = tabs;
  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    if ($location.hash()) {
      $anchorScroll();
    }
    var route = current.$$route || {title: 'Home'};
    console.log(current, route);
    $rootScope.title = route.title;
    $rootScope.back = route.parent;
    $scope.currentUrl = route.originalPath;
  });
}]);

module.exports = components;
