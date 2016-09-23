var app = angular.module('gb24');

app.controller('gb24Info', ['$scope', '$http', function ($scope, $http) {
  $scope.participants = [];
  $http.get('/participants.json')
    .success(function (data) {
      $scope.participants = data;
    })
    .error(function (data) {
      console.error('Error: ' + data);
    });
}]);

module.exports = {
  id: 3,
  name: 'Informatie',
  url: '/info',
  parent: '/',
  templateUrl: '/info.html',
  iconUrl: '/img/information-outline.png',
  controller: 'gb24Info'
};
