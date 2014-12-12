app.controller("mainController", function($scope,$http){
	window.mc_scope = $scope;
	// scope variables
	$scope.results = [];

    $scope.pageView = "";

    /*$scope.filterText = null;

    $scope.availableGenres = [];
    $scope.genreFilter = null;
    $scope.orderFields = ["Air Date", "Rating"];
    $scope.orderDirections = ["Descending", "Ascending"];
    $scope.orderField = "Air Date"; //Default order field
    $scope.orderReverse = false;
    $scope.filterDate = '';
    $scope.allDates = [];*/

    //constants
    // page titles
    $scope.scheduling = "Scheduling";
	$scope.campaign = "Campaign";
	$scope.images = "Images";

	$scope.saveCampaign = "Save Campaign";
	$scope.scheduleCampaign = "Schedule Campaign";

	$scope.setFilterDate = function(date) {
	    $scope.filterDate = date;
	}

    // set page view to default of 'scheduling'
    $scope.pageView = $scope.scheduling;


    // TODO: Modify this to work with Bootstrap tab change
	$scope.setShowType = function(type) {
		if(type == $scope.showTypePremieres || type == $scope.showTypeShows){
			$scope.showType = type;
			$scope.init();
		}
	}

	/*$scope.customOrder = function(tvshow) {
	    switch ($scope.orderField) {
	        case "Air Date":
	            return tvshow.episode.first_aired;
	            break;
	        case "Rating":
	            return tvshow.episode.ratings.percentage;
	            break;
	    }
	};*/

	/*$scope.showSeasonPopup = function(id){
		console.log("id:",id);
		$http.jsonp('http://api.trakt.tv/show/season.json/' + $scope.apiKey + '/' + id + '/?callback=JSON_CALLBACK').success(function(data) {
			ModalDemoCtrl.data = data;
			console.log("ModalDemoCtrl.data:",ModalDemoCtrl.data);
			console.log('open:',ModalDemoCtrl.open);
		}).error(function(error) {
 
        });
	}*/

	$scope.init = function() {
        console.log('i am main controller init');

		// reset list
		$scope.results = [];

		// get data
        // TODO: tie in to live data
		
		/*$http.jsonp('http://api.trakt.tv/calendar/'+$scope.showType+'.json/' + $scope.apiKey + '/' + apiDate + '/' + 7 + '/?callback=JSON_CALLBACK').success(function(data) {
			//As we are getting our data from an external source, we need to format the data so we can use it to our desired affect
			 //For each day get all the episodes
            angular.forEach(data, function(value, index){
                //The API stores the full date separately from each episode. Save it so we can use it later
                var date = value.date;
                //For each episodes add it to the results array
                angular.forEach(value.episodes, function(tvshow, index){
                    //Create a date string from the timestamp so we can filter on it based on user text input
                    tvshow.date = date; //Attach the full date to each episode
                    $scope.results.push(tvshow);
                    //Loop through each genre for this episode
                    angular.forEach(tvshow.show.genres, function(genre, index){
                        //Only add to the availableGenres array if it doesn't already exist
                        var exists = false;
                        angular.forEach($scope.availableGenres, function(avGenre, index){
                            if (avGenre == genre) {
                                exists = true;
                            }
                        });
                        if (exists === false) {
                            $scope.availableGenres.push(genre);
                        }
                    });
                    // Loop through and get all show dates
                  
                 	var dateExists = false;
                    angular.forEach($scope.allDates, function(showdate,index){
                    	if(date == showdate){
                    		dateExists = true;
                    	}
                    });
                    if(!dateExists){
                    	$scope.allDates.push(date);
                    }
                    
                });
            });
        }).error(function(error) {
 
        });*/
    };
});

app.filter('filterDate', function() {
	console.log('date:',filterDate);
	return function(input, filterDate) {
        if (typeof filterDate == 'undefined' || filterDate == null) {
            return input;
        } else {
            var out = [];
            for (var a = 0; a < input.length; a++){
                
                if(input[a].show.date[b] == filterDate) {
                    out.push(input[a]);
                }
                
            }
            return out;
        }
    };
});

