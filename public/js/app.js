const app = angular.module('sequence-builder', []);

app.controller('mainController', ['$http', '$q', function($http, $q){
	console.log('angular is here');
	const controller = this;
	this.show = 'Show';
	this.hide = 'Hide';
	this.postures = [];
	this.sequences = [];
	this.loggedOutButton = "Login";
	this.loggedInButton = "Log out";
	this.sequencesToggle = "Show"
	this.showToggle = "Hiding";
	this.hideToggle = "Showing";
	this.hideForm = true;
	this.showLogin = false;
	this.showRegistration = false;
	this.showSequence = false;
	this.poseArray = [];
	this.editSequenceIndex = 0;
	this.asanaIndex = 0;
	this.filteredPostures = [];
	this.activeUsername = '';
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
	{name: 'Arm and Leg Support', category: 'Arm+Leg Support'},
	{name: 'Arm Balance and Inversion', category: 'Arm Balance+Inversion'},
	];


		this.showName = true;
		this.showSanskrit = true;
		this.showPicture = true;
		this.showCategory = false;
		this.showDescription = false;
		this.showBenefits = false;
		this.showDifficulty = false;

		this.getUsers = function(){
			$http({
				method: 'GET',
				url: '/users',
				data: {
					username: this.username
				}
			}).then(
			function(response){
				console.log(response.data.username);
				controller.activeUsername = response.data.username;
			},
			function(err){
				console.log(err);
			});
		};

		this.seedDb = function(){
			$http({
				method: 'GET',
				url: '/seed',
			}).then(
			function(response){
				// console.log(response.data);
			},
			function(err){
				console.log(err);
			});
		};

		this.getSequences = function(){
			$http({
				method: 'GET',
				url: '/sequence',
			}).then(
			function(response){
				controller.sequences = response.data;
				// console.log(response.data);
			},
			function(err){
				console.log(err);
			});
		};
	
	this.displayLogin = function(){
		this.showLogin = !this.showLogin;
	};

	this.hideLogin = function(){
		this.concealLogin = true;
	};

	this.getYogaPoses = function(){
		$http({

			method: 'GET',
			url: '/asana',
		}).then(
		function(response){
			poseArray = [];
			for (i = 0; i < 104; i++) {
			controller.poseArray.push(response.data[i]);
			}
			controller.postures = response.data;
			console.log(controller.poseArray);
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
			controller.getUsers();

			if(response.data){
				// check to see if this works for registered users
				controller.activeUsername = controller.username;
				controller.loggedIn = true;
				controller.hideForm = false;
			}
			controller.hideLogin();
		},
		function(err){
			console.log(err);
		});
				this.getUsers();
	};

	this.login = function(username, password){
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/session/login',
			data: {
				username: this.username,
				password: this.password,
			}
		}).then(
		function(response){
			controller.username = "";
			controller.password = "";
			// controller.foundUser = response.data;
		controller.getUsers();
		// controller.getUsers();

			if(response.data != true){
				console.log('wrong username or password');
				controller.loggedIn = false;
				controller.hideForm = true;
				// this.showLogin = true;
				controller.concealLogin = false;
		// controller.getUsers();
				// this.displayLogin();
			}
			else if(response.data){
			// console.log(controller.foundUser);
				controller.activeUsername = controller.username;
				// console.log(this.username);
				// console.log(this.activeUsername);
				controller.loggedIn = true;
				controller.hideForm = false;
				controller.hideLogin();
				// controller.getUsers();
			}
		// controller.getUsers();

		},
		function(err){
			console.log(err);
		});
		// controller.getUsers();
		
				// this.checkSequenceAuthors();
				// this.checkSequenceAuthors();
				// this.getUsers();
		this.getSequences();
		// this.getUsers();
		// this.getUsers();
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

	this.toggleSequences = function(){
		this.showSequence = !this.showSequence;
	};
	
	this.toggleDetails = function(detail){
		switch(detail){
			case "name":
			this.showName = !this.showName;
			break;
			case "sanskrit":
			this.showSanskrit = !this.showSanskrit;
			break;
			case "picture":
			this.showPicture = !this.showPicture;
			break;
			case "category":
			this.showCategory = !this.showCategory;
			break;
			case "description":
			this.showDescription = !this.showDescription;
			break;
			case "benefits":
			this.showBenefits = !this.showBenefits;
			break;
	}
	};




		this.deleteSequence = function(sequence){
			$http({
				method: 'DELETE',
				url: '/sequence/' + sequence._id,
			}).then(
			function(response){
				console.log(response.data);
			},
			function(err){
				console.log(err);
			});
				this.getSequences();
		};

	this.createSequence = function(){
		$http({
			method: 'POST',
			url: '/sequence',
			data: {
				name: this.name,
				difficulty: this.difficulty,
				author: this.author,
				poses: this.poses
			}
		}).then(
		function(response){
				controller.name = '';
				controller.difficulty = '';
				controller.author = '';
				controller.poses = [];
				controller.getUsers();

				// location.reload(true);
		},
		function(err){
			console.log(err);
		});
				this.getSequences();
				this.getSequences();
				this.showSequence = true;

	};

	this.editSequence = function(sequence, index){
		$http({
			method: 'PUT',
			url: '/sequence/' + sequence._id,
			data: {
				name: this.updatedName,
				difficulty: this.updatedDifficulty,
				author: this.updatedAuthor,
				// poses: poseArray[index]
			}
		}).then(
		function(response){
			console.log(response);
				controller.name = '';
				controller.difficulty = '';
				controller.author = '';
				controller.poses = [];
				// location.reload(true);
		},
		function(error){
		});
				this.getSequences();
	};

	this.createAsana = function(index){
		$http({
			method: 'POST',
			url: '/asana',
			data: {
				objectId: this.objectId,
				poseData: controller.filteredPostures[index],
			}
		}).then(
		function(response){
			// maybe make a function that generates a unique id. call it here
			// and set the objectId equal to that.
			controller.objectId = "";
			console.log(controller.postures[index]);
			console.log(controller.poseArray[index]);

			// controller.poseData = {};
			console.log(response);
		},
		function(error){

		});
		this.getSequences();
		this.getSequences();

	};

	this.deleteAsana = function(asana){
		$http({
			method: 'DELETE',
			url: '/asana/' + asana._id
		}).then(
		function(response){
			console.log('clicked success');
			console.log(response.data);
			console.log(response);
		},
		function(error){
			console.log('clicked error');
			console.log(error);
		});
	this.getSequences();
	this.getSequences();
	};

	this.checkSequenceAuthors = function(){
		for (let i = 0; i <= controller.sequences.length-1; i++) {
			// console.log(i + ' iteration number');
			// console.log(controller.sequences + ' is controller.sequences');
			// console.log(controller.sequences.length + ' is controller.sequences.length');
			// console.log(controller.sequences[i]);
			// console.log(JSON.stringify(controller.sequences[i]));
			// console.log(JSON.stringify(controller.sequences[i]));
			// console.log(JSON.stringify(controller.sequences[i]));
			// console.log(controller.sequences[i].author);
			// console.log(controller.sequences[i]);

			// console.log(controller.sequences);
			// console.log(controller.sequences[0].author);
			// console.log(controller.sequences[1]);
			// console.log(controller.sequences[2]);
			// console.log(typeof controller.sequences);
			if (controller.sequences[i].author === controller.activeUsername){
				console.log('check sequences for matching username returning true');
				return true;
		
			} 
			// else {
			// 	return false;
			// }
		}
				// console.log('check sequences for matching username returning false');
		return false;
	};

	this.checkDeleteButton = function(){
		for (let i = 0; i <= controller.sequences.length-1; i++) {
			if (controller.sequences[i].author != controller.activeUsername){
				console.log('check delete button for matching username returning false');
				return false;
			} 
		}
				console.log('check delete button for matching username returning true');
		return true;
	};
	// 	this.deleteAsana = function(asana){
	// 	$http({
	// 		method: 'DELETE',
	// 		url: '/sequence/' + asana._id
	// 	}).then(
	// 	function(response){
	// 		console.log(response);
	// 	},
	// 	function(error){
	// 		console.log(error);
	// 	});
	// this.getSequences();
	// };

// might need to go through sequence controller/route to delete postures from
// a specific sequence

	this.getSequences();
	this.getYogaPoses();

}]);