'use strict';

angular.module('indiaworksMainSiteApp')
  .controller('WorkersAssignmentCtrl', function ($scope, plannerPortal, $http, Toast, $mdDialog, $stateParams, $state, $location) {
    
  	plannerPortal.getTickets()
    	.then(function (response) {
    		$scope.tickets = response.data;
    	})
      .catch(function (err) {
        
      });

  	plannerPortal.getWorkers()
    	.then(function (response) {
    		$scope.workers = response.data;
    	})
      .catch(function (err) {
        
      });

    $scope.modes = ["All", "Pending", "Appointed", "Completed"];

    if($scope.modes.indexOf($stateParams.filter) != -1) {
      $scope.selectedMode = $stateParams.filter;
      $scope.selectedModeIndex = $scope.modes.indexOf($stateParams.filter);
    } else {
      $scope.selectedMode = "All";
      $scope.selectedModeIndex = 0;
    }

    $scope.currentFilter = "filterAll";

    $scope.assignCurrentTab = function (index) {
      $scope.selectedMode = $scope.modes[index];
      $state.go('.', { 'filter': $scope.modes[index] }, { notify: false }); // works well without reload of controller
      // $state.transitionTo('workersAssignment', { 'filter': $scope.modes[index] }, { notify: false }); // works well without reload of controller
      // $location.search('filter', $scope.modes[index]); // reloads the controller
      // More info http://stackoverflow.com/a/30246785/3476748
    };

    $scope.filterFunction = function (item) {
      if($scope.selectedMode == "All") {
        return true;
      }

      else if($scope.selectedMode == "Pending") {
        return item.workersAssigned.length === 0;
      }

      else if($scope.selectedMode == "Appointed") {
        return item.workersAssigned.length != 0 && item.resolved === false;
      }

      else if($scope.selectedMode == "Completed") {
        return item.workersAssigned.length != 0 && item.resolved === true;
      }
    };

    $scope.workersAssignmentModal = function (ticket) {
      $mdDialog.show({
        controller: workersAssignmentModalCtrl,
        templateUrl: '/app/plannerPortal/workersAssignment/workersAssignmentModal.tmpl.html',
        locals: {
          ticketPassed: ticket,
          allWorkers: $scope.workers
        }
      })
      .then(function (response) {

      }, function () {
        console.log('Cancel assigning worker');
      });
    }; 

    function workersAssignmentModalCtrl ($scope, $mdDialog, ticketPassed, allWorkers) {   
      $scope.editTicket = ticketPassed;
      $scope.allWorkers = allWorkers;
      
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.save = function () {
        console.log($scope.editTicket);
        plannerPortal.editTicket({
          _id: $scope.editTicket._id,
          category: $scope.editTicket.category._id,
          subCategory: $scope.editTicket.subCategory._id,
          service: $scope.editTicket.service._id,
          workersAssigned: $scope.editTicket.workersAssigned,
          resolved: $scope.editTicket.resolved
        })
        .then(function (response) {
          var config = {
            text: "Assigned successfully",
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

        $mdDialog.hide('Saved');
      }
    }

  	$scope.assignWorkers = function (ticket, workersSelected) {
      console.log(workersSelected);
  		plannerPortal.editTicket({
        _id: ticket._id,
        category: ticket.category,
        subCategory: ticket.subCategory,
        service: ticket.service,
        workersAssigned: workersSelected,
        resolved: ticket.resolved
      })
      .then(function (response) {
        var config = {
          text: "Assigned successfully",
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

    $scope.resolvedCheck = function (ticket, ifResolved) {
      console.log(ifResolved);
      plannerPortal.editTicket({
        _id: ticket._id,
        category: ticket.category,
        subCategory: ticket.subCategory,
        service: ticket.service,
        workersAssigned: ticket.workersAssigned,
        resolved: ifResolved
      })
      .then(function (response) {
        var config = {
          text: "Successfully resolved the ticket",
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
