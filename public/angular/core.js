(function(){
	//search module
	var module = angular.module('SearchModule', ['ngMaterial','ngMessages','ui.bootstrap','slickCarousel','ngRoute','ngCookies']);

	module.config(function($mdThemingProvider, $locationProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
        //routing DOESN'T work without html5Mode
        $locationProvider.html5Mode({
        	enabled: true,
        	reloadOnSearch: true
        });
	});
	module.factory('ngvFactory', function($http, $q){
		var service = {};
		service.layDanhSachNgv = function(ngay, giobd, giokt){
			var deferred = $q.defer();
			var q_ngv_trunglich = '?ngaylam=' + ngay +
				'&giobatdau__lte=' + giokt +
				'&gioketthuc__gte=' + giobd;
			$http.get('https://serene-stream-9747.herokuapp.com/api/lichlamviec'+q_ngv_trunglich, { cache: false})
		        .success(function(data) {
		        	var x = '?cmnd__nin=';
		            for(i=0; i<data.length; i++){
		            	x += data[i].nguoigiupviec;
		            	if(i != data.length-1) x += ',';
		            }
		            $http.get('https://serene-stream-9747.herokuapp.com/api/nguoigiupviec'+x, { cache: false})
				        .success(function(data) {
				        	deferred.resolve(data);
				        })
				        .error(function(data) {
				            console.log('Error: ' + data);
		    			});
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
	    service.ngv_isSelected = function(ngv, ngv_selected_arr){
	    	var index = -1;
	    	for(i=0; i<ngv_selected_arr.length; i++)
	    		if(ngv.cmnd == ngv_selected_arr[i].cmnd)
	    			index = i;
			if (index !== -1) {
			    return {bgcheckmark:true};
			}
			else{
				return;
        	}
	    }
	    service.isSelected = function(ngv, btn, ngv_selected_arr){
	    	var index = -1;
	    	for(i=0; i<ngv_selected_arr.length; i++)
	    		if(ngv.cmnd == ngv_selected_arr[i].cmnd)
	    			index = i;
			if (index !== -1) {
				if(btn == 'chon')
			    	return false;
			    else
			    	return true;
			}
			else{
				if(btn == 'chon')
			    	return true;
			    else
			    	return false;
        	}
	    }
	    service.chon_ngv = function(ngv, ngv_selected_arr){
    		var index = -1;
	    	for(i=0; i<ngv_selected_arr.length; i++)
	    		if(ngv.cmnd == ngv_selected_arr[i].cmnd)
	    			index = i;
			if (index !== -1) {
			    ngv_selected_arr.splice(index, 1);
			    $('#'+ngv.cmnd).removeClass('bgcheckmark');
			}
			else{
				ngv_selected_arr.push(ngv);
        		$('#'+ngv.cmnd).addClass('bgcheckmark');
        	}
        }
	    return service;
	});
	module.factory('filterFactory', function($location, $mdDialog){
		var service = {};
		var _kinhnghiems = [
	    	{
	    		ten: 'Tất cả',
				id: 0
	    	},
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
		var _tieuchis = [
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
		var _quans = [
			{
				ten: 'Quận 1',
				id: 1
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
				ten: 'Quận 7',
				id: 5
			},
			{
				ten: 'Quận 8',
				id: 3
			},
			{
				ten: 'Quận 9',
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
				ten: 'Quận 12',
				id: 2
			},
			{
				ten: 'Quận Bình Tân',
				id: 4
			},
			{
				ten: 'Quận Thủ đức',
				id: 3
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
			}
		];
		var _data = {
			mang_tieuchi: [],
			isReverse: false,
			ngay: $location.search().ngay,
			sonamkn: 0,
			quan: $location.search().quan,
			dichvu: $location.search().dichvu,
		    giobd1: $location.search().giobd1,
		    giokt1: $location.search().giokt1,
		    danhsachquan: [
		    	'Quận 1',
                'Quận 2',
                'Quận 3',
                'Quận 4',
                'Quận 5',
                'Quận 6',
                'Quận 7',
                'Quận 8',
                'Quận 9',
                'Quận 10',
                'Quận 11',
                'Quận 12',
                'Quận Thủ đức',
                'Quận Gò Vấp',
                'Quận Bình Thạnh',
                'Quận Tân Bình',
                'Quận Tân Phú',
                'Quận Phú Nhuận',
                'Quận Bình Tân'
		    ],
		    danhsachdichvu: [
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
	    service.getDSKinhNghiem = function(){
	    	return _kinhnghiems;
	    }
	    service.getDSTieuChi = function(){
	    	return _tieuchis;
	    }
	    service.getDSQuan = function(){
	    	return _quans;
	    }
	    service.getDuLieuPage = function(){
	    	return _data;
	    }
	    //-------đổi ngày sinh sang tuổi---------
	    service.tinhTuoiNgv = function(ngaysinhstr){
	    	var ngaysinh = new Date(Date.parse(ngaysinhstr));
	    	var ageDifMs = Date.now() - ngaysinh.getTime();
			var ageDate = new Date(ageDifMs);
			return Math.abs(ageDate.getUTCFullYear() - 1970);
	    }
	    //-------đổi dd/mm/yyyy sang mm/dd/yyyy-----------
	    service.doiNgaySearch = function(ngay){
	    	var ngayarr = ngay.split('/');
	    	var ngay_converted = ngayarr[1] + '/' + ngayarr[0] + '/' + ngayarr[2];
	    	return ngay_converted;
	    }
	    //-------lấy dịch vụ từ index---------------------
	    service.getDichVu = function(indexDV, tieuchis){
			if(indexDV != 'Chọn dịch vụ'){
				var arr = [];
				arr.push(indexDV);
				for(i=0; i<tieuchis.length; i++){
					if(tieuchis[i].ten == indexDV){
						tieuchis[i].data = true;
					}
				}
				return arr;
			}
			else if(indexDV == 'Chọn dịch vụ'){
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
				for(i=0; i<tieuchis.length; i++){
					tieuchis[i].data = true;
				}
				return arr;
			} 
		}
		
		service.them_filter_dichvu = function(ten_dv, isSelect, data){
	    	if(isSelect){
	    		var index = data.mang_tieuchi.indexOf(ten_dv);
				if (index !== -1) {
				    data.mang_tieuchi.splice(index, 1);
				}
	    	}
	    	else{
	    		data.mang_tieuchi.push(ten_dv);
	    	}
	    }
	    service.filter_dichvu = function(sotruongs, data){
	    	for(i=0; i<sotruongs.length; i++){
	    		var index = data.mang_tieuchi.indexOf(sotruongs[i]);
				if (index !== -1) {
				    return true;
				}
	    	}
	    	return false;
	    }
	    service.filter_kinhnghiem = function(sonamkn, data){
	    	if(sonamkn >= data.sonamkn)
	    		return true
	    	else return false;
	    }
	    service.filter_quan = function(quan, data){
	    	if(quan == data.quan)
	    		return true
	    	else return false;
	    }
	    return service;
	});
	module.factory('thanhtoanFactory', function(){
	});
	module.controller('timeController', function(filterFactory, ngvFactory, $scope, $http, $log, $location, $mdDialog, $cookieStore){
		//session ngăn ko cho quay lại trang chủ
		sessionStorage.setItem("Page2Visited", "True");

		$scope.Math = window.Math;
		//biến ng-show detail và search
		$scope.isSearch = true;
		$scope.isDetail = false;
		//
		$scope.loading = true;
		$scope.loading_yeucau = false;
		$scope.ngvs = null;

		$scope.ngv_selected_arr = [];
		$scope.ngv_arr_fit = [];

		$scope.ngv_show_detail = null;
	    $scope.ngv_sub1 = null;
		$scope.ngv_sub2 = null;

		$scope.hoanthanh_thanhtoan_nh = false;
	    $scope.thatbai_thanhtoan_nh = false;

		$scope.khachhang = {
			sdt: null,
			hoten: '',
			diachi: '',
		};
		//function
		$scope.tinh_tuoi_ngv = filterFactory.tinhTuoiNgv;
		$scope.doi_ngaysearch = filterFactory.doiNgaySearch;
		$scope.them_filter_dichvu = filterFactory.them_filter_dichvu;
		$scope.filter_dichvu = filterFactory.filter_dichvu;
		$scope.filter_kinhnghiem = filterFactory.filter_kinhnghiem;
		$scope.filter_quan = filterFactory.filter_quan;

		$scope.ngv_isSelected = ngvFactory.ngv_isSelected;
		$scope.isSelected = ngvFactory.isSelected;
		$scope.chon_ngv = ngvFactory.chon_ngv;
		//-------------Lấy dữ liệu-----------------------------------
		$scope.kinhnghiems = filterFactory.getDSKinhNghiem();
		$scope.tieuchis = filterFactory.getDSTieuChi();
		$scope.quans = filterFactory.getDSQuan();
		$scope.data = filterFactory.getDuLieuPage();
		$scope.data.mang_tieuchi = filterFactory.getDichVu($location.search().dichvu,
													  $scope.tieuchis);
		
        
	    for(i=0; i<$scope.data.availableOptions.length; i++){
	    	if(Number($scope.data.giobd1) == $scope.data.availableOptions[i].id){
	    		$scope.data.giobd1 = $scope.data.availableOptions[i].id;
	    	}
	    	if(Number($scope.data.giokt1) == $scope.data.availableOptions[i].id){
	    		$scope.data.giokt1 = $scope.data.availableOptions[i].id;
	    	}
	    }
	    
	    //-------------end du lieu------------------------------------
	    //--------------khởi tạo dữ liệu từ index------------------
	    ngvFactory.layDanhSachNgv($scope.doi_ngaysearch($location.search().ngay),
	    							 $location.search().giobd1,
	    							 $location.search().giokt1).then(function(data){
	    							 	$scope.ngvs = data;
	    							 	$scope.getNgvPhuHop(data, $scope.data.quan);
	    							 	$scope.loading = false;
	    							 });
	    //
		//--------------watch----------------------------
		$scope.$watch('data.quan', function(newVal, oldVal){
			
			for(i=0; i<$scope.ngv_selected_arr.length; i++){
    			$('#'+$scope.ngv_selected_arr[i].cmnd).removeClass('bgcheckmark');
    		}
		  	$scope.ngv_selected_arr=[];
		  	$scope.ngv_arr_fit=[];
		  	$scope.getNgvPhuHop($scope.ngvs, $scope.data.quan);
		});
		$scope.$watch('data.ngay', function(newVal, oldVal){
			
			var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);
	    	var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngayarr = $scope.data.ngay.split('/');
	    	if(ngayarr[1] == now.getDate() 
                && ngayarr[0] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {
                	$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) + 
                    	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).')
				        .ok('Đồng ý!')
				        .targetEvent(null)
				    );
				    $scope.data.ngay = oldVal;
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			    $scope.data.ngay = oldVal;
                return;
            }
    		$scope.ngv_arr_fit = [];
		  	$scope.ngv_selected_arr = [];
	    	$scope.loading = true;
	    	$scope.ngvs = null;
			ngvFactory.layDanhSachNgv($scope.doi_ngaysearch($scope.data.ngay), 
										 $scope.data.giobd1,
										 $scope.data.giokt1).then(function(data){
										 	$scope.ngvs = data;
										 	$scope.getNgvPhuHop(data, $scope.data.quan);
										 	$scope.loading = false;
										 });
		});
		$scope.$watch('data.giobd1', function(newVal, oldVal){
			if($scope.data.isReverse == true){
	    		$scope.data.isReverse = false;
	    		return;
    		}
			var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);
	    	var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngayarr = $scope.data.ngay.split('/');
	    	if(ngayarr[1] == now.getDate() 
                && ngayarr[0] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {
                	$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) + 
                    	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).')
				        .ok('Đồng ý!')
				        .targetEvent(null)
				    );
				    $scope.data.giobd1 = oldVal;
				    $scope.data.isReverse = true;
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			    $scope.data.giobd1 = oldVal;
			    $scope.data.isReverse = true;
                return;
            }
    		
    		$scope.ngv_arr_fit = [];
		  	$scope.ngv_selected_arr = [];
	    	$scope.loading = true;
	    	$scope.ngvs = null;
			ngvFactory.layDanhSachNgv($scope.doi_ngaysearch($scope.data.ngay), 
										 $scope.data.giobd1,
										 $scope.data.giokt1).then(function(data){
										 	$scope.ngvs = data;
										 	$scope.getNgvPhuHop(data, $scope.data.quan);
										 	$scope.loading = false;
										 });
		});
		$scope.$watch('data.giokt1', function(newVal, oldVal){
			if($scope.data.isReverse == true){
	    		$scope.data.isReverse = false;
	    		return;
    		}
			var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);
	    	var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngayarr = $scope.data.ngay.split('/');
	    	if(ngayarr[1] == now.getDate() 
                && ngayarr[0] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {
                	$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) + 
                    	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).')
				        .ok('Đồng ý!')
				        .targetEvent(null)
				    );
				    $scope.data.giokt1 = oldVal;
				    $scope.data.isReverse = true;
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			    $scope.data.giokt1 = oldVal;
			    $scope.data.isReverse = true;
                return;
            }
    		
    		$scope.ngv_arr_fit = [];
		  	$scope.ngv_selected_arr = [];
	    	$scope.loading = true;
	    	$scope.ngvs = null;
			ngvFactory.layDanhSachNgv($scope.doi_ngaysearch($scope.data.ngay), 
										 $scope.data.giobd1,
										 $scope.data.giokt1).then(function(data){
										 	$scope.ngvs = data;
										 	$scope.getNgvPhuHop(data, $scope.data.quan);
										 	$scope.loading = false;
										 });
		});
		//--------------end watch-----------------------
	    
	    $scope.getNgvPhuHop = function(ngvs, quan){
	    	for(i=0; i<ngvs.length; i++){
	    		var in_arr = false;
		   		for(j=0; j<$scope.ngv_arr_fit.length; j++){
		   			if(ngvs[i].cmnd == $scope.ngv_arr_fit[j].cmnd)
		   				in_arr = true;
		   		}
		   		if(!in_arr && ngvs[i].diachi.quan == quan) $scope.ngv_arr_fit.push(ngvs[i]);
	    	}
	    }
	    $scope.filtering = function(ngv){
	    	if($scope.filter_dichvu(ngv.sotruong, $scope.data) && 
	    	   $scope.filter_kinhnghiem(ngv.sonamkinhnghiem, $scope.data) &&
	    	   $scope.filter_quan(ngv.diachi.quan, $scope.data)){
	    		return true;
	    	}
	    	else return false;
	    }
	    //------------end filter search---------------------------
	    
	    //-------------Xu ly detail ngv--------------------------------
	    
	    $scope.return_search = function(){
	    	$scope.isSearch = true;
			$scope.isDetail = false;
	    }
	    
	    
        
        //chon ngv trong detail
		$scope.chon_ngv_detail = function(ngv){
			$scope.isSearch = true;
			$scope.isDetail = false;
			var index = -1;
	    	for(i=0; i<$scope.ngv_selected_arr.length; i++)
	    		if(ngv.cmnd == $scope.ngv_selected_arr[i].cmnd)
	    			index = i;
			if (index !== -1) {
			    $scope.ngv_selected_arr.splice(index, 1);
			    $('#'+ngv.cmnd).removeClass('bgcheckmark');
			}
			else{
				$scope.ngv_selected_arr.push(ngv);
        		$('#'+ngv.cmnd).addClass('bgcheckmark');
        	}
        }
	    //show chi tiet ngv
	    
		$scope.show_detail = function(ngv){
			$scope.ngv_show_detail = ngv.cmnd;
			$scope.isSearch = false;
			$scope.isDetail = true;
			var arr = $scope.ngv_arr_fit.slice();
			for(i=0; i<arr.length; i++){
				if(arr[i].cmnd == ngv.cmnd)
					arr.splice(i, 1);
			}
			//console.log(ngv_arr_fit);
			if(arr.length == 1){
				console.log('1');
				$scope.ngv_sub1 = arr[0];
				return;
			}
			if(arr.length == 2){
				console.log('2');
				$scope.ngv_sub1 = arr[0];
				$scope.ngv_sub2 = arr[1];
				return;
			}
			if(arr.length > 2){
				console.log(arr);
				var min = 0;
				var max = arr.length-1;
				var random = [];
				// and the formula is:
				var random1 = Math.floor(Math.random() * (max - min + 1)) + min;
				var random2; 
				while(true){
					random2 = Math.floor(Math.random() * (max - min + 1)) + min;
					if(random2 != random1) break;
				}
				$scope.ngv_sub1 = arr[random1];
				$scope.ngv_sub2 = arr[random2];
				console.log($scope.ngv_sub1);
				console.log($scope.ngv_sub2);
				return;
			}
		}
		$scope.checkcmnd = function(cmnd){
			if(cmnd == $scope.ngv_show_detail)
				return true;
			return false;
		}
		
		$scope.check_subngv = function(){
			return true;
		}

	    $scope.numberLoaded = true;
	    $scope.slickconfig = {
			lazyLoad: 'ondemand',
			dots: false,
	        infinite: true,
	        speed: 300,
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        rows: 1,
	        arrows: true
		}
		//-------------end Xu ly detail ngv--------------------------------
	    //---------------------luu yeu cau---------------------------------

	    $scope.luu_yeucau = function(){
	    	$scope.loading_yeucau = true;
	    	var q_ngv_trunglich = '?ngaylam=' + $scope.doi_ngaysearch($location.search().ngay) +
				'&giobatdau__lte=' + $scope.data.giokt1 +
				'&gioketthuc__gte=' + $scope.data.giobd1;
			$http.get('https://serene-stream-9747.herokuapp.com/api/lichlamviec'+q_ngv_trunglich, { cache: false})
		        .success(function(data) {

		            for(i=0; i<data.length; i++){
		            	for(j=0; j<$scope.ngv_selected_arr.length; i++){
		            		if(data[i].nguoigiupviec == $scope.ngv_selected_arr[j].cmnd){
		            			$mdDialog.show(
							      $mdDialog.alert()
							        .parent(angular.element(document.querySelector('body')))
							        .clickOutsideToClose(true)
							        .title('Thông báo')
							        .content('Đã có người thuê nhân viên ' + $scope.ngv_selected_arr[j].hoten + ' xin hãy chọn nhân viên khác!')
							        .ok('Đồng ý!')
							        .targetEvent(null)
						    	);
						    	return;
		            		}
		        		}
		            }
		            $http.get('https://serene-stream-9747.herokuapp.com/api/khachhang?sdt='+$scope.khachhang.sdt, { cache: false})
				        .success(function(data) {
				        	if(data.length>0){
				        		//lưu lịch làm việc
				        		var ngay = $scope.data.ngay.split('/');
					            for(i=0; i<$scope.ngv_selected_arr.length; i++){
						            var data1 = JSON.stringify({
						                idchitietyc: 0,
									    nguoigiupviec: $scope.ngv_selected_arr[i].cmnd,
									    ngaylam: new Date(Date.UTC(ngay[2],Number(ngay[1])-1,ngay[0])),
									    giobatdau: $scope.data.giobd1,
									    gioketthuc: $scope.data.giokt1,
									    khachhang: data[0].sdt
				           		 	});
						    		$http({url: 'https://serene-stream-9747.herokuapp.com/api/lichlamviec',
							            method: "POST",
							            data: data1,
							            headers: {'Content-Type': 'application/json'}
							        }).success(function (data, status, headers, config) {
							               console.log(data);
							            }).error(function (data, status, headers, config) {
							                console.log('Error: ' + data);
							            });
					            }
					            //Lưu yêu cầu
					            var new_yeucau = JSON.stringify({
								    ngaydatyeucau: new Date(),
								    ngayyeucau: new Date(Date.UTC(ngay[2],Number(ngay[1])-1,ngay[0])),
								    ngayketthuc: new Date(Date.UTC(ngay[2],Number(ngay[1])-1,ngay[0])),
								    chiphi: $scope.tinhtien_nh_luudb(),
								    nhanvienxuly: 000,
								    sdtkhachhang: $scope.khachhang.sdt,
								    loaiyeucau: "Ngắn hạn",
								    trangthai: "Chưa giao",
								    diachi: $scope.khachhang.diachi + '/' + $scope.data.quan,
								    loaidichvu: "Vệ sinh văn phòng"
			           		 	});
					    		$http({url: 'https://serene-stream-9747.herokuapp.com/api/yeucau',
						            method: "POST",
						            data: new_yeucau,
						            headers: {'Content-Type': 'application/json'}
						        }).success(function (data, status, headers, config) {
						               	console.log(data);
						               	//lưu chi tiết yêu cầu
						               	var ngay = $scope.data.ngay.split('/');
						               	var gio_bd = Math.floor($scope.data.giobd1/60);
						               	var phut_bd = $scope.data.giobd1%60;
						               	var giobd_luuctyc = new Date(Date.UTC(ngay[2], Number(ngay[1])-1, ngay[0], gio_bd, phut_bd, 0));
						               		
						               	var gio_kt = Math.floor($scope.data.giokt1/60);
						               	var phut_kt = $scope.data.giokt1%60;
						               	var giokt_luuctyc = new Date(Date.UTC(ngay[2], Number(ngay[1])-1, ngay[0], gio_kt, phut_kt, 0));
						               	
							            for(i=0; i<$scope.ngv_selected_arr.length; i++){
								            var ctyc = JSON.stringify({
											    idyeucau: data._id,
											    giobatdau: giobd_luuctyc,
											    gioketthuc: giokt_luuctyc,
											    nguoigiupviec: $scope.ngv_selected_arr[i].cmnd,
											    nhanxet: "",
											    trangthai: "Chưa giao",
											    hudo: "Không",
											    matdo: "Không",
											    lienlac: "Có"
						           		 	});
								    		$http({url: 'https://serene-stream-9747.herokuapp.com/api/chitietyeucau',
									            method: "POST",
									            data: ctyc,
									            headers: {'Content-Type': 'application/json'}
									        }).success(function (data, status, headers, config) {
									               console.log(data);
									            }).error(function (data, status, headers, config) {
									                console.log('Error: ' + data);
									            });
							            }
							            $scope.loading_yeucau = false;
							            $scope.hoanthanh_thanhtoan_nh = true;
	   		 							$scope.thatbai_thanhtoan_nh = false;
							            $scope.loading = true;
							            ngvFactory.layDanhSachNgv($scope.doi_ngaysearch($location.search().ngay),
		    							 $location.search().giobd1,
		    							 $location.search().giokt1).then(function(data){
		    							 	$scope.ngvs = data;
		    							 	$scope.getNgvPhuHop(data, $scope.data.quan);
		    							 	$scope.loading = false;
		    							 	$scope.ngv_selected_arr = [];
											$scope.ngv_arr_fit = [];
											$scope.khachhang.sdt= null;
											$scope.khachhang.hoten= '';
											$scope.khachhang.diachi= '';
		    							 });
						            }).error(function (data, status, headers, config) {
						                console.log('Error: ' + data);
						                $scope.hoanthanh_thanhtoan_nh = false;
	   		 							$scope.thatbai_thanhtoan_nh = true;
						            });
				        	}else{
				        		//lưu khách hàng
					            var new_khachhang = JSON.stringify({
								    hoten: $scope.khachhang.hoten,
								    sdt: $scope.khachhang.sdt,
								    matkhau: "kocomatkhau",
								    diachi: $scope.khachhang.diachi,
								    email: "kocoemail",
			           		 	});
					    		$http({url: 'https://serene-stream-9747.herokuapp.com/api/khachhang',
						            method: "POST",
						            data: new_khachhang,
						            headers: {'Content-Type': 'application/json'}
						        }).success(function (data, status, headers, config) {
						               console.log(data);
						            }).error(function (data, status, headers, config) {
						                console.log('Error: ' + data);
						            });

						        //Lưu lịch làm việc    
					            var ngay = $scope.data.ngay.split('/');
					            for(i=0; i<$scope.ngv_selected_arr.length; i++){
						            var data1 = JSON.stringify({
						                idchitietyc: 0,
									    nguoigiupviec: $scope.ngv_selected_arr[i].cmnd,
									    ngaylam: new Date(Date.UTC(ngay[2],Number(ngay[1])-1,ngay[0])),
									    giobatdau: $scope.data.giobd1,
									    gioketthuc: $scope.data.giokt1,
									    khachhang: $scope.khachhang.sdt
				           		 	});
						    		$http({url: 'https://serene-stream-9747.herokuapp.com/api/lichlamviec',
							            method: "POST",
							            data: data1,
							            headers: {'Content-Type': 'application/json'}
							        }).success(function (data, status, headers, config) {
							               console.log(data);
							            }).error(function (data, status, headers, config) {
							                console.log('Error: ' + data);
							            });
					            }
					            //Lưu yêu cầu
					            var new_yeucau = JSON.stringify({
								    ngaydatyeucau: new Date(),
								    ngayyeucau: new Date(Date.UTC(ngay[2],Number(ngay[1])-1,ngay[0])),
								    ngayketthuc: new Date(Date.UTC(ngay[2],Number(ngay[1])-1,ngay[0])),
								    chiphi: $scope.tinhtien_nh_luudb(),
								    nhanvienxuly: 000,
								    sdtkhachhang: $scope.khachhang.sdt,
								    loaiyeucau: "Ngắn hạn",
								    trangthai: "Chưa giao",
								    diachi: $scope.khachhang.diachi + '/' + $scope.data.quan,
								    loaidichvu: "Vệ sinh văn phòng"
			           		 	});
					    		$http({url: 'https://serene-stream-9747.herokuapp.com/api/yeucau',
						            method: "POST",
						            data: new_yeucau,
						            headers: {'Content-Type': 'application/json'}
						        }).success(function (data1, status, headers, config) {
						               	console.log(data);
						               	//lưu chi tiết yêu cầu
						               	var ngay = $scope.data.ngay.split('/');
						               	var gio_bd = Math.floor($scope.data.giobd1/60);
						               	var phut_bd = $scope.data.giobd1%60;
						               	var giobd_luuctyc = new Date(Date.UTC(ngay[2], Number(ngay[1])-1, ngay[0], gio_bd, phut_bd, 0));
						               		
						               	var gio_kt = Math.floor($scope.data.giokt1/60);
						               	var phut_kt = $scope.data.giokt1%60;
						               	var giokt_luuctyc = new Date(Date.UTC(ngay[2], Number(ngay[1])-1, ngay[0], gio_kt, phut_kt, 0));
						               	
							            for(i=0; i<$scope.ngv_selected_arr.length; i++){
								            var ctyc = JSON.stringify({
											    idyeucau: data._id,
											    giobatdau: giobd_luuctyc,
											    gioketthuc: giokt_luuctyc,
											    nguoigiupviec: $scope.ngv_selected_arr[i].cmnd,
											    nhanxet: "",
											    trangthai: "Chưa giao",
											    hudo: "Không",
											    matdo: "Không",
											    lienlac: "Có"
						           		 	});
								    		$http({url: 'https://serene-stream-9747.herokuapp.com/api/chitietyeucau',
									            method: "POST",
									            data: ctyc,
									            headers: {'Content-Type': 'application/json'}
									        }).success(function (data, status, headers, config) {
									               console.log(data);
									            }).error(function (data, status, headers, config) {
									                console.log('Error: ' + data);
									            });
							            }
							            $scope.loading_yeucau = false;
							            $scope.loading = true;
							            $scope.hoanthanh_thanhtoan_nh = true;
	   		 							$scope.thatbai_thanhtoan_nh = false;
							            ngvFactory.layDanhSachNgv($scope.doi_ngaysearch($location.search().ngay),
		    							 $location.search().giobd1,
		    							 $location.search().giokt1).then(function(data){
		    							 	$scope.ngvs = data;
		    							 	$scope.getNgvPhuHop(data, $scope.data.quan);
		    							 	$scope.loading = false;
		    							 	$scope.ngv_selected_arr = [];
											$scope.ngv_arr_fit = [];
											$cookieStore.remove('ngv_arr');
											$scope.khachhang.sdt= null;
											$scope.khachhang.hoten= '';
											$scope.khachhang.diachi= '';
		    							 });
						            }).error(function (data, status, headers, config) {
						                console.log('Error: ' + data);
						                $scope.hoanthanh_thanhtoan_nh = false;
	   		 							$scope.thatbai_thanhtoan_nh = true;
						            });
				        	}
				        })
				        .error(function(data) {
				            console.log('Error: ' + data);
		    			});

		            
		            
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
		        /*
	    	var data1 = JSON.stringify({
	                id: 7,
				    ngaydatyeucau: "2015-09-20T00:00:00.000Z",
				    ngayyeucau: "2015-09-20T00:00:00.000Z",
				    ngayketthuc: "2015-09-20T00:00:00.000Z",
				    chiphi: 131321321,
				    nhanvienxuly: 12356426,
				    sdtkhachhang: 166444444,
				    loaiyeucau: "Ngắn hạn",
				    trangthai: "Đã hoàn thành",
				    diachi: "Quận 9, Tp HCM",
				    loaidichvu: "Vệ sinh văn phòng"
	            });
	    	$http({url: 'https://serene-stream-9747.herokuapp.com/api/yeucau',
		            method: "POST",
		            data: data1,
		            headers: {'Content-Type': 'application/json'}
		        }).success(function (data, status, headers, config) {
		               console.log(data);
		            }).error(function (data, status, headers, config) {
		                console.log('Error: ' + data);
		            });*/
	    }
	    //---------------------end-----------------------------------------
	    //----------------------tính tiền----------------------------------
	    $scope.tinhtien_nh = function(){
	    	var giatien = 60000*(($scope.data.giokt1-$scope.data.giobd1)/60);
	    	for(i=0; i<$scope.data.mang_tieuchi.length; i++){
	    		if($scope.data.mang_tieuchi[i] == 'Chăm sóc bé' ||
	    		   $scope.data.mang_tieuchi[i] == 'Chăm sóc người già' ||
	    		   $scope.data.mang_tieuchi[i] == 'Chăm sóc sản phụ' ||
	    		   $scope.data.mang_tieuchi[i] == 'Nuôi bệnh'){
	    			giatien *= 1.1;
	    			break;
	    		}
	    	}
	    	giatien = Math.floor(giatien);
	    	giatien *= $scope.ngv_selected_arr.length;
	    	var giatien_str = '';
	    	var giatien_arr = giatien.toString().split('');
	    	var dem = 1;
	    	for(i=giatien_arr.length-1; i>=0; i--){
	    		giatien_str += giatien_arr[i];
	    		if(dem%3==0) giatien_str += '.';
	    		dem++;
	    	}
	    	return giatien_str.split('').reverse().join('');
	    }
	    $scope.tinhtien_nh_luudb = function(){
	    	var giatien = 60000*(($scope.data.giokt1-$scope.data.giobd1)/60);
	    	for(i=0; i<$scope.data.mang_tieuchi.length; i++){
	    		if($scope.data.mang_tieuchi[i] == 'Chăm sóc bé' ||
	    		   $scope.data.mang_tieuchi[i] == 'Chăm sóc người già' ||
	    		   $scope.data.mang_tieuchi[i] == 'Chăm sóc sản phụ' ||
	    		   $scope.data.mang_tieuchi[i] == 'Nuôi bệnh'){
	    			giatien *= 1.1;
	    			break;
	    		}
	    	}
	    	giatien = Math.floor(giatien);
	    	giatien *= $scope.ngv_selected_arr.length;
	    	return giatien;
	    }
	    //----------------------end tính tiền------------------------------
	    //modal yeu cau
	    $scope.show_yeucau = function(){
	    	if($scope.ngv_selected_arr.length > 0)
	    		$('#thongtinkh').modal({backdrop: 'static', keyboard: false},'show');
	    	else{
	    		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Bạn phải chọn ít nhất 1 nhân viên!!.')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
	    	}
	    }
	    $scope.close_thanhtoan = function(){
	    	$('#thongtinkh').modal('hide');
	    	$scope.hoanthanh_thanhtoan_nh = false;
			$scope.thatbai_thanhtoan_nh = false;
	    }
	    //
	});
	module.controller('indexController', function($scope, $http, $log, $location, $mdDialog, $cookieStore){

		$scope.data = {
			quan: $location.search().quan,
			dichvu: 'Chọn dịch vụ',
		    giobd1: $location.search().giobd1,
		    giokt1: $location.search().giokt1,
		    danhsachquan: [
		    	'Quận 1',
                'Quận 2',
                'Quận 3',
                'Quận 4',
                'Quận 5',
                'Quận 6',
                'Quận 7',
                'Quận 8',
                'Quận 9',
                'Quận 10',
                'Quận 11',
                'Quận 12',
                'Quận Thủ đức',
                'Quận Gò Vấp',
                'Quận Bình Thạnh',
                'Quận Tân Bình',
                'Quận Tân Phú',
                'Quận Phú Nhuận',
                'Quận Bình Tân'
		    ],
		    danhsachdichvu: [
		    	'Chọn dịch vụ',
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
	    $('#formTheoNgay').submit(function(ev) {
            ev.preventDefault(); // to stop the form from submitting
            /* Validations go here */
            var bd1 = Number($("#gbdnh").val());
            var kt1 = Number($("#gktnh").val());
            var dichvu = $("#dichvunh").val();
            var quan = $("#quannh").val();
            var ngay = $("input[name=ngay]").val();
            var ngayarr = ngay.split('/');
            var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            //validate empty field
            if(quan == ''){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn quận!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(ngay == ''){
            	$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn ngày!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return; 
            }
            if(bd1 == 0){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn giờ bắt đầu!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(kt1 == 0){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn giờ kết thúc!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            //end validate empty field

            //validate date time
            if(ngayarr[1] == now.getDate() 
                && ngayarr[0] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {
                	$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) +
                     	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).')
				        .ok('Đồng ý!')
				        .targetEvent(ev)
				    );
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.')
				        .ok('Đồng ý!')
				        .targetEvent(ev)
				    );
                return;
            }
            this.submit();
        });
        $('#formDaiHan').submit(function(ev) {
            ev.preventDefault(); // to stop the form from submitting
            /* Validations go here */
            var bd1 = Number($("#gbddh").val());
            var kt1 = Number($("#gktdh").val());
            var quan = $("#quandh").val();
            var dichvu = $("#dichvudh").val();
            alert(dichvu);
            var ngaybd = $("input[name=ngaybd]").val();
            var ngaykt = $("input[name=ngaykt]").val();
            var ngaybdarr = ngaybd.split('/');
            var ngayktarr = ngaykt.split('/');
            var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            //validate empty field
            if(quan == ''){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn quận!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(ngaybd == ''){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn ngày bắt đầu!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return; 
            }
            if(ngaykt == ''){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn ngày kết thúc!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return; 
            }
            if(bd1 == 0){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn giờ bắt đầu!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(kt1 == 0){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chọn giờ kết thúc!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            //end validate empty field

            //validate date time
            if(ngaybdarr[1] == now.getDate() 
                && ngaybdarr[0] == now.getMonth()+1 
                && ngaybdarr[2] == now.getFullYear()){
                $mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Ngày bắt đầu không được là ngày hiện tại!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(ngaybdarr[1] == ngayktarr[1] 
                && ngaybdarr[0] == ngayktarr[0] 
                && ngaybdarr[2] == ngayktarr[2]){
            	$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Ngày bắt đầu không được trùng với ngày kết thúc.')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
                return;
            }
            this.submit();
        });
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