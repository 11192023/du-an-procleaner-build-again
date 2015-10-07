(function(){
	//search module
	var module = angular.module('SearchModule', ['ngMaterial','ui.bootstrap','slickCarousel']);

	module.config(function($mdThemingProvider, $locationProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
        //routing DOESN'T work without html5Mode
        $locationProvider.html5Mode({
        	enabled: true,
  			requireBase: false
        });
	});
	module.controller('searchController', function($scope, $http, $location){
		console.log($location.search().ngaybd);
		console.log($location.search().ngaykt);
		var q = '?diachi.quan=' + $location.search().quan;
		console.log(q);
		$http.get('https://serene-stream-9747.herokuapp.com/api/nguoigiupviec'+q)
	        .success(function(data) {
	            $scope.ngvs = data;
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
        });
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
	module.controller('dateController', function($scope){
	  	$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();

		$scope.clear = function () {
			$scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin();
		$scope.maxDate = new Date(2020, 5, 22);

		$scope.open = function($event) {
			$scope.status.opened = true;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];

		$scope.status = {
			opened: false
		};

		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		var afterTomorrow = new Date();
		afterTomorrow.setDate(tomorrow.getDate() + 2);
		$scope.events =
		[
		  {
		    date: tomorrow,
		    status: 'full'
		  },
		  {
		    date: afterTomorrow,
		    status: 'partially'
		  }
		];

		$scope.getDayClass = function(date, mode) {
		if (mode === 'day') {
		  var dayToCheck = new Date(date).setHours(0,0,0,0);

		  for (var i=0;i<$scope.events.length;i++){
		    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

		    if (dayToCheck === currentDay) {
		      return $scope.events[i].status;
		    }
		  }
		}

		return '';
		};
	});
	module.controller('timeController',['$scope', function($scope, $log){
		$scope.data = {
	    giobd1: null,
	    giokt1: null,
	    giobd2: null,
	    giokt2: null,
	    giobd3: null,
	    giokt3: null,
		    availableOptions: [
		      {id: 360, name: '7:00 giờ'},
		      {id: 390, name: '7:00 giờ'},
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
		      {id: 1070, name: '18:00 giờ'},
		      {id: 1100, name: '18:30 giờ'},
		      {id: 1130, name: '19:00 giờ'},
		      {id: 1160, name: '19:30 giờ'},
		      {id: 1190, name: '20:00 giờ'}
		    ],
	    };
	}]);
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