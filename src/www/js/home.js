
angular.module('gb24').controller('gb24Home', ['$scope', 'eventManager', function ($scope, eventManager) {
  $scope.endtime = new Date(2016, 8, 24, 13, 0);
}]);

module.exports = {
  id: 1,
  name: 'Home',
  url: '/',
  parent: null,
  templateUrl: '/home.html',
  iconUrl: '/img/home.png',
  controller: 'gb24Home'
};
