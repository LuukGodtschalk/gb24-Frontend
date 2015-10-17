define(function (require) {
  return function ($scope, $http) {
    $scope.participants = [];
    $http.get('/participants.json')
      .success(function (data) {
        $scope.participants = data;
        console.log(data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };
});