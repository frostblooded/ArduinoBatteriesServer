var SERVER_IP = "http://91.139.243.106:8080/";

var myApp = angular.module("myModule", []);

myApp.controller("myController", function ($scope, $http) {
	'use strict';
	$http.get(SERVER_IP + 'data').success(function(json){
		for(var i = 0; i < json.length; i++)
			json[i].time = new Date(json[i].time).toLocaleString();

		$scope.log = json;
	});
});
