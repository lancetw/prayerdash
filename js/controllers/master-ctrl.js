/**
 * Master Controller
 */

angular.module('RDash')
.controller('MasterCtrl', ['$scope', '$cookieStore', MasterCtrl])
.controller('DailyCtrl', ['$scope', DailyCtrl])
.controller('WeeklyCtrl', ['$scope', WeeklyCtrl])
.controller('ThisMonthCtrl', ['$scope', ThisMonthCtrl])
.controller('MonthlyCtrl', ['$scope', MonthlyCtrl]);

function MasterCtrl($scope, $cookieStore) {
  /**
   * Sidebar Toggle & Cookie Control
   */
  var mobileView = 992;

  $scope.getWidth = function() {
    return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
    if (newValue >= mobileView) {
      if (angular.isDefined($cookieStore.get('toggle'))) {
        $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
      } else {
        $scope.toggle = true;
      }
    } else {
      $scope.toggle = false;
    }

  });

  $scope.toggleSidebar = function() {
    $scope.toggle = !$scope.toggle;
    $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
    $scope.$apply();
  };
}

function DailyCtrl($scope) {
  $scope.labels = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '23:00'];
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $scope.data = [
    [3, 4, 2, 5, 11, 22, 3, 1, 12, 8, 19, 22, 31, 23, 1, 5, 3, 1, 11, 36, 32, 53, 19, 2],
    [21, 15, 6, 9, 13, 17, 12, 4, 1, 8, 9, 22, 1, 5, 3, 8, 20, 8, 1, 2, 3, 1, 4, 2]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
}

function WeeklyCtrl($scope) {
  $scope.labels = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $scope.data = [
    [37, 44, 32, 25, 31, 51, 49],
    [21, 15, 6, 9, 13, 17, 12]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
}

function ThisMonthCtrl($scope) {
  $scope.labels = ['第一週', '第二週', '第三週', '第四週', '第五週'];
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $scope.data = [
    [521, 732, 487, 612, 365],
    [332, 123, 321, 221, 165]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
}

function MonthlyCtrl($scope) {
  $scope.labels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $scope.data = [
    [1238, 1876, 1423, 2102, 1562, 2332, 2891, 3789, 3212, 2981, 3771, 3999],
    [523, 388, 333, 524, 875, 453, 321, 476, 532, 812, 552, 931]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
}
