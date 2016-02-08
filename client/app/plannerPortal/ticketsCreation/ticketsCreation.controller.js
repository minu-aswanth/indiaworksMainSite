'use strict';

angular.module('indiaworksMainSiteApp')
  .controller('TicketsCreationCtrl', function ($scope, $http, plannerPortal, Toast) {

	  plannerPortal.getServices()
			.then(function (response) {
				$scope.services = response.data;
			})
      .catch(function (err) {
        
      });

		plannerPortal.getSubCategories()
			.then(function (response) {
				$scope.subCategories = response.data;
			})
      .catch(function (err) {
        
      });

		plannerPortal.getCategories()
			.then(function (response) {
				$scope.categories = response.data;
			})
      .catch(function (err) {
        
      });

		$scope.saveTicket = function () {
			plannerPortal.createTicket({
	      category: $scope.categorySelected,
	      subCategory: $scope.subCategorySelected,
	      service: $scope.serviceSelected
	    })
	    .then(function (response) {
        var config = {
          text: "Ticket created successfully",
          intervalTime: 3000,
          position: "bottom left"
        };
        Toast.simpleToast(config);

	      console.log(response);
	    })
      .catch(function (err) {
        var config = {
          text: "Some error! Please check internet (or) try again",
          intervalTime: 3000,
          position: "bottom left"
        };
        Toast.simpleToast(config);        
      });	
		};
	
	});
