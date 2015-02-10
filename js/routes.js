'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/xoZ96Va40m');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/:qlink',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/:qlink/tables',
                templateUrl: 'templates/tables.html'
            });
    }
]);
