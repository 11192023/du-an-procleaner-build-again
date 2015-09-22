(function(){
	//search module
	var searchModule = angular.module('SearchModule', ['ngMaterial','ui.bootstrap','rgkevin.datetimeRangePicker']);

	searchModule.config(function($mdThemingProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
	});

	searchModule.controller('searchController', function($scope, $http){
		$scope.formData = {};
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
		$http.get('/api/khachhangs')
	        .success(function(data) {
	            $scope.khs = data;
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	});
	searchModule.controller('dateController', function($scope){
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
	searchModule.controller('timeController', function($scope){
	  	$scope.myDatetimeRange = {
		    "time": {
			    "from": 390,
			    "to": 1020,
			    "dFrom": 0,
			    "dTo": 1440,
			    "step": 15,
			    "minRange": 15,
			    "hours24": true
		  	},
		  "hasDatePickers": false,
		  "hasTimeSliders": true
		}
		$scope.myDatetimeLabels = {
		    date: {
		        from: 'Start date',
		        to: 'End date'
		    }
		}
	});
//----------------------------------------------------------------------------------------------------
	
	//index module
	var indexModule = angular.module('IndexModule', ['ngMaterial']);

	indexModule.config(function($mdThemingProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
	});

	indexModule.controller('searchbarController', function($scope, $http){
		$scope.formData = {};
	});
})();