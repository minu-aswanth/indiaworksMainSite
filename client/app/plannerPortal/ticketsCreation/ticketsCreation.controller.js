'use strict';

angular.module('indiaworksMainSiteApp')
  .controller('TicketsCreationCtrl', function ($scope, $http, plannerPortal) {

	  plannerPortal.getServices()
			.then(function (response) {
				$scope.services = response.data;
			});

		plannerPortal.getSubCategories()
			.then(function (response) {
				$scope.subCategories = response.data;
			});

		plannerPortal.getCategories()
			.then(function (response) {
				$scope.categories = response.data;
			});

		$scope.saveTicket = function () {
			plannerPortal.createTicket({
	      category: $scope.categorySelected,
	      subCategory: $scope.subCategorySelected,
	      service: $scope.serviceSelected
	    })
	    .then(function (response) {
	      console.log(response);
	    });	
		};
	
	});
