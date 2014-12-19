function MainController($scope,$http,$timeout){
	window.mc_scope = $scope;
	// scope variables
	$scope.pageView = "";
	$scope.dict = window.dictionary;
	//constants
	// page titles
	$scope.scheduling = "Scheduling";
	$scope.campaign = "Campaign";
	$scope.images = "Images";

	$scope.alerts = [];

	$scope.addAlert = function(msg, type) {
		$scope.alerts.push({"msg": msg, "type":type});
		$scope.hidden = false;
		$scope.hideAlert();
		if(type === "success"){
			//$scope.hideAlert();
		}
		if (type === "warning") {
			//$scope.hideAlert();
		}
		if (type === "danger") {
			//$scope.hideAlert();
		}
	};

	$scope.hideAlert = function () {
		// $scope.startFade = true;
		//TODO: add  'ng-class="{fade: startFade}" ' to the alert. I kept getting errors
		$timeout(function(){
			$scope.alerts.shift();
			$scope.hidden = true;
		}, 2000);

	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.changeView = function(viewName){
		$scope.alerts = [];
		$scope.pageView = viewName;
	};

	$scope.convertBytes = function(bytes) {
		if(bytes == 0) {
			return '0 Byte';
		}
		var k = 1000;
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		var i = Math.floor(Math.log(bytes) / Math.log(k));
		return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	};

	$scope.init = function() {
		// set page view to default of 'scheduling'
		$scope.changeView($scope.scheduling);
	};
};

function ImageController($scope,$http){
	$scope.init = function(){
		$scope.getImages();
	};

	$scope.imageData = [];
	$scope.error = '';

	$scope.getImages = function(){
		$http({
			url: '/api/getImages',
			method: 'GET'
		}).success(function(data, status, headers, config){
			$scope.imageData = data.images;
			$scope.setPreview(0);
		}).error(function(data, status, headers, config){
			console.log('image failed:',status);
			$scope.error = 'image failed: '+status;
		});
	};

	$scope.imagePreview = '';
	$scope.imagePreviewText = '';
	$scope.imagePreviewDate = '';
	$scope.imagePreviewSize = '';

	$scope.convertToDate = function (stringDate){
		var dateOut = new Date(stringDate);
		dateOut.setDate(dateOut.getDate() + 1);
		return dateOut;
	};

	$scope.setPreview = function(index){
		var image = $scope.imageData[index];
		console.log('image['+index+']:',image);
		$scope.imagePreview = image.url;
		$scope.imagePreviewText = image.friendlyName;
		$scope.imagePreviewDate = image.created_at;
		$scope.imagePreviewSize = image.bytes;
	};

	$scope.deleteImage = function(index) {

		var image = $scope.imageData[index];
		var data = {};
		data.id = image.public_id;
		$http({
			url: '/api/deleteImage/'+image._id,
			method: 'DELETE',
			data: data,
			headers: { 'Content-type': 'application/json'}
		}).success(function(data, status, headers, config){
			$scope.getImages();
			console.log("we the best");
			$scope.addAlert($scope.dict.images.successfulDelete, "success");
		}).error(function(data, status, headers, config){
			console.log('Deleting image failed:', status);
			$scope.error = 'Deleting image failed: ' + status;
		});
	};
};

function CampaignController($scope, $http){
	$scope.init = function(){
		$scope.getImages();
		$scope.getAllCampaigns();
	};

	$scope.addCampaign = false;

	$scope.showAddCampaign = function(bool){
		$scope.addCampaign = bool;
	}

	$scope.cancelCampaign = function(){
		$scope.selectedImages = [];
		$scope.campaignDescription = "";
		$scope.campaignName = "";
		$scope.showAddCampaign(false);
	}

	// all the images in our DB
	$scope.repoImages = [];

	// ALL Campaigns
	$scope.campaigns = [];

	$scope.selectedImages = [];

	$scope.error = '';
	$scope.campaignDescription = "";
	$scope.campaignName = "";

	// this should be a service...
	$scope.getImages = function(){
		$http({url: '/api/getImages'
			, method: 'GET'
		}).success(function(data, status, headers, config){
			$scope.repoImages = data.images;
			$scope.selectedImages;
		}).error(function(data, status, headers, config){
			console.log('image failed:',status);
			$scope.error = 'image failed: '+status;
		});
	};

	$scope.addImage = function(index) {
		image = $scope.repoImages[index];
		$scope.selectedImages.unshift(image);
	};

	$scope.removeImage = function(index) {
		$scope.selectedImages.splice(index, 1);
	}

	// populate $scope.campaigns
	// should be a controller...
	$scope.getAllCampaigns = function() {
		$http({
			url: '/api/getAllCampaigns',
			method: 'GET'
		}).success(function(data, status, headers, config){
			$scope.campaigns = data.campaigns;
		}).error(function(data, status, headers, config){
			console.log('get all campaigns failed:',status);
			$scope.error = 'get all campaigns failed: '+status;
		});
	}

	$scope.saveCampaign = function() {
		if($scope.campaignName === ''){
			console.error('Enter a name!');
			$scope.addAlert($scope.dict.campaign.nameError , "danger");
		} else if ($scope.selectedImages.length == 0) {
			console.error('Select an image!');
			$scope.addAlert( $scope.dict.campaign.imageError , "danger");
		}
		else {
			var campaign = {};
			campaign.images = $scope.selectedImages;
			campaign.name = $scope.campaignName;
			campaign.description = $scope.campaignDescription;
			$http({
				method: "POST",
				url:"/api/createCampaign",
				data: campaign,
				headers: { 'Content-type': 'application/json'}
			})
			.success(function(data, status, headers, config) {
				$scope.selectedImages = [];
				$scope.campaignName = "";
				$scope.campaignDescription = "";
				// show list
				$scope.showAddCampaign(false);
				// success alert
				$scope.addAlert($scope.dict.campaign.successfulAdd,"success");
				$scope.getAllCampaigns();
			})
			.error(function(data, status, headers, config) {
				console.error(data.error);
			});
		}
	};

	$scope.deleteCampaign = function(index) {
		var campaignID = $scope.campaigns[index]._id;

		$http({
			url: '/api/deleteCampaign/'+campaignID,
			method: 'DELETE'
		}).success(function(data, status, headers, config){
			$scope.getAllCampaigns();
			$scope.addAlert($scope.dict.campaign.successfulDelete, "success");
		}).error(function(data, status, headers, config){
			console.log('Deleting campaign failed:', status);
			$scope.error = 'Deleting campaign failed: ' + status;
		});
	};
};

function ScheduleController($scope, $http){
	
	$scope.init = function() {
		$scope.getAllSchedules();
		$scope.getAllCampaigns();
	};

	// all schedules
	$scope.schedules = [];
	
	// ALL Campaigns
	$scope.campaigns = [];

	$scope.addSchedule = false;

	$scope.showAddSchedule = function(bool){
		$scope.addSchedule = bool;
	};

	$scope.data = {
		startTime : "",
		endTime : ""	
	};
	
	$scope.campaignNameDD = 0;


	// ng-model
	$scope.selectedCampaign = {};

	$scope.getAllSchedules = function() {
		$http({
			url: '/api/getAllSchedules',
			method: 'GET'
		}).success(function(data, status, headers, config){
			$scope.schedules = data.schedules;
			$scope.populateSchedules();
		}).error(function(data, status, headers, config){
			// TODO: implement modal
			console.log('failed: ',status);
			$scope.error = 'failed: '+status;
		});
	};

	// retrieve the campaign for each schedule
	$scope.populateSchedules = function() {
		var length = $scope.schedules.length;

		for (var i = 0; i < length; i++) {
			var schedule = $scope.schedules[i];
			// async get campaign continue iterating.
			$scope.getCampaign(schedule.campaignID, i, function(data, index) {
				// when get data reinsert at index
				$scope.schedules[index].campaign = data.campaign;	
			});
		}
	};

	$scope.cancelSchedule = function(){
		$scope.campaignNameDD='0';
		$scope.data.startDate='';
		$scope.data.endDate='';
		$scope.showAddSchedule(false);
	};

	$scope.saveSchedule = function() {
		// validate schedule info
		if(!$scope.data.startDate){
		   // TODO: implement alert error
		   	$scope.addAlert($scope.dict.schedule.errorStart, "warning");
			console.error('start date validation failed');
		} else if (!$scope.data.endDate) {
			$scope.addAlert($scope.dict.schedule.errorEnd , "warning");
			console.error('end date validation failed');
		}
		else if ($scope.campaignNameDD == '0' ) {
			$scope.addAlert($scope.dict.schedule.errorCampaign);
			console.error('selected campaign validation failed' , "warning");
		}
		else {
			// create json object
			var schedule = {};
			schedule.id = $scope.campaignNameDD._id;
			schedule.start = $scope.data.startDate;
			schedule.end = $scope.data.endDate;
			// make ajax
			$http({
				method: "POST",
				url:"/api/createSchedule",
				data: schedule,
				headers: { 'Content-type': 'application/json'}
			})
			.success(function(data, status, headers, config) {
				$scope.showAddSchedule(false);
				$scope.data.startDate = undefined;
				$scope.data.endDate = undefined;
				$scope.data.campaignNameDD = '0';
				console.log("successfully saved Schedule.");
				$scope.getAllSchedules();
				// success alert
				$scope.addAlert($scope.dict.schedule.successfullySavedSchedule,"success");
			})
			.error(function(data, status, headers, config) {
					// TODO: implement failure modal
				$scope.addAlert("ERROR:!!!" + data.error, "danger");
				console.error(data.error);

			});
		}
	};

	$scope.deleteSchedule = function(index) {
		var scheduleID = $scope.schedules[index]._id;

		$http({
			url: '/api/deleteSchedule/'+scheduleID,
			method: 'DELETE'
		}).success(function(data, status, headers, config){
			$scope.getAllSchedules();
			$scope.addAlert($scope.dict.schedule.successfulDelete, "success");
		}).error(function(data, status, headers, config){
			console.log('Deleting schedule failed:', status);
			$scope.error = 'Deleting schedule failed: ' + status;
		});
	};

	// populate $scope.campaigns
	$scope.getAllCampaigns = function() {
		$http({
			url: '/api/getAllCampaigns',
			method: 'GET'
		}).success(function(data, status, headers, config){
			$scope.campaigns = data.campaigns;
		}).error(function(data, status, headers, config){
			// TODO: implement modal
			console.log('get all campaigns failed:',status);
			$scope.error = 'get all campaigns failed: '+status;
		});
	};

	// callback assigns data to schedules[i].campaign
	$scope.getCampaign = function(campaignID, index, cb) {
		$http({
			url: '/api/getCampaign/'+campaignID,
			method: 'GET'
		}).success(function(data, status, headers, config){
			cb(data, index);
		}).error(function(data, status, headers, config){
			console.log('get all campaigns failed:',status);
			$scope.error = 'get all campaigns failed: '+status;
		});
	};	
};
