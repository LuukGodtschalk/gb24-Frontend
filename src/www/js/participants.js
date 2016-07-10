console.log(app);
var app = angular.module('gb24');

app.controller('gb24Participants', ['$scope', '$http', function ($scope, $http) {
  $scope.participants = [];
  $http.get('/participants.json')
    .success(function (data) {
      $scope.participants = data;
      console.log(data);
    })
    .error(function (data) {
      console.log('Error: ' + data);
    });
}]);

module.exports = {
  id: 3,
  name: 'Deelnemers',
  url: '/deelnemers',
  parent: '/',
  templateUrl: '/participants.html',
  controller: 'gb24Participants'
};
