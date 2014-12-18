function MainController($scope,$http){
	window.mc_scope = $scope;
	// scope variables
	$scope.pageView = "";
	$scope.dict = window.dictionary;
	//constants
	// page titles
	$scope.scheduling = "Scheduling";
	$scope.campaign = "Campaign";
	$scope.images = "Images";

	$scope.setFilterDate = function(date) {
		$scope.filterDate = date;
	};

	$scope.changeView = function(viewName){
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
			type: 'GET'
		}).success(function(data, status, headers, config){
			$scope.imageData = data.images;
		}).error(function(data, status, headers, config){
			console.log('image failed:',status);
			$scope.error = 'image failed: '+status;
		});
	};

    $scope.imagePreview = '';
    $scope.imagePreviewText = '';

    $scope.convertToDate = function (stringDate){
        var dateOut = new Date(stringDate);
        dateOut.setDate(dateOut.getDate() + 1);
        return dateOut;
    };

    $scope.setPreview = function(url, name){
        $scope.imagePreview = url;
        $scope.imagePreviewText = name;
    };

};

function CampaignController($scope, $http){
	$scope.init = function(){
		$scope.getImages();
		$scope.getAllCampaigns();
	};

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
			, type: 'GET'
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
		$scope.selectedImages.push(image);
	};

	// populate $scope.campaigns
	// should be a controller...
    $scope.getAllCampaigns = function() {
    	$http({
			url: '/api/getAllCampaigns',
			type: 'GET'
		}).success(function(data, status, headers, config){
			$scope.campaigns = data.campaigns;
		}).error(function(data, status, headers, config){
			console.log('get all campaigns failed:',status);
			$scope.error = 'get all campaigns failed: '+status;
		});
    }

	$scope.saveCampaign = function() {
		// need validation
		var campaign = {};
		campaign.images = $scope.selectedImages;
		campaign.name = $scope.campaignName;
		campaign.description = $scope.campaignDescription;
		console.log(campaign);
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
			console.log("successfully saved campaign.");
		})
		.error(function(data, status, headers, config) {
			console.error(data.error);
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

	// ng-model
	$scope.selectedCampaign = {};


	$scope.getAllSchedules = function() {
		$http({
			url: '/api/getAllSchedules',
			type: 'GET'
		}).success(function(data, status, headers, config){
			$scope.schedules = data.schedules;
			$scope.populateSchedules();
		}).error(function(data, status, headers, config){
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
	}

	$scope.saveSchedule = function() {
		// need validation
		var schedule = {};
		schedule.id = $scope.selectedCampaign._id;
		
		// Wil can you wire these to your datepicker?
		schedule.start = new Date();
		schedule.end = new Date(Date.now() + 3600000); //default 1 hr
		
		console.log("saving sched ", schedule);
		$http({
			method: "POST",
			url:"/api/createSchedule",
			data: schedule,
			headers: { 'Content-type': 'application/json'}
		})
		.success(function(data, status, headers, config) {
			$scope.selectedImages = [];
			$scope.selectedIndex = [];
			$scope.campaignName = "";
			$scope.campaignDescription = "";
			console.log("successfully saved Schedule.");
		})
		.error(function(data, status, headers, config) {
			console.error(data.error);
		});
	}

	// populate $scope.campaigns
    $scope.getAllCampaigns = function() {
    	$http({
			url: '/api/getAllCampaigns',
			type: 'GET'
		}).success(function(data, status, headers, config){
			$scope.campaigns = data.campaigns;
		}).error(function(data, status, headers, config){
			console.log('get all campaigns failed:',status);
			$scope.error = 'get all campaigns failed: '+status;
		});
    }

    // callback assigns data to schedules[i].campaign
    $scope.getCampaign = function(campaignID, index, cb) {
    	console.log("search:", campaignID, index);
    	$http({
			url: '/api/getCampaign/'+campaignID,
			type: 'GET'
		}).success(function(data, status, headers, config){
			console.log("got campaign:", data);
			cb(data, index);
		}).error(function(data, status, headers, config){
			console.log('get all campaigns failed:',status);
			$scope.error = 'get all campaigns failed: '+status;
		});
    }	
};

var StartDateTimePicker = function ($scope, $timeout) {
    $scope.dateTimeNow = function() {
        $scope.date = new Date();
    };
    $scope.dateTimeNow();

    $scope.toggleMinDate = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.maxDate = new Date('2014-06-22');
    $scope.toggleMinDate();

    $scope.dateOptions = {
        startingDay: 1,
        showWeeks: false
    };

    $scope.$watch('date', function () {
       console.log('changed');
    });

    $scope.editTime = false;

    $scope.revealDateTime = function (bool){
        console.log('edit date time: ',bool);
        $scope.editTime = bool;
    };
    // Disable weekend selection
    $scope.disabled = function(calendarDate, mode) {
        return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
    };

    $scope.hourStep = 1;
    $scope.minuteStep = 15;

    $scope.timeOptions = {
        hourStep: [1, 2, 3],
        minuteStep: [1, 5, 10, 15, 25, 30]
    };

    $scope.showMeridian = true;
    $scope.timeToggleMode = function() {
        $scope.showMeridian = !$scope.showMeridian;
    };
};

var EndDateTimePicker = function ($scope, $timeout) {
    $scope.dateTimeNow = function() {
        $scope.date = new Date();
    };
    $scope.dateTimeNow();

    $scope.toggleMinDate = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.maxDate = new Date('2014-06-22');
    $scope.toggleMinDate();

    $scope.dateOptions = {
        startingDay: 1,
        showWeeks: false
    };

    $scope.$watch('date', function () {
        console.log('changed');
    });

    $scope.editTime = false;

    $scope.revealDateTime = function (bool){
        console.log('edit date time: ',bool);
        $scope.editTime = bool;
    };

    // Disable weekend selection
    $scope.disabled = function(calendarDate, mode) {
        return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
    };

    $scope.hourStep = 1;
    $scope.minuteStep = 15;

    $scope.timeOptions = {
        hourStep: [1, 2, 3],
        minuteStep: [1, 5, 10, 15, 25, 30]
    };

    $scope.showMeridian = true;
    $scope.timeToggleMode = function() {
        $scope.showMeridian = !$scope.showMeridian;
    };
};