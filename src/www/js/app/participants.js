define(function (require) {
var app = require('gb24');

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
return {
  id: 1,
  name: 'Deelnemers',
  url: 'deelnemers'
};
});
