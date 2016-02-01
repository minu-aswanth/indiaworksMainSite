'use strict';

angular.module('indiaworksMainSiteApp')
  .controller('WorkersAssignmentCtrl', function ($scope, plannerPortal, $http, $mdToast) {
    
  	plannerPortal.getTickets()
	.then(function (data) {
		$scope.tickets = data;
	});

	plannerPortal.getWorkers()
	.then(function (data) {
		$scope.workers = data;
	});

  $scope.modes = ["All", "Pending", "Appointed", "Completed"];
  $scope.selectedMode = "All";
  $scope.currentFilter = "filterAll";

  $scope.filterFunction = function(item){
    if($scope.selectedMode == "All"){
      return true;
    }

    else if($scope.selectedMode == "Pending"){
      return item.workersAssigned.length === 0;
    }

    else if($scope.selectedMode == "Appointed"){
      return item.workersAssigned.length != 0 && item.resolved === false;
    }

    else if($scope.selectedMode == "Completed"){
      return item.workersAssigned.length != 0 && item.resolved === true;
    }
  }

  $scope.showToast = function(text) {
    $mdToast.show({
      position: "bottom left",
      template: "<md-toast>" + text +"</md-toast>",
      hideDelay: 1000
    });
  };

  // $scope.filterAll = function(item){
  //   return true;
  // }

  // $scope.filterPending = function(item){
  //   return item.workersAssigned.length === 0;
  // }

  // $scope.filterAppointed = function(item){
  //   return item.workersAssigned.length != 0 && item.resolved === false;
  // }

  // $scope.filterCompleted = function(item){
  //   return item.workersAssigned.length != 0 && item.resolved === true;
  // }

  // $scope.modeChanged = function(){
  //   if($scope.selectedMode == "All"){
  //     $scope.currentFilter = "filterAll";
  //   }

  //   else if($scope.selectedMode == "Pending"){
  //     $scope.currentFilter = "filterPending";
  //   }

  //   else if($scope.selectedMode == "Appointed"){
  //     $scope.currentFilter = "filterAppointed";
  //   }

  //   else if($scope.selectedMode == "Completed"){
  //     $scope.currentFilter = "filterCompleted";
  //   }

  // }

	$scope.assignWorkers = function(ticket, workersSelected){
    console.log(workersSelected);
  		plannerPortal.editTicket({
          _id: ticket._id,
          category: ticket.category,
          subCategory: ticket.subCategory,
          service: ticket.service,
          workersAssigned: workersSelected,
          resolved: ticket.resolved
        })
        .then(function (data) {
          $scope.showToast("Assigned");
          console.log(data);
        });	
  	};

  $scope.resolvedCheck = function(ticket, ifResolved){
    console.log(ifResolved);
      plannerPortal.editTicket({
          _id: ticket._id,
          category: ticket.category,
          subCategory: ticket.subCategory,
          service: ticket.service,
          workersAssigned: ticket.workersAssigned,
          resolved: ifResolved
        })
        .then(function (data) {
          $scope.showToast("Done");
          console.log(data);
        }); 
    };

  });
