'use strict';

angular.module('indiaworksMainSiteApp')
  .controller('NavbarCtrl', function ($scope, Auth, $state) {
    
    $scope.plannerMenu = [{
      'title': 'Create Services',
      'state': 'ticketDetailsCreation'
    },
    {
      'title': 'Tickets',
      'state': 'workersAssignment'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isPlanner = Auth.isPlanner;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      $state.go('login');
    };

  });