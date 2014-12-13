function MainController($scope,$http){
	window.mc_scope = $scope;
	// scope variables
	$scope.results = [];

    $scope.pageView = "";

    //constants
    // page titles
    $scope.scheduling = "Scheduling";
	$scope.campaign = "Campaign";
	$scope.images = "Images";

	//$scope.saveCampaign = "Save Campaign";
	//$scope.scheduleCampaign = "Schedule Campaign";

	$scope.setFilterDate = function(date) {
	    $scope.filterDate = date;
	}

    // set page view to default of 'scheduling'
    $scope.pageView = $scope.scheduling;

    $scope.changeView = function(viewName){
        console.log('changeView:',viewName);
        $scope.pageView = viewName;
    }

	$scope.init = function() {
        console.log('i am main controller init');

		// reset list
		$scope.results = [];

		// get data
        // TODO: tie in to live data
		/*
		$scope.results = the results of query
		*/
    };
};


/* FILTER DATE EXAMPLE
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
*/
