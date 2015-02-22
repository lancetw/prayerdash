/**
 * Master Controller
 */

angular.module('RDash')
.controller('MasterCtrl', ['$scope', '$cookieStore', '$rootScope', MasterCtrl])
.controller('MainDataCtrl', ['$scope', '$http', '$stateParams', '$rootScope', MainDataCtrl])
.controller('DailyCtrl', ['$scope', '$http', '$stateParams', '$rootScope', DailyCtrl])
.controller('WeeklyCtrl', ['$scope', '$http', '$stateParams', '$rootScope', WeeklyCtrl])
.controller('ThisMonthCtrl', ['$scope', '$http', '$stateParams', '$rootScope', ThisMonthCtrl])
.controller('MonthlyCtrl', ['$scope', '$http', '$stateParams', '$rootScope', MonthlyCtrl])
.controller('TargetsCtrl', ['$scope', '$http', '$stateParams', '$rootScope', TargetsCtrl])
.controller('BustedsCtrl', ['$scope', '$http', '$stateParams', '$rootScope', BustedsCtrl])
.controller('InfoCtrl', ['$scope', '$http', '$stateParams', '$rootScope', InfoCtrl]);

var SITE_URL = 'http://1and1.deliverwork.info/';
//var SITE_URL = 'http://192.168.0.100:8000/';


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

  if (!$stateParams || $stateParams.qlink === '') {
    window.location.href = "http://1and1.ccea.org.tw";
  }

  $rootScope.qlink = $stateParams.qlink;
  $scope.data = [];
  $http.get(SITE_URL + 'api/v1/data?qlink=' + $rootScope.qlink).
    success(function(data, status, headers, config) {
      if (angular.equals({}, data)) {
        window.location.href = "http://1and1.ccea.org.tw";
      }
      $rootScope.churchData  = data;
    }).
    error(function(data, status, headers, config) {
      $rootScope.churchData.name = '未命名';
  });

  $http.get(SITE_URL + 'api/v1/data/targets?qlink=' + $rootScope.qlink).
    success(function(data, status, headers, config) {
      $scope.targets  = data;
    }).
    error(function(data, status, headers, config) {
  });

  $http.get(SITE_URL + 'api/v1/data/actions?qlink=' + $rootScope.qlink).
    success(function(data, status, headers, config) {
      $scope.actions  = data;
    }).
    error(function(data, status, headers, config) {
  });

  $http.get(SITE_URL + 'api/v1/data/users?qlink=' + $rootScope.qlink).
    success(function(data, status, headers, config) {
      $scope.users  = data;
    }).
    error(function(data, status, headers, config) {
  });
}

function DailyCtrl($scope, $http, $stateParams, $rootScope) {
  $scope.labels = ['0:00~0:59', '1:00~1:59', '2:00~2:59', '3:00~3:59', '4:00~4:59', '5:00~5:59', '6:00~6:59', '7:00~7:59', '8:00~8:59', '9:00~9:59', '10:00~10:59', '11:00~11:59', '12:00~12:59', '13:00~13:59', '14:00~14:59', '15:00~15:59', '16:00~16:59', '17:00~17:59', '18:00~18:59', '19:00~19:59', '20:00~20:59', '21:00~21:59', '22:00~22:59', '23:00~23:59', '23:00~23:59'];
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $rootScope.qlink = $stateParams.qlink;
  $scope.data = [];

  $http.get(SITE_URL + 'api/v1/data/stat/today?qlink=' + $rootScope.qlink).
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

function WeeklyCtrl($scope, $http, $stateParams, $rootScope) {
  $scope.labels = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $rootScope.qlink = $stateParams.qlink;
  $scope.data = [];

  $http.get(SITE_URL + 'api/v1/data/stat/lastweek?qlink=' + $rootScope.qlink).
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

function ThisMonthCtrl($scope, $http, $stateParams, $rootScope) {
  if (weekCount(moment().format('gggg'), moment().format('M')) === 4) {
    $scope.labels = ['第一週', '第二週', '第三週', '第四週'];
  } else {
    $scope.labels = ['第一週', '第二週', '第三週', '第四週', '第五週'];
  }
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $rootScope.qlink = $stateParams.qlink;
  $scope.data = [];

  $http.get(SITE_URL + 'api/v1/data/stat/month_by_weeks?qlink=' + $rootScope.qlink).
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

function MonthlyCtrl($scope, $http, $stateParams, $rootScope) {
  $scope.labels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  $scope.series = ['禱告點擊總數', '新加入守望者'];
  $rootScope.qlink = $stateParams.qlink;
  $scope.data = [];

  $http.get(SITE_URL + 'api/v1/data/stat/year?qlink=' + $rootScope.qlink).
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

function TargetsCtrl($scope, $http, $stateParams, $rootScope) {
  $rootScope.qlink = $stateParams.qlink;
  $scope.data = [];
  $scope.current_page = 1;

  $scope.getItems = function () {
    $http.get(SITE_URL + 'api/v1/data/targetall/20?qlink=' + $rootScope.qlink + '&page=' + $scope.current_page).
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

function BustedsCtrl($scope, $http, $stateParams, $rootScope) {
  $rootScope.qlink = $stateParams.qlink;
  $scope.data = [];


  $scope.getItems = function () {
    $http.get(SITE_URL + 'api/v1/data/bustedall/20?qlink=' + $rootScope.qlink + '&page=' + $scope.current_page).
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

function InfoCtrl($scope, $http, $stateParams, $rootScope) {
  $rootScope.qlink = $stateParams.qlink;
  $scope.info = {};


  $http.get(SITE_URL + 'api/v1/data/info?qlink=' + $rootScope.qlink).
    success(function(data, status, headers, config) {
      $scope.info  = data;
    }).
    error(function(data, status, headers, config) {
  });
}

function weekCount(year, month_number) {
    var firstOfMonth = new Date(year, month_number - 1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
}
