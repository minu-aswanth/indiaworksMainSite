'use strict';

angular.module('indiaworksMainSiteApp')
  .controller('TicketDetailsCreationCtrl', function ($scope, $http, plannerPortal) {

  	plannerPortal.getServices()
	.then(function (data) {
		$scope.services = data;
	});

	plannerPortal.getSubCategories()
	.then(function (data) {
		$scope.subCategories = data;
	});

  	$scope.saveService = function(){
  		plannerPortal.createService({
          name: $scope.service.name,
          description: $scope.service.description
        })
        .then(function (data) {
          console.log(data);
        });	
  	};

  	$scope.saveSubCategory = function(){
  		plannerPortal.createSubCategory({
          name: $scope.subCategory.name,
          description: $scope.subCategory.description,
          services: $scope.servicesSelected
        })
        .then(function (data) {
          console.log(data);
        });	
  	};

  	$scope.saveCategory = function(){
  		plannerPortal.createCategory({
          name: $scope.category.name,
          description: $scope.category.description,
          subCategories: $scope.subCategoriesSelected
        })
        .then(function (data) {
          console.log(data);
        });	
  	};

  });
