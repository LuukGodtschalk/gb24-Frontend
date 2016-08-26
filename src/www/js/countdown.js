angular.module('gb24').directive('countdown', ['$interval', 'dateFilter', function ($interval, dateFilter) {

  function link(scope, element, attrs) {
    var endTime = scope.endTime;
    var timeoutId;

    function updateTime() {
      var t = Date.parse(scope.endTime) - Date.parse(new Date());
      scope.seconds = Math.floor((t / 1000) % 60);
      scope.minutes = Math.floor((t / 1000 / 60) % 60);
      scope.hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      scope.days = Math.floor(t / (1000 * 60 * 60 * 24));
    }

    element.on('$destroy', function () {
      $interval.cancel(timeoutId);
    });

    // start the UI update process; save the timeoutId for canceling
    timeoutId = $interval(function () {
      updateTime(); // update DOM
    }, 1000);
    updateTime();
  }

  return {
    restrict: 'E',
    templateUrl: '/countdown.html',
    scope: {
      endTime: '=endtime'
    },
    link: link
  };
}]);
