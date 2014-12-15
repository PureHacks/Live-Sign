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
        console.log('changeView:',viewName);
        $scope.pageView = viewName;
    };

    $scope.init = function() {
        // set page view to default of 'scheduling'
        $scope.changeView($scope.images);
    };
};

function ImageController($scope,$http){
    $scope.init = function(){
        $scope.getImages();
    };

    $scope.imageData = [];
    $scope.error = '';

    $scope.getImages = function(){
        $http({url: '/api/getImages'
            , type: 'GET'
        }).success(function(data, status, headers, config){
            $scope.imageData = data.images;
        }).error(function(data, status, headers, config){
            console.log('image failed:',status);
            $scope.error = 'image failed: '+status;
        });
    }

}


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
