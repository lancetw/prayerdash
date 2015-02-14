'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise(function($injector, $location) {
            window.location.href = "http://1and1.ccea.org.tw";
        });

        // Application routes
        $stateProvider
            .state('index', {
                url: '/:qlink',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/:qlink/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('info', {
                url: '/:qlink/info',
                templateUrl: 'templates/info.html'
            });
    }
]);
