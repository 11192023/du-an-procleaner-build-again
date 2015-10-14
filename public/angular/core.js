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
	module.controller('timeController', function($scope, $http, $log, $location){
		$scope.loading = true;
		var q_ngv_trunglich = '?ngaylam=' + $location.search().ngay +
				'&giobatdau__lte=' + $location.search().giokt1 +
				'&gioketthuc__gte=' + $location.search().giobd1;
		$http.get('https://serene-stream-9747.herokuapp.com/api/lichlamviec'+q_ngv_trunglich)
	        .success(function(data) {
	        	var x = '';
	            for(i=0; i<data.length; i++){
	            	x += '?cmnd__nin=' + data[i].nguoigiupviec;
	            	if(i != data.length-1) x += ',';
	            }
	            $http.get('https://serene-stream-9747.herokuapp.com/api/nguoigiupviec'+x)
			        .success(function(data) {
			        	$scope.loading=false;
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
				ten: 'Từ 1 năm trở lên',
				id: 1
			},
			{
				ten: 'Từ 2 năm trở lên',
				id: 2
			},
			{
				ten: 'Từ 3 năm trở lên',
				id: 3
			},
			{
				ten: 'Từ 4 năm trở lên',
				id: 4
			},
			{
				ten: 'Từ 5 năm trở lên',
				id: 5
			}
		];
		$scope.tieuchis = [
			{
				ten: 'Chăm sóc bé',
				id: 1,
				data: false
			},
			{
				ten: 'Chăm sóc người già',
				id: 2,
				data: false
			},
			{
				ten: 'Chăm sóc sản phụ',
				id: 3,
				data: false
			},
			{
				ten: 'Nuôi bệnh',
				id: 4,
				data: false
			},
			{
				ten: 'Dọn dẹp vệ sinh',
				id: 5,
				data: false
			},
			{
				ten: 'Đưa đón bé đi học',
				id: 6,
				data: false
			},
			{
				ten: 'Nấu ăn',
				id: 7,
				data: false
			},
			{
				ten: 'Vệ sinh văn phòng',
				id: 8,
				data: false
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
		$scope.sonamekn = [];
		$scope.getDichVu = function(){
			if($location.search().dichvu != 'Chọn tất cả'){
				var arr = [];
				arr.push($location.search().dichvu);
				for(i=0; i<$scope.tieuchis.length; i++){
					if($scope.tieuchis[i].ten == $location.search().dichvu){
						$scope.tieuchis[i].data = true;
					}
				}
				return arr;
			}
			else if($location.search().dichvu == 'Chọn tất cả'){
				var arr = [
					'Chăm sóc bé',
	                'Chăm sóc người già',
	                'Chăm sóc sản phụ',
	                'Nuôi bệnh',
	                'Dọn dẹp vệ sinh',
	                'Đưa đón bé đi học',
	                'Nấu ăn',
	                'Vệ sinh văn phòng'
				];
				for(i=0; i<$scope.tieuchis.length; i++){
					$scope.tieuchis[i].data = true;
				}
				return arr;
			} 
		}
	    $scope.mang_tieuchi = $scope.getDichVu();
	    $scope.get_filter_dichvu = function(ten_dv, data){
	    	if(data){
	    		var index = $scope.mang_tieuchi.indexOf(ten_dv);
				if (index !== -1) {
				    $scope.mang_tieuchi.splice(index, 1);
				}
	    	}
	    	else{
	    		$scope.mang_tieuchi.push(ten_dv);
	    	}
	    }
	    $scope.filter_dichvu = function(sotruongs){
	    	for(i=0; i<sotruongs.length; i++){
	    		var index = $scope.mang_tieuchi.indexOf(sotruongs[i]);
				if (index !== -1) {
				    return true;
				}
	    	}
	    	return false;
	    }
	    $scope.filter_kinhnghiem = function(sonamkn){
	    	if(sonamkn >= $scope.data.sonamkn)
	    		return true
	    	else return false;
	    }
	    $scope.filter_quan = function(quan){
	    	if(quan == $scope.data.quan)
	    		return true
	    	else return false;
	    }
	    $scope.filtering = function(sotruongs, sonamkn, quan){
	    	if($scope.filter_dichvu(sotruongs) && 
	    	   $scope.filter_kinhnghiem(sonamkn) &&
	    	   $scope.filter_quan(quan))
	    		return true;
	    	else return false;
	    }
        

		$scope.data = {
			sonamkn: 0,
			quan: $location.search().quan,
			dichvu: $location.search().dichvu,
		    giobd1: $location.search().giobd1,
		    giokt1: $location.search().giokt1,
		    danhsachquan: [
		    	'Quận 1',
                'Quận 12',
                'Quận Thủ đức',
                'Quận 9',
                'Quận Gò Vấp',
                'Quận Bình Thạnh',
                'Quận Tân Bình',
                'Quận Tân Phú',
                'Quận Phú Nhuận',
                'Quận 2',
                'Quận 3',
                'Quận 10',
                'Quận 11',
                'Quận 4',
                'Quận 5',
                'Quận 6',
                'Quận 8',
                'Quận Bình Tân',
                'Quận 7'
		    ],
		    danhsachdichvu: [
		    	'Chọn tất cả',
		    	'Chăm sóc bé',
                'Chăm sóc người già',
                'Chăm sóc sản phụ',
                'Nuôi bệnh',
                'Dọn dẹp vệ sinh',
                'Đưa đón bé đi học',
                'Nấu ăn',
                'Vệ sinh văn phòng'
		    ],
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
	module.controller('indexController', function($scope, $http, $log, $location){
		$scope.data = {
			quan: $location.search().quan,
			dichvu: $location.search().dichvu,
		    giobd1: $location.search().giobd1,
		    giokt1: $location.search().giokt1,
		    danhsachquan: [
		    	'Quận 1',
                'Quận 12',
                'Quận Thủ đức',
                'Quận 9',
                'Quận Gò Vấp',
                'Quận Bình Thạnh',
                'Quận Tân Bình',
                'Quận Tân Phú',
                'Quận Phú Nhuận',
                'Quận 2',
                'Quận 3',
                'Quận 10',
                'Quận 11',
                'Quận 4',
                'Quận 5',
                'Quận 6',
                'Quận 8',
                'Quận Bình Tân',
                'Quận 7'
		    ],
		    danhsachdichvu: [
		    	'Chọn tất cả',
		    	'Chăm sóc bé',
                'Chăm sóc người già',
                'Chăm sóc sản phụ',
                'Nuôi bệnh',
                'Dọn dẹp vệ sinh',
                'Đưa đón bé đi học',
                'Nấu ăn',
                'Vệ sinh văn phòng'
		    ],
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