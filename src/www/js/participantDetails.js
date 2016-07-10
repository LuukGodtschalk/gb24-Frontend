var app = angular.module('gb24');

app.controller('gb24ParticipantDetails', ['$scope', '$http', function ($scope, $http) {
  $scope.data = [];
  $http.get('/participantDetails.json')
    .success(function (data) {
      $scope.data = data;
      console.log(data);
    })
    .error(function (data) {
      console.log('Error: ' + data);
    });
}]);

module.exports = {
  name: 'Details',
  url: '/deelnemers/:id',
  parent: '/deelnemers/',
  templateUrl: '/participantDetails.html',
  controller: 'gb24ParticipantDetails'
};
