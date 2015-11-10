define(function (require) {
var app = require('gb24');

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
return {
  id: 2,
  name: 'Categorieën',
  url: 'categorieen'
};
});
