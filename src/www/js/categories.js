var app = angular.module('gb24');

app.controller('gb24Categories', ['$scope', '$http', function ($scope, $http) {
  $scope.participants = [];
  $http.get('/categories.json')
    .success(function (data) {
      $scope.categories = data;
      console.log(data);
    })
    .error(function (data) {
      console.log('Error: ' + data);
    });
}]);

module.exports = {
  id: 2,
  name: 'Klassement',
  url: '/categorieen',
  parent: '/',
  templateUrl: '/categories.html',
  controller: 'gb24Categories'
};
