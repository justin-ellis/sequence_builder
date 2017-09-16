const app = angular.module('sequence-builder', []);

app.controller('mainController', ['$http', function($http){
	console.log('angular is here');
	const controller = this;
	this.poses = [];
	this.hideForm = true;
	this.showLogin = false;
	this.URL = 'https://yoga.com/api/content/feed/?format=json&type=pose&offset=0&limit=500';
	this.asanaDifficulties = [
	{name: 'Beginner', difficulty: 'Beginner'},
	{name: 'Intermediate', difficulty: 'Intermediate'},
	{name: 'Expert', difficulty: 'Expert'}
	];
	this.asanaCategories = [
	{name: 'Standing', category: 'Standing'},
	{name: 'Seated', category: 'Seated'},
	{name: 'Twist', category: 'Twist'},
	{name: 'Backbend', category: 'Backbend'},
	{name: 'Balancing', category: 'Balancing'},
	{name: 'Neutral', category: 'Neutral'},
	{name: 'Prone', category: 'Prone'},
	{name: 'Supine', category: 'Supine'},
	{name: 'Lateral Bend', category: 'Lateral Bend'},
	{name: 'Forward Bend', category: 'Forward Bend'},
	{name: 'Arm and Leg Support', category: 'Arm and Leg Support'},
	{name: 'Arm Balance and Inversion', category: 'Arm Balance and Inversion'},
	];
	
	this.displayLogin = function(){
		this.showLogin = true;
	};

	this.hideLogin = function(){
		this.concealLogin = true;
	};

	this.getYogaPoses = function(){
		$http({

			method: 'GET',
			url: '/asana',
			// headers: {
   //  'Access-Control-Allow-Origin': 'https://yoga.com/api/content/feed/?format=json&type=pose&offset=0&limit=500'}
		}).then(
		function(response){
			controller.poses = response.data;
			console.log(response.data);
		},
		function(err){
			console.log(err);
		});
	};

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
	
	this.getYogaPoses();

}]);