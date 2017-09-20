const app = angular.module('sequence-builder', []);

app.controller('mainController', ['$http', function($http){
	console.log('angular is here');
	const controller = this;
	this.showTranslation = 'Translation';
	this.hideTranslation = 'Hide';
	this.postures = [];
	this.sequences = [];
	this.showToggle = "Hiding";
	this.hideToggle = "Showing";
	this.hideForm = true;
	this.showLogin = false;
	let poseArray = [];
	this.editSequenceIndex = 0;
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
	{name: 'Arm and Leg Support', category: 'Arm and Leg Support'},
	{name: 'Arm Balance and Inversion', category: 'Arm Balance and Inversion'},
	];
		this.showName = true;
		this.showSanskrit = true;
		this.showPicture = true;
		this.showCategory = true;
		this.showDescription = false;
		this.showBenefits = false;
		this.showDifficulty = false;
	
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
			// headers: {
   //  'Access-Control-Allow-Origin': 'https://yoga.com/api/content/feed/?format=json&type=pose&offset=0&limit=500'}
		}).then(
		function(response){
			poseArray = [];
			for (i = 0; i < 104; i++) {
			poseArray.push(response.data[i]);
			}
			controller.postures = response.data;
			console.log(poseArray);
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
				password: this.password,
			}
		}).then(
		function(response){
			controller.username = "";
			controller.password = "";
			controller.foundUser = response.data;

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
			console.log(controller.foundUser);
				controller.activeUsername = controller.username;
				console.log(this.username);
				console.log(this.activeUsername);
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
				// location.reload(true);
				// this.getSequences();
		},
		function(err){
			console.log(err);
		});
	};

	this.editSequence = function(sequence, index){
		$http({
			method: 'PUT',
			url: '/sequence/' + sequence._id,
			data: {
				name: this.updatedName,
				difficulty: this.updatedDifficulty,
				author: this.updatedAuthor,
				poses: poseArray[index]
			}
		}).then(
		function(response){
			console.log(response);
				// this.getSequences();
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

	// 	this.editSequencePoses = function(sequence, index){
	// 	$http({
	// 		method: 'PUT',
	// 		url: '/sequence/' + sequence._id,
	// 		data: {
	// 			poses: poseArray[index]
	// 			// poses: this.updatedPoses
	// 		}
	// 	}).then(
	// 	function(response){
	// 		console.log(response);
	// 			location.reload(true);
	// 	},
	// 	function(error){
	// 	});
	// 			this.getSequences();
	// };

	this.createAsana = function(index){
		$http({
			method: 'POST',
			url: '/asana',
			data: {
				poses: poseArray[index],
		// file_reference: this.file_reference,
  //   pose_name: this.pose_name,
  //   sanskrit_name: this.sanskrit_name,
  //   translation:this.translation,
  //   category: this.category,
  //   difficulty: this.difficulty,
  //   description:this.description,
  //   benefits: this.benefits
			}
		}).then(
		function(response){
			console.log(response);
			// file_reference = ''; 
   //  pose_name = ''; 
   //  sanskrit_name = ''; 
   //  translation = [];
   //  category = ''; 
   //  difficulty = ''; 
   //  description = [];
   //  benefits = ''; 
		},
		function(error){

		});
	};

	this.getSequences();
	this.getYogaPoses();

}]);