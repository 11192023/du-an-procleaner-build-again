(function(){
	//search module
	var module = angular.module('SearchModule', ['ngMaterial','ui.bootstrap','slickCarousel']);

	module.config(function($mdThemingProvider, $locationProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
        //routing DOESN'T work without html5Mode
        $locationProvider.html5Mode({
        	enabled: true
        });
	});
	module.controller('searchController', function($scope, $http, $location){
		$scope.go = function ( path ) {
		  $location.path( path );
		};
		var q_ngv_trunglich = '?ngaylam=' + $location.search().ngay +
				'&giobatdau__lte=' + $location.search().giokt1 +
				'&gioketthuc__gte=' + $location.search().giobd1;
		$http.get('https://serene-stream-9747.herokuapp.com/api/lichlamviec'+q_ngv_trunglich)
	        .success(function(data) {
	        	var x = '?diachi.quan=' + $location.search().quan;
	            for(i=0; i<data.length; i++){
	            	x += '&cmnd__nin=' + data[i].nguoigiupviec;
	            	if(i != data.length-1) x += ',';
	            }
	            $http.get('https://serene-stream-9747.herokuapp.com/api/nguoigiupviec'+x)
			        .success(function(data) {
			            $scope.ngvs = data;
			        })
			        .error(function(data) {
			            console.log('Error: ' + data);
	    			});
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
        });
        $scope.kinhnghiems = [
			{
				ten: '1 Năm',
				id: 1
			},
			{
				ten: '2 Năm',
				id: 2
			},
			{
				ten: '3 Năm',
				id: 3
			},
			{
				ten: '4 Năm',
				id: 4
			}
		];
		$scope.tieuchis = [
			{
				ten: 'Chăm sóc bé',
				id: 1
			},
			{
				ten: 'Chăm sóc người già',
				id: 2
			},
			{
				ten: 'Chăm sóc sản phụ',
				id: 3
			},
			{
				ten: 'Nuôi bệnh',
				id: 4
			},
			{
				ten: 'Dọn dẹp vệ sinh',
				id: 5
			},
			{
				ten: 'Đưa đón bé đi học',
				id: 6
			},
			{
				ten: 'Nấu ăn',
				id: 7
			},
			{
				ten: 'Vệ sinh văn phòng',
				id: 8
			}
		];
		$scope.quans = [
			{
				ten: 'Quận 1',
				id: 1
			},
			{
				ten: 'Quận 12',
				id: 2
			},
			{
				ten: 'Quận Thủ đức',
				id: 3
			},
			{
				ten: 'Quận 9',
				id: 4
			},
			{
				ten: 'Quận Gò Vấp',
				id: 5
			},
			{
				ten: 'Quận Bình Thạnh',
				id: 6
			},
			{
				ten: 'Quận Tân Bình',
				id: 7
			},
			{
				ten: 'Quận Tân Phú',
				id: 1
			},
			{
				ten: 'Quận Phú Nhuận',
				id: 2
			},
			{
				ten: 'Quận 2',
				id: 3
			},
			{
				ten: 'Quận 3',
				id: 4
			},
			{
				ten: 'Quận 10',
				id: 5
			},
			{
				ten: 'Quận 11',
				id: 6
			},
			{
				ten: 'Quận 4',
				id: 7
			},
			{
				ten: 'Quận 5',
				id: 1
			},
			{
				ten: 'Quận 6',
				id: 2
			},
			{
				ten: 'Quận 8',
				id: 3
			},
			{
				ten: 'Quận Bình Tân',
				id: 4
			},
			{
				ten: 'Quận 7',
				id: 5
			}
		];
	});
	module.controller('timeController', function($scope, $log, $location){
		$scope.data = {

		    giobd1: $location.search().giobd1,
		    giokt1: $location.search().giokt1,
		    availableOptions: [
			      {id: 360, name: '6:00 giờ'},
			      {id: 390, name: '6:30 giờ'},
			      {id: 420, name: '7:00 giờ'},
			      {id: 450, name: '7:30 giờ'},
			      {id: 480, name: '8:00 giờ'},
			      {id: 510, name: '8:30 giờ'},
			      {id: 540, name: '9:00 giờ'},
			      {id: 570, name: '9:30 giờ'},
			      {id: 600, name: '10:00 giờ'},
			      {id: 630, name: '10:30 giờ'},
			      {id: 660, name: '11:00 giờ'},
			      {id: 690, name: '11:30 giờ'},
			      {id: 720, name: '12:00 giờ'},
			      {id: 750, name: '12:30 giờ'},
			      {id: 780, name: '13:00 giờ'},
			      {id: 810, name: '13:30 giờ'},
			      {id: 840, name: '14:00 giờ'},
			      {id: 870, name: '14:30 giờ'},
			      {id: 900, name: '15:00 giờ'},
			      {id: 930, name: '15:30 giờ'},
			      {id: 960, name: '16:00 giờ'},
			      {id: 990, name: '16:30 giờ'},
			      {id: 1020, name: '17:00 giờ'},
			      {id: 1050, name: '17:30 giờ'},
			      {id: 1080, name: '18:00 giờ'},
			      {id: 1110, name: '18:30 giờ'},
			      {id: 1140, name: '19:00 giờ'},
			      {id: 1170, name: '19:30 giờ'},
			      {id: 1200, name: '20:00 giờ'}
			    ],
	    };
	    for(i=0; i<$scope.data.availableOptions.length; i++){
	    	if(Number($scope.data.giobd1) == $scope.data.availableOptions[i].id)
	    		$scope.data.giobd1 = $scope.data.availableOptions[i].id;
	    	if(Number($scope.data.giokt1) == $scope.data.availableOptions[i].id)
	    		$scope.data.giokt1 = $scope.data.availableOptions[i].id;
	    }
	});
	module.controller('slickController',['$scope', function($scope){
		$scope.numberLoaded = true;
		$scope.slickconfig = {
			lazyLoad: 'ondemand',
			dots: false,
	        infinite: true,
	        speed: 300,
	        slidesToShow: 4,
	        slidesToScroll: 4,
	        rows: 2,
	        arrows: true,
	        responsive: [
	            {
	              breakpoint: 1024,
	              settings: {
	                slidesToShow: 3,
	                slidesToScroll: 3,
	                infinite: true,
	                dots: true
	              }
	            },
	            {
	              breakpoint: 600,
	              settings: {
	                slidesToShow: 2,
	                slidesToScroll: 2,
	                arrows: false
	              }
	            },
	            {
	              breakpoint: 480,
	              settings: {
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                arrows: false
	              }
	            }
        	]
		}

	}]);
})();