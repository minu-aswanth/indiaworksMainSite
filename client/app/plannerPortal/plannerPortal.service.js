'use strict';

angular.module('indiaworksMainSiteApp')
  .service('plannerPortal', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
    	createService: function (data) {
        	return $http.post('/api/services', data).then(function (response) {
        		return response.data;
      		});
    	},

    	createSubCategory: function (data) {
        	return $http.post('/api/subCategories', data).then(function (response) {
        		return response.data;
      		});
    	},

    	createCategory: function (data) {
        	return $http.post('/api/categories', data).then(function (response) {
        		return response.data;
      		});
    	},

    	getServices:function(){
        	return $http.get('/api/services').then(function (response){
          		return response.data;
        	})
      	},

      	getSubCategories:function(){
        	return $http.get('/api/subCategories').then(function (response){
          		return response.data;
        	})
      	}
  	};
  });
