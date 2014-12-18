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
        if($scope.campaignName === '' || $scope.selectedImages.length == 0){
            console.error('validation fail');
            // TODO: implement modals
        } else {
            var campaign = {};
            campaign.images = $scope.selectedImages;
            campaign.name = $scope.campaignName;
            campaign.description = $scope.campaignDescription;
            // TODO: implement success alert
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
                    // show list
                    $scope.showAddCampaign(false);
                    // TODO: tie in success alert
                    console.log("successfully saved campaign.");
                })
                .error(function(data, status, headers, config) {
                    console.error(data.error);
                });
        }
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
    }

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
	}

    $scope.cancelSchedule = function(){
        $scope.campaignNameDD='0';
        $scope.data.startDate='';
        $scope.data.endDate='';
        $scope.showAddSchedule(false);
    }

	$scope.saveSchedule = function() {
		// validate schedule info
        $scope.showAddSchedule(false);
		if($scope.data.startDate === '' || $scope.data.endDate === '' || $scope.campaignNameDD === ' 0' ){
           // TODO: implement alert error
            console.error('validation failed');
        } else {
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
                $scope.selectedImages = [];
                $scope.selectedIndex = [];
                $scope.campaignName = "";
                $scope.campaignDescription = "";
                // TODO: implement success alert
                console.log("successfully saved Schedule.");
            })
            .error(function(data, status, headers, config) {
                    // TODO: implement failure modal
                console.error(data.error);
            });
        }
	}

	// populate $scope.campaigns
    $scope.getAllCampaigns = function() {
    	$http({
			url: '/api/getAllCampaigns',
			type: 'GET'
		}).success(function(data, status, headers, config){
			$scope.campaigns = data.campaigns;
		}).error(function(data, status, headers, config){
            // TODO: implement modal
			console.log('get all campaigns failed:',status);
			$scope.error = 'get all campaigns failed: '+status;
		});
    }

    // callback assigns data to schedules[i].campaign
    $scope.getCampaign = function(campaignID, index, cb) {
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
