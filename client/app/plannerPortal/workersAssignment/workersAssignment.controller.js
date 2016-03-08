'use strict';

angular.module('indiaworksMainSiteApp')
  .controller('WorkersAssignmentCtrl', function ($scope, plannerPortal, $http, Toast, $mdDialog) {
    
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
    $scope.selectedMode = "All";
    $scope.currentFilter = "filterAll";

    $scope.filterFunction = function (item) {
      if($scope.selectedMode == "All"){
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
