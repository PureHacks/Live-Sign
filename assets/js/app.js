var app = angular.module('app',['angularFileUpload']);

app.service("ImageService", function ($http) {
	
	this.get = function() {
		return $http.get('/api/images');
	}

	this.post = function(image) {
		return $http.post('/api/images', image, { 
			headers: {
			'Content-Type': 'image/jpg'}		
		});
	}
});

app.controller('ImageController', function($scope, ImageService){
	
	$scope.uploadImage = function() {
		console.log($scope.imagename, $scope.image);
		ImageService.post($scope.image)
	}

});

app.controller("SendController", ['$scope', '$http', 'FileUploader', function($scope, $http, FileUploader) {
	
	var uploader = $scope.uploader = new FileUploader({
            url: '/api/test',
            autoUpload: true
    });
	
}]);

