/**
 * Master Controller
 */

angular.module('RDash')
.controller('MasterCtrl', ['$scope', '$cookieStore', '$rootScope', MasterCtrl])
.controller('MainDataCtrl', ['$scope', '$http', '$stateParams', '$rootScope', MainDataCtrl])
.controller('DailyCtrl', ['$scope', '$http', '$stateParams', DailyCtrl])
.controller('WeeklyCtrl', ['$scope', '$http', '$stateParams', WeeklyCtrl])
.controller('ThisMonthCtrl', ['$scope', '$http', '$stateParams', ThisMonthCtrl])
.controller('MonthlyCtrl', ['$scope', '$http', '$stateParams', MonthlyCtrl])
.controller('TargetsCtrl', ['$scope', '$http', '$stateParams', TargetsCtrl])
.controller('BustedsCtrl', ['$scope', '$http', '$stateParams', BustedsCtrl]);

function MasterCtrl($scope, $cookieStore, $http, $stateParams, $rootScope) {
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

function MainDataCtrl($scope, $http, $stateParams, $rootScope) {

  $scope.qlink = $stateParams.qlink;
  $scope.data = [];
  $http.get('http://1and1.deliverwork.info/api/v1/data?qlink=' + $scope.qlink).
    success(function(data, status, headers, config) {
      $rootScope.churchData  = data;
    }).
    error(function(data, status, headers, config) {
      $rootScope.churchData.name = '未命名';
  });

  $http.get('http://1and1.deliverwork.info/api/v1/data/targets?qlink=' + $scope.qlink).
    success(function(data, status, headers, config) {
      $scope.targets  = data;
    }).
    error(function(data, status, headers, config) {
  });

  $http.get('http://1and1.deliverwork.info/api/v1/data/actions?qlink=' + $scope.qlink).
    success(function(data, status, headers, config) {
      $scope.actions  = data;
    }).
    error(function(data, status, headers, config) {
  });

  $http.get('http://1and1.deliverwork.info/api/v1/data/users?qlink=' + $scope.qlink).
    success(function(data, status, headers, config) {
      $scope.users  = data;
    }).
    error(function(data, status, headers, config) {
  });
}

function DailyCtrl($scope, $http, $stateParams) {
  $scope.labels = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '23:00'];
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $scope.qlink = $stateParams.qlink;
  $scope.data = [];

  $http.get('http://1and1.deliverwork.info/api/v1/data/stat/today?qlink=' + $scope.qlink).
    success(function(data, status, headers, config) {
      if (data.statistic_actions_today && data.statistic_users_today) {
        $scope.data = [
          data.statistic_actions_today,
          data.statistic_users_today
        ];
      }
    }).
    error(function(data, status, headers, config) {
      $scope.data = [];
  });

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
}

function WeeklyCtrl($scope, $http, $stateParams) {
  $scope.labels = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $scope.qlink = $stateParams.qlink;
  $scope.data = [];

  $http.get('http://1and1.deliverwork.info/api/v1/data/stat/lastweek?qlink=' + $scope.qlink).
    success(function(data, status, headers, config) {
      if (data.statistic_actions_lastweek && data.statistic_users_lastweek) {
        $scope.data = [
          data.statistic_actions_lastweek,
          data.statistic_users_lastweek
        ];
      }
    }).
    error(function(data, status, headers, config) {
      $scope.data = [];
  });

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
}

function ThisMonthCtrl($scope, $http, $stateParams) {
  if (weekCount(moment().format('gggg'), moment().format('M')) === 4) {
    $scope.labels = ['第一週', '第二週', '第三週', '第四週'];
  } else {
    $scope.labels = ['第一週', '第二週', '第三週', '第四週', '第五週'];
  }
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $scope.qlink = $stateParams.qlink;
  $scope.data = [];

  $http.get('http://1and1.deliverwork.info/api/v1/data/stat/month_by_weeks?qlink=' + $scope.qlink).
    success(function(data, status, headers, config) {
      if (data.statistic_actions_month_by_weeks && data.statistic_users_month_by_weeks) {
        $scope.data = [
          data.statistic_actions_month_by_weeks,
          data.statistic_users_month_by_weeks
        ];
      }
    }).
    error(function(data, status, headers, config) {
      $scope.data = [];
  });

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
}

function MonthlyCtrl($scope, $http, $stateParams) {
  $scope.labels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $scope.qlink = $stateParams.qlink;
  $scope.data = [];

  $http.get('http://1and1.deliverwork.info/api/v1/data/stat/year?qlink=' + $scope.qlink).
    success(function(data, status, headers, config) {
      if (data.statistic_actions_year && data.statistic_users_year) {
        $scope.data = [
          data.statistic_actions_year,
          data.statistic_users_year
        ];
      }
    }).
    error(function(data, status, headers, config) {
      $scope.data = [];
  });

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
}

function TargetsCtrl($scope, $http, $stateParams) {
  $scope.qlink = $stateParams.qlink;
  $scope.data = [];
  $scope.current_page = 1;

  $scope.getItems = function () {
    $http.get('http://1and1.deliverwork.info/api/v1/data/targetall/20?qlink=' + $scope.qlink + '&page=' + $scope.current_page).
      success(function(data, status, headers, config) {
        if (data.total) {
          $scope.total = data.total;
          $scope.current_page = data.current_page;
          $scope.last_page = data.last_page;
          $scope.items = data.data;
        }
      }).
      error(function(data, status, headers, config) {

    });
  }


  $scope.pageChanged = function(page) {
    $scope.current_page = page;
    $scope.getItems();
  };

  $scope.getItems();
}

function BustedsCtrl($scope, $http, $stateParams) {
  $scope.qlink = $stateParams.qlink;
  $scope.data = [];


  $scope.getItems = function () {
    $http.get('http://1and1.deliverwork.info/api/v1/data/bustedall/20?qlink=' + $scope.qlink + '&page=' + $scope.current_page).
      success(function(data, status, headers, config) {
        if (data.total) {
          $scope.total = data.total;
          $scope.current_page = data.current_page;
          $scope.last_page = data.last_page;
          $scope.items = data.data;
        }
      }).
      error(function(data, status, headers, config) {

    });
  }

  $scope.pageChanged = function() {
    $scope.getItems();
  };

  $scope.getItems();
}

function weekCount(year, month_number) {
    var firstOfMonth = new Date(year, month_number - 1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
}
