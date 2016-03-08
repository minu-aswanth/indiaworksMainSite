'use strict';

angular.module('indiaworksMainSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('workersAssignment', {
        url: '/workersAssignment?filter',
        templateUrl: 'app/plannerPortal/workersAssignment/workersAssignment.html',
        controller: 'WorkersAssignmentCtrl'
      });
  });