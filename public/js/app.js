const app = angular.module('sequence-builder', []);

app.controller('mainController', ['$http', function($http){
	console.log('angular is here');
	const controller = this;
	this.poses = [];
	this.hideForm = true;
	this.showLogin = false;
	
	this.displayLogin = function(){
		this.showLogin = true;
	};

	this.hideLogin = function(){
		this.concealLogin = true;
	};

	// this.getYogaPoses = function(){
	// 	$http({
	// 		method: 'GET',
	// 		url: 'https://yoga.com/api/content/feed/?format=json&type=pose&offset=0&limit=500'
	// 	}).then(
	// 	function(response){
	// 		controller.poses = response.data;
	// 	},
	// 	function(err){
	// 		console.log(err);
	// 	});
	// };

	this.registerUser = function(username, password){
		$http({
			method: 'POST',
			url: '/session/register',
			data: {
				username: this.registeredUsername,
				password: this.registeredPassword
			}
		}).then(
		function(response){
			controller.registeredUsername = '';
			controller.registeredPassword = '';
			controller.newUser = response.data;
			console.log(response.data);
			if(response.data){
				controller.loggedIn = true;
				controller.hideForm = false;
			}
			controller.hideLogin();
		},
		function(err){
			console.log(err);
		});
	};

	this.login = function(username, password){
		$http({
			method: 'POST',
			url: '/session/login',
			data: {
				username: this.username,
				password: this.password
			}
		}).then(
		function(response){
			controller.username = '';
			controller.password = '';
			controller.foundUser = response.data;
			console.log(response.data);

			if(response.data != true){
				console.log('wrong username or password');
				controller.loggedIn = false;
				controller.hideForm = true;
				// this.showLogin = true;
				// location.reload(true);
				controller.concealLogin = false;
				// this.displayLogin();
			}
			else if(response.data){
				controller.loggedIn = true;
				controller.hideForm = false;
				controller.hideLogin();
			}
		},
		function(err){
			console.log(err);
		});
	};



	this.logout = function(username, password){
		$http({
			method: 'GET',
			url: '/session/logout',
			data: {
				username: this.loggedOutUsername,
				password: this.loggedOutPassword
			}
		}).then(
		function(response){
				controller.loggedIn = false;
				location.reload(true);
		},
		function(err){
			console.log(err);
		});
	};

	this.showForm = function(){
		this.hideForm = false;
	};
	
	// this.getYogaPoses();

}]);