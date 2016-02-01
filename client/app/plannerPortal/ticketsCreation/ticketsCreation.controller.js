'use strict';

angular.module('indiaworksMainSiteApp')
  .controller('TicketsCreationCtrl', function ($scope, $http, plannerPortal) {

  	plannerPortal.getServices()
	.then(function (data) {
		$scope.services = data;
	});

	plannerPortal.getSubCategories()
	.then(function (data) {
		$scope.subCategories = data;
	});

	plannerPortal.getCategories()
	.then(function (data) {
		$scope.categories = data;
	});

	$scope.saveTicket = function(){
  		plannerPortal.createTicket({
          category: $scope.categorySelected,
          subCategory: $scope.subCategorySelected,
          service: $scope.serviceSelected
        })
        .then(function (data) {
          console.log(data);
        });	
  	};

  });
