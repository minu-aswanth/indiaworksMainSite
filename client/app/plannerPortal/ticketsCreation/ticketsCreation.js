'use strict';

angular.module('indiaworksMainSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ticketsCreation', {
        url: '/ticketsCreation',
        templateUrl: 'app/plannerPortal/ticketsCreation/ticketsCreation.html',
        controller: 'TicketsCreationCtrl'
      });
  });