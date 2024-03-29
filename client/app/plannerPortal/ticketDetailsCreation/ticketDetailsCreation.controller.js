'use strict';

angular.module('indiaworksMainSiteApp')
  .controller('TicketDetailsCreationCtrl', function ($scope, $http, plannerPortal, $mdDialog, Toast) {

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

  	$scope.saveService = function () {
  		plannerPortal.createService({
        name: $scope.service.name,
        description: $scope.service.description
      })
      .then(function (response) {
        var config = {
          text: "New service saved successfully",
          intervalTime: 3000,
          position: "bottom left"
        };
        Toast.simpleToast(config);          
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

  	$scope.saveSubCategory = function () {
  		plannerPortal.createSubCategory({
        name: $scope.subCategory.name,
        description: $scope.subCategory.description,
        services: $scope.servicesSelected
      })
      .then(function (response) {
        var config = {
          text: "New sub-category saved successfully",
          intervalTime: 3000,
          position: "bottom left"
        };
        Toast.simpleToast(config);          
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

  	$scope.saveCategory = function () {
  		plannerPortal.createCategory({
        name: $scope.category.name,
        description: $scope.category.description,
        subCategories: $scope.subCategoriesSelected
      })
      .then(function (response) {
        var config = {
          text: "New category saved successfully",
          intervalTime: 3000,
          position: "bottom left"
        };
        Toast.simpleToast(config);          
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

    $scope.serviceEditModal = function (service) {
      $mdDialog.show({
        controller: serviceEditModalCtrl,
        templateUrl: '/app/plannerPortal/ticketDetailsCreation/serviceEditModal.tmpl.html',
        locals: {
          servicePassed: service
        }
      })
      .then(function (response) {

      }, function () {
        console.log('Cancel editing service');
      });
    }; 

    function serviceEditModalCtrl ($scope, $mdDialog, servicePassed) {   
      $scope.editService = servicePassed;
      
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.save = function () {
        plannerPortal.editService({
          _id: $scope.editService._id,
          name: $scope.editService.name,
          description: $scope.editService.description
        })
        .then(function (response) {
          var config = {
            text: "Service edited successfully",
            intervalTime: 3000,
            position: "bottom left"
          };
          Toast.simpleToast(config);          
        })
        .catch(function (err) {
          var config = {
            text: "Some error! Please check internet (or) try again",
            intervalTime: 3000,
            position: "bottom left"
          };
          Toast.simpleToast(config);          
        });

        $mdDialog.hide('Save edited service');
      };      
    }

    $scope.subCategoryEditModal = function (subCategory) {
      $mdDialog.show({
        controller: subCategoryEditModalCtrl,
        templateUrl: '/app/plannerPortal/ticketDetailsCreation/subCategoryEditModal.tmpl.html',
        locals: {
          subCategoryPassed: subCategory,
          allServices: $scope.services
        }
      })
      .then(function (response) {

      }, function () {
        console.log('Cancel editing subCategory');
      });
    }; 

    function subCategoryEditModalCtrl ($scope, $mdDialog, subCategoryPassed, allServices) {   
      $scope.editSubCategory = subCategoryPassed;
      $scope.allServices = allServices;
      
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.save = function () {
        plannerPortal.editSubCategory({
          _id: $scope.editSubCategory._id,
          name: $scope.editSubCategory.name,
          description: $scope.editSubCategory.description,
          services: $scope.editSubCategory.services
        })
        .then(function (response) {
          var config = {
            text: "Sub-category edited successfully",
            intervalTime: 3000,
            position: "bottom left"
          };
          Toast.simpleToast(config);          
        })
        .catch(function (err) {
          var config = {
            text: "Some error! Please check internet (or) try again",
            intervalTime: 3000,
            position: "bottom left"
          };
          Toast.simpleToast(config);          
        });

        $mdDialog.hide('Save edited subCategory');
      };      
    }

    $scope.categoryEditModal = function (category) {
      $mdDialog.show({
        controller: categoryEditModalCtrl,
        templateUrl: '/app/plannerPortal/ticketDetailsCreation/categoryEditModal.tmpl.html',
        locals: {
          categoryPassed: category,
          allSubCategories: $scope.subCategories
        }
      })
      .then(function (response) {

      }, function () {
        console.log('Cancel editing category');
      });
    }; 

    function categoryEditModalCtrl ($scope, $mdDialog, categoryPassed, allSubCategories) {   
      $scope.editCategory = categoryPassed;
      $scope.allSubCategories = allSubCategories;
      
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.save = function () {
        plannerPortal.editCategory({
          _id: $scope.editCategory._id,
          name: $scope.editCategory.name,
          description: $scope.editCategory.description,
          subCategories: $scope.editCategory.subCategories
        })
        .then(function (response) {
          var config = {
            text: "Category edited successfully",
            intervalTime: 3000,
            position: "bottom left"
          };
          Toast.simpleToast(config);          
        })
        .catch(function (err) {
          var config = {
            text: "Some error! Please check internet (or) try again",
            intervalTime: 3000,
            position: "bottom left"
          };
          Toast.simpleToast(config);          
        });

        $mdDialog.hide('Save edited category');
      };      
    }

    $scope.deleteService = function (service) {
      
    }; 

    $scope.deleteSubCategory = function (subCategory) {
      
    };

    $scope.deleteCategory = function (category) {
      
    };

  });
