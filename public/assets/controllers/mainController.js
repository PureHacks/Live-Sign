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
    };

}

function CampaignController($scope, $http){
    $scope.init = function(){
        //$scope.getCampaigns();
        $scope.getImages();
    };

    $scope.imageData = [];
    $scope.selectedImages = [];
    $scope.error = '';
    $scope.campaignDescription = "";
    $scope.campaignName = "";

    // this should be a service...
    $scope.getImages = function(){
        $http({url: '/api/getImages'
            , type: 'GET'
        }).success(function(data, status, headers, config){
            $scope.imageData = data.images;
        }).error(function(data, status, headers, config){
            console.log('image failed:',status);
            $scope.error = 'image failed: '+status;
        });
    };

    $scope.addImage = function(index) {
        image = $scope.imageData[index];
        $scope.selectedImages.push($scope.imageData[index]);
    };

    $scope.getCampaigns = function() {
        $http({url: "/api/getCampaigns", type: "GET"})
        .success(function(data, status, headers, config) {
            $scope.campaigs = data.campaigns;
        });
    };

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
        .success(function(data, status, headers, config){
            console.log("win");
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
