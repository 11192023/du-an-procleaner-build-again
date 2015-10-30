(function(){
	//search module
	var searchModule = angular.module('SearchModule', ['ngMaterial','ngMessages','ui.bootstrap','slickCarousel','ngRoute','ui.calendar']);
	var indexModule = angular.module('IndexModule', ['ngMaterial','ngMessages','slickCarousel','ngRoute']);
	searchModule.config(function($mdThemingProvider, $locationProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
        //routing DOESN'T work without html5Mode
        $locationProvider.html5Mode({
        	enabled: true,
        	reloadOnSearch: true
        });
	});
	searchModule.factory('ngvFactory', function($http, $q){
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
	    service.layDanhSachNgvDaiHan = function(ngay, giobd, giokt, quan){
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
		            x += '&diachi.quan=' + quan;
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
	searchModule.factory('filterFactory', function($location, $mdDialog){
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
		var _locdaihan = [
			{
	    		ten: 'Hàng ngày',
				id: 0
	    	},
			{
				ten: 'Các ngày trong tuần',
				id: 1
			},
			{
				ten: 'Ngày chẵn',
				id: 2
			},
			{
				ten: 'Ngày lẻ',
				id: 3
			},
			{
				ten: 'Hàng tuần',
				id: 4
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
			ngaybd: $location.search().ngaybd,
			ngaykt: $location.search().ngaykt,
			sonamkn: 0,
			locdaihan: 0,
			quan: $location.search().quan,
			dichvu: $location.search().dichvu,
		    giobd1: $location.search().giobd1,
		    giokt1: $location.search().giokt1,
		    lichdaihan: [],
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
	    service.getDSLocDaiHan = function(){
	    	return _locdaihan;
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
	searchModule.factory('thanhtoanFactory', function($http, $q){
		var service = {};
		//lưu khách hàng
		service.luuKhachHang = function(khachhang){
			var deferred = $q.defer();
			var new_khachhang = JSON.stringify({
			    hoten: khachhang.hoten,
			    sdt: khachhang.sdt,
			    matkhau: "kocomatkhau",
			    diachi: khachhang.diachi,
			    email: "kocoemail",
		 	});
			$http({url: 'https://serene-stream-9747.herokuapp.com/api/khachhang',
	            method: "POST",
	            data: new_khachhang,
	            headers: {'Content-Type': 'application/json'}
	        }).success(function (data, status, headers, config) {
	        		deferred.resolve(data);
	            }).error(function (data, status, headers, config) {
	                console.log('Error: ' + data);
	            });
	        return deferred.promise;
		}
        //lưu lịch làm việc
		service.luuLichLamViec = function(ngv, ngay, giobd, giokt, sdtkh){
			var deferred = $q.defer();
			var ngay_arr = ngay.split('/');
            var data1 = JSON.stringify({
                idchitietyc: 0,
			    nguoigiupviec: ngv.cmnd,
			    ngaylam: new Date(Date.UTC(ngay_arr[2],Number(ngay_arr[1])-1,ngay_arr[0])),
			    giobatdau: giobd,
			    gioketthuc: giokt,
			    khachhang: sdtkh
   		 	});
    		$http({url: 'https://serene-stream-9747.herokuapp.com/api/lichlamviec',
	            method: "POST",
	            data: data1,
	            headers: {'Content-Type': 'application/json'}
	        }).success(function (data, status, headers, config) {
	        		deferred.resolve(data);
	            }).error(function (data, status, headers, config) {
	                console.log('Error: ' + data);
	            });
            return deferred.promise;
		}
		//lưu yêu cầu
		service.luuYeuCau = function(ngaybd, ngaykt, chiphi, sdtkhachhang, diachikh, quan){
			var deferred = $q.defer();
			var ngaybd_arr = ngaybd.split('/');
			var ngaykt_arr = ngaykt.split('/');
            var new_yeucau = JSON.stringify({
			    ngaydatyeucau: new Date(),
			    ngayyeucau: new Date(Date.UTC(ngaybd_arr[2],Number(ngaybd_arr[1])-1,ngaybd_arr[0])),
			    ngayketthuc: new Date(Date.UTC(ngaykt_arr[2],Number(ngaykt_arr[1])-1,ngaykt_arr[0])),
			    chiphi: chiphi,
			    nhanvienxuly: 0,
			    sdtkhachhang: sdtkhachhang,
			    loaiyeucau: "Ngắn hạn",
			    trangthai: "Chưa giao",
			    diachi: diachikh + '/' +quan,
			    loaidichvu: "Vệ sinh văn phòng"
   		 	});
    		$http({url: 'https://serene-stream-9747.herokuapp.com/api/yeucau',
	            method: "POST",
	            data: new_yeucau,
	            headers: {'Content-Type': 'application/json'}
	        }).success(function (data, status, headers, config) {
	        		deferred.resolve(data);
	            }).error(function (data, status, headers, config) {
	                console.log('Error: ' + data);
	            });
	        return deferred.promise;
		}
		//lưu chi tiết yêu cầu
		service.luuChiTietYeuCau = function(ngay, giobd, giokt, ngv, yeucauid){
			var deferred = $q.defer();
			var ngay_arr = ngay.split('/');
           	var gio_bd = Math.floor(giobd/60);
           	var phut_bd = giobd%60;
           	var giobd_luuctyc = new Date(Date.UTC(ngay_arr[2], Number(ngay_arr[1])-1, ngay_arr[0], gio_bd, phut_bd, 0));
           		
           	var gio_kt = Math.floor(giokt/60);
           	var phut_kt = giokt%60;
           	var giokt_luuctyc = new Date(Date.UTC(ngay_arr[2], Number(ngay_arr[1])-1, ngay_arr[0], gio_kt, phut_kt, 0));           	
            
            var ctyc = JSON.stringify({
			    idyeucau: yeucauid,
			    giobatdau: giobd_luuctyc,
			    gioketthuc: giokt_luuctyc,
			    nguoigiupviec: ngv.cmnd,
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
	        		deferred.resolve(data);
	            }).error(function (data, status, headers, config) {
	                console.log('Error: ' + data);
	            });
	        return deferred.promise;
		}
		return service;
	});
	searchModule.controller('searchnhController', function(thanhtoanFactory, filterFactory, ngvFactory, $scope, $http, $log, $location, $mdDialog, $q){
		

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
	    							 	getNgvPhuHop(data, $scope.data.quan);
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
		  	getNgvPhuHop($scope.ngvs, $scope.data.quan);
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
										 	getNgvPhuHop(data, $scope.data.quan);
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
										 	getNgvPhuHop(data, $scope.data.quan);
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
										 	getNgvPhuHop(data, $scope.data.quan);
										 	$scope.loading = false;
										 });
		});
		//--------------end watch-----------------------
	    
	    var getNgvPhuHop = function(ngvs, quan){
	    	if(ngvs ==  null) return;
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
				$scope.ngv_sub1 = arr[0];
				return;
			}
			if(arr.length == 2){
				$scope.ngv_sub1 = arr[0];
				$scope.ngv_sub2 = arr[1];
				return;
			}
			if(arr.length > 2){
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
		var reloadDataSauHoaDon = function(){
			$scope.loading_yeucau = false;
            $scope.loading = true;
            $scope.hoanthanh_thanhtoan_nh = true;
			$scope.thatbai_thanhtoan_nh = false;
            ngvFactory.layDanhSachNgv($scope.doi_ngaysearch($location.search().ngay),
			 $location.search().giobd1,
			 $location.search().giokt1).then(function(data){
			 	$scope.ngvs = data;
			 	getNgvPhuHop(data, $scope.data.quan);
			 	$scope.loading = false;
			 	$scope.ngv_selected_arr = [];
				$scope.ngv_arr_fit = [];
				$cookieStore.remove('ngv_arr');
				$scope.khachhang.sdt= null;
				$scope.khachhang.hoten= '';
				$scope.khachhang.diachi= '';
			 });
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
	    $scope.promises = [];
	    $scope.luu_yeucau = function(){
	    	$scope.loading_yeucau = true;
	    	var q_ngv_trunglich = '?ngaylam=' + $scope.doi_ngaysearch($location.search().ngay) +
				'&giobatdau__lte=' + $scope.data.giokt1 +
				'&gioketthuc__gte=' + $scope.data.giobd1;
			$http.get('https://serene-stream-9747.herokuapp.com/api/lichlamviec'+q_ngv_trunglich, { cache: false})
		        .success(function(data) {
		        	if(data.length > 0){
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
		        	}
		            $http.get('https://serene-stream-9747.herokuapp.com/api/khachhang?sdt='+$scope.khachhang.sdt, { cache: false})
				        .success(function(data) {
				        	if(data.length>0){
				        		//lưu lịch làm việc
					            for(i=0; i<$scope.ngv_selected_arr.length; i++){
					            	(function(i) {
					            		thanhtoanFactory.luuLichLamViec($scope.ngv_selected_arr[i],
					            									$scope.data.ngay,
					            									$scope.data.giobd1,
					            									$scope.data.giokt1,
					            									$scope.khachhang.sdt);
					            	})(i)
					            }
					            //Lưu yêu cầu
					            thanhtoanFactory.luuYeuCau(
				            		$scope.data.ngay,
        						    $scope.data.ngay,
        						    $scope.tinhtien_nh_luudb(),
        						    $scope.khachhang.sdt,
        						    $scope.khachhang.diachi,
        						    $scope.data.quan).then(function(data){
        						   		for(i=0; i<$scope.ngv_selected_arr.length; i++){
        						   			(function(i) {
        						   				var promise = thanhtoanFactory.luuChiTietYeuCau($scope.data.ngay,
        						   											  $scope.data.giobd1,
        						   											  $scope.data.giokt1,
        						   											  $scope.ngv_selected_arr[i],
        						   											  data._id);
        						   				$scope.promises.push(promise);
        						   			})(i)
        						   			$q.all($scope.promises).then(function(){
												reloadDataSauHoaDon();
											})
        						   		}
        						   })
				        	}else{
				        		//lưu khách hàng
					            thanhtoanFactory.luuKhachHang($scope.khachhang);

						        for(i=0; i<$scope.ngv_selected_arr.length; i++){
					            	(function(i) {
					            		thanhtoanFactory.luuLichLamViec($scope.ngv_selected_arr[i],
					            									$scope.data.ngay,
					            									$scope.data.giobd1,
					            									$scope.data.giokt1,
					            									$scope.khachhang.sdt);
					            	})(i)
					            }
					            //Lưu yêu cầu
					            thanhtoanFactory.luuYeuCau(
				            		$scope.data.ngay,
        						    $scope.data.ngay,
        						    $scope.tinhtien_nh_luudb(),
        						    $scope.khachhang.sdt,
        						    $scope.khachhang.diachi,
        						    $scope.data.quan).then(function(data){
        						   		for(i=0; i<$scope.ngv_selected_arr.length; i++){
        						   			(function(i) {
        						   				var promise = thanhtoanFactory.luuChiTietYeuCau($scope.data.ngay,
        						   											  $scope.data.giobd1,
        						   											  $scope.data.giokt1,
        						   											  $scope.ngv_selected_arr[i],
        						   											  data._id);
        						   				$scope.promises.push(promise);
        						   			})(i)
        						   			$q.all($scope.promises).then(function(){
												reloadDataSauHoaDon();
											})
        						   		}
        						   })
				        	}
				        })
				        .error(function(data) {
				            console.log('Error: ' + data);
		    			});

		            
		            
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
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
			$scope.khachhang.sdt= null;
			$scope.khachhang.hoten= '';
			$scope.khachhang.diachi= '';
	    }
	    //
	});
	searchModule.controller('searchdhController', function(filterFactory, ngvFactory, $scope, $http, $log, $location, $mdDialog, $q, $compile, $mdSidenav, $timeout){
		//session ngăn ko cho quay lại trang chủ

		$scope.Math = window.Math;
		$scope.loading = true;
		$scope.loading_yeucau = false;
		$scope.ngvs = null;
		$scope.isDetail = false;
		$scope.khachhang = {
			sdt: null,
			hoten: '',
			diachi: '',
		};
		$scope.detailData = {
			ngaythuchien: null,
			dsNgvPhuHop: [],
			ngvDetail: null
		};
   		$scope.onEventClick = function(date, jsEvent, view){
        	$scope.isDetail = true;
        	for(i=0; i<$scope.data.lichdaihan.length; i++){
        		if($scope.data.lichdaihan[i].ngay.getTime() == date.start._d.getTime()){
        			$scope.detailData.ngaythuchien = date.start._d;
        			$scope.detailData.dsNgvPhuHop = $scope.data.lichdaihan[i].dsNgvPhuHop;
        			return;
        		}
        	}
    	};
    	$scope.xemChiTietDh = function(ngv){
    		$scope.detailData.ngvDetail = null;
    		$timeout(function(){
    			$scope.detailData.ngvDetail = ngv;
    			$scope.toggleSideNav();
    		},700);
    		
    	}
		//full calendar
		$scope.uiConfig = {
			calendar:{
			height: 600,
			editable: true,
			header:{
				left: 'month basicWeek basicDay',
				center: 'title',
				right: 'today, prev,next'
			},
				eventClick: $scope.onEventClick,
				dayClick: $scope.alertEventOnClick,
				eventDrop: $scope.alertOnDrop,
				eventResize: $scope.alertOnResize
			}
	    };
	    $scope.initLanguage = function(){
	    	$scope.uiConfig.calendar.dayNames = [
	    	"Chủ nhật",
	    	 	"Thứ 2",
	    	  	"Thứ 3",
	    	   	"Thứ 4",
	    	    "Thứ 5",
    	     	"Thứ 6",
    	      	"Thứ 7"];
	    	$scope.uiConfig.calendar.monthNames = [
	    		"Tháng 1",
	    	 	"Tháng 2",
	    	  	"Tháng 3",
	    	   	"Tháng 4",
	    	    "Tháng 5",
    	     	"Tháng 6",
    	      	"Tháng 7",
    	       	"Tháng 8",
	        	"Tháng 9",
	         	"Tháng 10",
	          	"Tháng 11",
	           	"Tháng 12"];
	        $scope.uiConfig.calendar.monthNamesShort = [
	    		"Th1",
	    	 	"Th2",
	    	  	"Th3",
	    	   	"Th4",
	    	    "Th5",
    	     	"Th6",
    	      	"Th7",
    	       	"Th8",
	        	"Th9",
	         	"Th10",
	          	"Th11",
	           	"Th12"];
        	$scope.uiConfig.calendar.dayNamesShort = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
	    }
	    
    	$scope.events=[];
    	$scope.addEvent = function(soluong, ngaythuchien){
    		$scope.events.push({
    			title: 'Đã chọn '+soluong+' nhân viên!',
            	start: ngaythuchien,
            	stick: true
    		});
    	}
    	$scope.chonNgvSideNav = function(){
    		var soluong = 0;
    		for(i=0; i<$scope.data.lichdaihan.length; i++){
        		if($scope.data.lichdaihan[i].ngay.getTime() == $scope.detailData.ngaythuchien.getTime()){
        			for(j=0; j<$scope.data.lichdaihan[i].dsNgvPhuHop.length; j++){
        				if($scope.data.lichdaihan[i].dsNgvPhuHop[j].selected == true)
        					soluong++;
        			}
        		}
        	}
    		for(i=0; i<$scope.events.length; i++){
        		if($scope.events[i].start.getTime() == $scope.detailData.ngaythuchien.getTime()){
        			$scope.events[i].title = 'Đã chọn '+soluong+' nhân viên!';
        			return;
        		}
        	}
    	}
    	$scope.eventSources=[$scope.events];
		//function
		$scope.tinh_tuoi_ngv = filterFactory.tinhTuoiNgv;
		$scope.doi_ngaysearch = filterFactory.doiNgaySearch;
		$scope.them_filter_dichvu = filterFactory.them_filter_dichvu;
		$scope.filter_dichvu = filterFactory.filter_dichvu;
		$scope.filter_kinhnghiem = filterFactory.filter_kinhnghiem;
		$scope.filter_quan = filterFactory.filter_quan;

		$scope.filtering = function(ngv){
	    	if($scope.filter_dichvu(ngv.sotruong, $scope.data) && 
	    	   $scope.filter_kinhnghiem(ngv.sonamkinhnghiem, $scope.data) &&
	    	   $scope.filter_quan(ngv.diachi.quan, $scope.data)){
	    		return true;
	    	}
	    	else return false;
	    }
		$scope.toggleSideNav = buildToggler('left');
		function buildToggler(navID) {
	      return function() {
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            
	          });
	      }
	    }
	    function parseDate(str) {
		    var mdy = str.split('/')
		    return new Date(mdy[2], mdy[1]-1, mdy[0]);
		}

		function daydiff(first, second) {
		    return Math.round((second-first)/(1000*60*60*24));
		}
		
	    $scope.backToCalendar = function(){
	    	$scope.isDetail = false;
	    }
	    var getAvoidDay = function(initOption, ngaybatdau){
	    	var days = ['cn','t2','t3','t4','t5','t6','t7'];
	    	var hangtuan = ['cn','t2','t3','t4','t5','t6','t7'];
	    	hangtuan.splice(ngaybatdau.getDay(), 1);
			switch(Number(initOption)) {
			    case 0:
			    	return [];
			        break;
			    //các ngày trong tuần
			    case 1:
			        return ['cn','t7'];
			        break;
			    //các ngày chẵn
			    case 2:
			        return ['cn','t7','t3','t5'];
			        break;
			    //các ngày lẻ
			    case 3:
			        return ['cn','t6','t2','t4'];
			        break;
			    //hàng tuần
			    case 4:
			        return hangtuan;
			        break;
			}
	    }
		var initData = function(initOption){
			var days = ['cn','t2','t3','t4','t5','t6','t7'];
			$scope.events.splice(0,$scope.events.length);
			$scope.data.lichdaihan.splice(0,$scope.data.lichdaihan.length);
			var dayrange = daydiff(parseDate($scope.data.ngaybd),
								   parseDate($scope.data.ngaykt));
			var ngaythuchien_arr = [];
			
			
			for(i=0; i<=dayrange; i++){
				var ngaybatdau_arr = $scope.data.ngaybd.split('/');
				var ngaythuchien = new Date(ngaybatdau_arr[2], ngaybatdau_arr[1]-1, ngaybatdau_arr[0]);
				ngaythuchien.setDate(ngaythuchien.getDate() + i);
				ngaythuchien_arr.push(ngaythuchien);
			}
			var avoidDay = getAvoidDay(initOption, ngaythuchien_arr[0]);
			var promises = [];
			for(i=0; i<=dayrange; i++){
				(function(i) {
					var promise = ngvFactory.layDanhSachNgvDaiHan(ngaythuchien_arr[i],
						 $scope.data.giobd1,
						 $scope.data.giokt1,
						 $scope.data.quan).then(function(data){
						 	if(data.length>0){
						 		var _dsNgvPhuHop = [];
						 		var soluong = 1;
						 		if(avoidDay.length>0){
							 		if(avoidDay.indexOf(days[ngaythuchien_arr[i].getDay()]) == -1){
							 			soluong = 1;
							 			for(j=0; j<data.length; j++){
								 			if(j==0){
									 			_dsNgvPhuHop.push({
									 				data: data[j],
									 				selected: true
									 			});
									 		}else{
									 			_dsNgvPhuHop.push({
									 				data: data[j],
									 				selected: false
									 			});
									 		}
								 		}
							 		}else{
						 				soluong = 0;
							 			for(j=0; j<data.length; j++){
								 			if(j==0){
									 			_dsNgvPhuHop.push({
									 				data: data[j],
									 				selected: false
									 			});
									 		}else{
									 			_dsNgvPhuHop.push({
									 				data: data[j],
									 				selected: false
									 			});
									 		}
								 		}
							 		}
						 		}else{
						 			for(j=0; j<data.length; j++){
							 			if(j==0){
								 			_dsNgvPhuHop.push({
								 				data: data[j],
								 				selected: true
								 			});
								 		}else{
								 			_dsNgvPhuHop.push({
								 				data: data[j],
								 				selected: false
								 			});
								 		}
							 		}
							 	}
							 	$scope.data.lichdaihan.push({
							 		ngay: ngaythuchien_arr[i],
							 		dsNgvPhuHop: _dsNgvPhuHop
							 	});
							 	$scope.addEvent(soluong, ngaythuchien_arr[i]);
						 	}else{
						 		$scope.data.lichdaihan.push({
							 		ngay: ngaythuchien_arr[i],
							 		dsNgvPhuHop: []
							 	});
							 	$scope.addEvent('hiện tại chưa có nhân viên!!', ngaythuchien_arr[i]);
						 	}
						 });
					promises.push(promise);
				})(i);
			}
			$q.all(promises).then(function(){
				$scope.loading = false;
			})
			$scope.initLanguage();
		}

		//-------------Lấy dữ liệu-----------------------------------
		$scope.kinhnghiems = filterFactory.getDSKinhNghiem();
		$scope.tieuchis = filterFactory.getDSTieuChi();
		$scope.quans = filterFactory.getDSQuan();
		$scope.data = filterFactory.getDuLieuPage();
		$scope.locdaihan = filterFactory.getDSLocDaiHan();
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
	    //--------------khởi tạo và xử lý calendar------------------
	    
	    initData($scope.data.locdaihan);
	    //
	    //--------------watch----------------------------
		
		$scope.changeFilter = function(){
			$scope.loading = true;
    		initData($scope.data.locdaihan);
		}
		/*
		$scope.$watch('data.ngaybd', function(newVal, oldVal){
			
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
		});
		$scope.$watch('data.ngaykt', function(newVal, oldVal){
			
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
		});*/
		//modal yeu cau
	    $scope.show_yeucau = function(){
    		$('#thongtinkh').modal({backdrop: 'static', keyboard: false},'show');
	    }
	    $scope.close_thanhtoan = function(){
	    	$('#thongtinkh').modal('hide');
	    	$scope.hoanthanh_thanhtoan_nh = false;
			$scope.thatbai_thanhtoan_nh = false;
			$scope.khachhang.sdt= null;
			$scope.khachhang.hoten= '';
			$scope.khachhang.diachi= '';
	    }
	    //tinh tien
	    $scope.tinhtien_dh = function(){
	    	var soluongngv = 0;
	    	for(i=0; i<$scope.data.lichdaihan.length; i++){
    			for(j=0; j<$scope.data.lichdaihan[i].dsNgvPhuHop.length; j++){
    				if($scope.data.lichdaihan[i].dsNgvPhuHop[j].selected == true){
    					soluongngv++;
    				}
    			}
	    	}
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
	    	giatien *= soluongngv;
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
	    $scope.tinhtien_dh_luudb = function(){
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
		//--------------end watch-----------------------
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
		};
	});
	indexModule.controller('indexController', function($scope, $http, $log, $location, $mdDialog){

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
            if(ngaybdarr[0] == now.getDate() 
                && ngaybdarr[1] == now.getMonth()+1 
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
            function parseDate(str) {
			    var mdy = str.split('/')
			    return new Date(mdy[2], mdy[1]-1, mdy[0]);
			}

			function daydiff(first, second) {
			    return Math.round((second-first)/(1000*60*60*24));
			}

            //kiem tra ngay bd và ngay kt
            if(daydiff(parseDate(ngaybd), parseDate(ngaykt)) <0){
            	$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Ngày bắt đầu không được lớn hơn ngày kết thúc.')
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
	indexModule.controller('slickController',['$scope', function($scope){
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