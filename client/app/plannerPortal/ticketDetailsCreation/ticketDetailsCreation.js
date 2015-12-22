'use strict';

angular.module('indiaworksMainSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ticketDetailsCreation', {
        url: '/ticketDetailsCreation',
        templateUrl: 'app/plannerPortal/ticketDetailsCreation/ticketDetailsCreation.html',
        controller: 'TicketDetailsCreationCtrl'
      });
  });