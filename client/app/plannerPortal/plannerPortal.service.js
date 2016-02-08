'use strict';

angular.module('indiaworksMainSiteApp')
  .service('plannerPortal', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      createTicket: function (data) {
        return $http.post('/api/tickets', data).then(function (response) {
          return response;
        });
      },

    	createService: function (data) {
      	return $http.post('/api/services', data).then(function (response) {
      		return response;
    		});
    	},

    	createSubCategory: function (data) {
      	return $http.post('/api/subCategories', data).then(function (response) {
      		return response;
    		});
    	},

    	createCategory: function (data) {
      	return $http.post('/api/categories', data).then(function (response) {
      		return response;
    		});
    	},

    	getServices: function () {
      	return $http.get('/api/services').then(function (response) {
      		return response;
      	})
    	},

    	getSubCategories: function () {
      	return $http.get('/api/subCategories').then(function (response) {
      		return response;
      	})
    	},

      getCategories: function () {
        return $http.get('/api/categories').then(function (response) {
          return response;
        })
      },

      getTickets: function () {
        return $http.get('/api/tickets').then(function (response) {
          return response;
        })
      },

      getWorkers: function () {
        return $http.get('/api/users/worker').then(function (response) {
          return response;
        })
      },

      editService: function (data) {
        return $http.put('/api/services/' + data._id, data).then(function (response) {
          return response;
        });
      },

      editSubCategory: function (data) {
        return $http.put('/api/subCategories/' + data._id, data).then(function (response) {
          return response;
        });
      },

      editCategory: function (data) {
        return $http.put('/api/categories/' + data._id, data).then(function (response) {
          return response;
        });
      },

      editTicket: function (data) {
        return $http.put('/api/tickets/' + data._id, data).then(function (response) {
          return response;
        });
      }
      
  	};
  });
