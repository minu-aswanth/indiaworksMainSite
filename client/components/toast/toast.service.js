'use strict';

angular.module('indiaworksMainSiteApp')
  .factory('Toast', function ($rootScope, $mdToast) {
  	// Creates toasts in angular-material
		return {
			simpleToast: function (config) {
				var text = config.text;
				var intervalTime = config.intervalTime || 2000;
				var position = config.position || "bottom left";
	      $mdToast.show({
	        position: position,
	        template: "<md-toast>" + text +"</md-toast>",
	        hideDelay: intervalTime
	      });
			}

		}  	

	});