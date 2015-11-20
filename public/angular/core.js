(function(){
	//search module
	var module = angular.module('SearchModule', ['ngMaterial','ngMessages','ui.bootstrap','slickCarousel','ngRoute','ui.calendar','cancelable-q','ngCookies']);
	
	//var chitietModule = angular.module('ChitietModule', ['ngMaterial','ngMessages','slickCarousel','ngRoute']);
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
		service.layDanhSachNgvAll = function(){
			var deferred = $q.defer();
			$http.get('https://serene-stream-9747.herokuapp.com/api/nguoigiupviec', { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
		        }).error(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
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
	    service.layNgvTheoCmnd = function(cmnd){
	    	var deferred = $q.defer();
			var q = '?cmnd=' + cmnd;
			$http.get('https://serene-stream-9747.herokuapp.com/api/nguoigiupviec'+q, { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
	    service.layNgvTheoId = function(id){
	    	var deferred = $q.defer();
			var q = '?_id=' + id;
			$http.get('https://serene-stream-9747.herokuapp.com/api/nguoigiupviec'+q, { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
	    service.layDanhSachNgvSub = function(id){
	    	var deferred = $q.defer();
			var q = '?_id__nin=' + id;
			$http.get('https://serene-stream-9747.herokuapp.com/api/nguoigiupviec'+q, { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
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
        service.kiemtraLlv = function(id, ngay, giobd, giokt){
			var deferred = $q.defer();
			var q_ngv_trunglich = '?ngaylam=' + ngay +
				'&giobatdau__lte=' + giokt +
				'&gioketthuc__gte=' + giobd +
				'&nguoigiupviec=' + id;
			$http.get('https://serene-stream-9747.herokuapp.com/api/lichlamviec'+q_ngv_trunglich, { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
	    return service;
	});
	module.factory('filterFactory', function($location, $mdDialog, $q, $http){
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
			isReverse2: false,
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
	    	var deferred = $q.defer();
			$http.get('https://serene-stream-9747.herokuapp.com/api/tieuchi', { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
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
				var arr = [];
				for(i=0; i<tieuchis.length; i++){
					arr.push(tieuchis[i].ten);
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
	module.factory('thanhtoanFactory', function($http, $q){
		var service = {};
		//lưu khách hàng
		service.timKhachHang = function(sdt){
			var deferred = $q.defer();
			var q = '?sdt=' + sdt;
			$http.get('https://serene-stream-9747.herokuapp.com/api/khachhang'+q, { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
	    }
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
		service.luuLichLamViec = function(cmnd, ngay, giobd, giokt, sdtkh, idctyc){
			var deferred = $q.defer();
			var ngay_arr = ngay.split('/');
            var data1 = JSON.stringify({
                idchitietyc: idctyc,
			    nguoigiupviec: cmnd,
			    ngaylam: new Date(Date.UTC(ngay_arr[2],Number(ngay_arr[1])-1,ngay_arr[0])),
			    giobatdau: giobd,
			    gioketthuc: giokt+1,
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
		//lưu lịch làm việc dài hạn
		service.luuLichLamViecDh = function(cmnd, ngay, giobd, giokt, sdtkh, idctyc){
			var deferred = $q.defer();
            var data1 = JSON.stringify({
                idchitietyc: idctyc,
			    nguoigiupviec: cmnd,
			    ngaylam: ngay,
			    giobatdau: giobd,
			    gioketthuc: giokt+1,
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
		service.luuYeuCau = function(ngaybd, ngaykt, chiphi, sdtkhachhang, diachikh, quan, trangthai, mangdichvu){
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
			    trangthai: trangthai,
			    diachi: diachikh + '/' +quan,
			    loaidichvu: mangdichvu,
			    quan: quan
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
		//lưu yêu cầu dài hạn
		service.luuYeuCauDh = function(ngaybd, ngaykt, chiphi, sdtkhachhang, diachikh, quan, trangthai, mangdichvu){
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
			    loaiyeucau: "Dài hạn",
			    trangthai: trangthai,
			    diachi: diachikh + '/' +quan,
			    loaidichvu: mangdichvu,
			    quan: quan
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
		service.luuChiTietYeuCau = function(cmnd, ngay, giobd, giokt, yeucauid){
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
			    nguoigiupviec: cmnd,
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
		//lưu chi tiết yêu cầu dài hạn
		service.luuChiTietYeuCauDh = function(cmnd, ngay, giobd, giokt, yeucauid){
			var deferred = $q.defer();
           	var gio_bd = Math.floor(giobd/60);
           	var phut_bd = giobd%60;
           	var giobd_luuctyc = ngay.setHours(gio_bd+7, phut_bd)
           		
           	var gio_kt = Math.floor(giokt/60);
           	var phut_kt = giokt%60;
           	var giokt_luuctyc = ngay.setHours(gio_kt+7, phut_kt)           	
            
            var ctyc = JSON.stringify({
			    idyeucau: yeucauid,
			    giobatdau: giobd_luuctyc,
			    gioketthuc: giokt_luuctyc,
			    nguoigiupviec: cmnd,
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
		//lưu chi tiết yêu cầu
		service.LayLichLvKhiLuu = function(ngay, giobd, giokt, cmnd){
			var deferred = $q.defer();
			var q_ngv_trunglich = '?ngaylam=' + ngay +
				'&giobatdau__lte=' + giokt +
				'&gioketthuc__gte=' + giobd +
				'&cmnd=' + cmnd;
			$http.get('https://serene-stream-9747.herokuapp.com/api/lichlamviec'+q_ngv_trunglich, { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
	        return deferred.promise;
		}
		return service;
	});
	module.factory('khachhangFactory', function($http, $q){
		var service = {};
		var _khachhang = {
			hoten: null,
			sdt: null,
			diachi: null
		}
		service.getKhachHang = function(){
			return _khachhang;
		}
		service.setKhachHang = function(khachhang){
			_khachhang.hoten = khachhang.hoten;
			_khachhang.sdt = khachhang.sdt;
			_khachhang.diachi = khachhang.diachi;
		}
		service.layDiaChiGoogleMapApi = function(lat, lng){
			var deferred = $q.defer();
			$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
				lat + ',' + lng + '&key=AIzaSyAeHdGJNuQbztJP9zfVTX60dJG2Uiyk1pg', { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
		}
		service.layMaXacNhan = function(maxacnhan, sdtkhachhang){
			
			var deferred = $q.defer();
			var tinnhan = '<RQST>'+
								'<APIKEY>15D1B3AE730591D0FAC35DDAEEE32A</APIKEY>'+
								'<SECRETKEY>7229F4A47F864FEA33D91DC247C5A5</SECRETKEY>'+ 
								'<SMSTYPE>7</SMSTYPE>'+
								'<CONTENT>Ma xac nhan cua ban la ' +maxacnhan+ '</CONTENT>'+
								'<CONTACTS>'+
									'<CUSTOMER>'+
						     			'<PHONE>'+sdtkhachhang+'</PHONE>'+
									'</CUSTOMER>'+
								'</CONTACTS>'+
							'</RQST>';
			console.log(tinnhan);
			$http({url: 'http://api.esms.vn/MainService.svc/xml/SendMultipleMessage_V4/',
	            method: "POST",
	            data: tinnhan,
	            headers: {'Content-Type': 'application/raw;charset=UTF-8'}
	        }).success(function (data, status, headers, config) {
	        		deferred.resolve(data);
	            }).error(function (data, status, headers, config) {
	                console.log('Error: ' + data);
	            });
			return;
		}
		service.getYeuCauNh = function(sdt){
			var deferred = $q.defer();
			var q = '?sdtkhachhang=' + sdt + '&loaiyeucau=Ngắn hạn';
			$http.get('https://serene-stream-9747.herokuapp.com/api/yeucau'+q, { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
		}
		service.getYeuCauDh = function(sdt){
			var deferred = $q.defer();
			var q = '?sdtkhachhang=' + sdt + '&loaiyeucau=Dài hạn';
			$http.get('https://serene-stream-9747.herokuapp.com/api/yeucau'+q, { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
		}
		service.getChiTietYeuCau = function(id){
			var deferred = $q.defer();
			var q = '?idyeucau=' + id;
			$http.get('https://serene-stream-9747.herokuapp.com/api/chitietyeucau'+q, { cache: false})
		        .success(function(data) {
		        	deferred.resolve(data);
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
        	});
		    return deferred.promise;
		}
		service.luuNhanXet = function(ctyc, nhanxet, hudo, matdo){
			var _hudo = 'Không';
			var _matdo = 'Không';
			if(hudo == true) _hudo = 'Có';
			if(matdo == true) _matdo = 'Có';
			var deferred = $q.defer();
			var id = ctyc._id
			var ctyc = JSON.stringify({
			    idyeucau: ctyc.idyeucau,
			    giobatdau: ctyc.giobatdau,
			    gioketthuc: ctyc.gioketthuc,
			    nguoigiupviec: ctyc.nguoigiupviec,
			    nhanxet: nhanxet,
			    trangthai: ctyc.trangthai,
			    hudo: _hudo,
			    matdo: _matdo,
			    lienlac: 'Có'
		 	});
			$http({url: 'https://serene-stream-9747.herokuapp.com/api/chitietyeucau/'+id,
	            method: "PUT",
	            data: ctyc,
	            headers: {'Content-Type': 'application/json;charset=UTF-8'}
	        }).success(function (data, status, headers, config) {
	        		deferred.resolve(data);
	            }).error(function (data, status, headers, config) {
	                console.log('Error: ' + data);
	            });
	        return deferred.promise;
		}
		return service;

	});
	module.controller('searchnhController',
	 	function(khachhangFactory,
	 		    thanhtoanFactory,
			  	filterFactory,
			   	ngvFactory,
			    $scope,
			    $http,
			    $log,
			    $location,
			    $mdDialog,
			    $q){



		$scope.Math = window.Math;
		//thong bao ngay gio
		$scope.thongbaongay = '';
		$scope.thongbaogio = '';
		//biến ng-show detail và search
		$scope.isSearch = true;
		$scope.isDetail = false;
		$scope.isThanhToan = false;
		//
		$scope.loading = true;
		$scope.loading_yeucau = false;
		$scope.loading_dichvu = true;
		$scope.ngvs = null;

		$scope.ngv_selected_arr = [];
		$scope.ngv_arr_fit = [];

		$scope.ngv_show_detail = null;
	    $scope.ngv_sub1 = null;
		$scope.ngv_sub2 = null;

		$scope.hoanthanh_thanhtoan_nh = false;
		$scope.maxacnhan = {
	    	nguoidung: null,
	    	hethong: null
	    };
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
		$scope.quans = filterFactory.getDSQuan();
		$scope.data = filterFactory.getDuLieuPage();
		$scope.tieuchis = [];
		filterFactory.getDSTieuChi().then(function(data){
			for(i=0; i<data.length; i++){
				$scope.tieuchis.push({
					ten: data[i].tentieuchi,
					id: i,
					data: false,
					giachuan: data[i].giachuan,
					phuphi1: data[i].phuphi1,
					phuphi2: data[i].phuphi2,
					phingoaigiongv: data[i].phingoaigiongv,
					phingoaigiokh: data[i].phingoaigiokh,
				});
			}
			$scope.data.mang_tieuchi = filterFactory.getDichVu($location.search().dichvu,
													  $scope.tieuchis);
			$scope.loading_dichvu = false;
		});
		
        
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
	    $scope.initData = function(){
			var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);
	    	var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngayarr = $scope.data.ngay.split('/');
            if(ngayarr[0] == now.getDate() 
                && ngayarr[1] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {
                	$scope.thongbaogio = 'Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) + 
                    	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).';
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$scope.thongbaogio = 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.';
                return;
            }
            $scope.thongbaogio = '';
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
		}
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
		//--------------lay dia chi google map
		$scope.layDiaChi = function(){
			if(navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					khachhangFactory.layDiaChiGoogleMapApi(pos.lat, pos.lng).then(function(data){
						$scope.khachhang.diachi = data.results[0].formatted_address;
					})
					
				});
			}
			// Browser doesn't support Geolocation
			else {
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Trình duyệt không hỗ trợ chức năng này!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
			}
		}
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
            $scope.hoanthanh_thanhtoan_nh = true;
            $scope.loading_yeucau = false;
		}
	    $scope.hoanthanh_thanhtoan = function(){
	    	location.reload();
	    }
		//-------------end Xu ly detail ngv--------------------------------
	    //---------------------luu yeu cau---------------------------------
	    var getPhuPhi1LonNhat = function(mangtieuchi){
			var max = 0;
			for(i=0; i<mangtieuchi.length; i++){
	    		for(j=0; j<$scope.tieuchis.length; j++){
	    			if(mangtieuchi[i] == $scope.tieuchis[j].ten){
	    				if($scope.tieuchis[j].phuphi1 > max){
	    					max = $scope.tieuchis[j].phuphi1;
	    				}
	    			}
	    		}
	    	}
	    	return max;
		}
		var getTrangThaiYeuCau = function(mangtieuchi){
	    	for(i=0; i<mangtieuchi.length; i++){
	    		for(j=0; j<$scope.tieuchis.length; j++){
	    			if(mangtieuchi[i] == $scope.tieuchis[j].ten){
	    				if($scope.tieuchis[j].phuphi2 == 'Có'){
	    					return 'Chờ thỏa thuận';
	    				}
	    			}
	    		}
	    	}
	    	return 'Chưa tiến hành';
	    }
	    var layDanhSachDichVu = function(){
	    	var result = [];
	    	for(i=0; i<$scope.tieuchis.length; i++){
	    		if($scope.tieuchis[i].data == true)
	    			result.push($scope.tieuchis[i].ten);
	    	}
	    	return result;
	    }

	    $scope.layMaXacNhan = function(){
			var min = 1;
			var max = 99999;
			var random = Math.floor(Math.random() * (max - min + 1)) + min;

			if($scope.khachhang.sdt == null)
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin nhập số điện thoại')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
			else{
				//if($scope.solanxacnhan == 3){

				//}
				//$scope.solanxacnhan++;
				$scope.maxacnhan.hethong = random;
				khachhangFactory.layMaXacNhan(random, $scope.khachhang.sdt);
			}
		}

	    $scope.promises = [];
	    $scope.luu_yeucau = function(){
	    	if($scope.maxacnhan.nguoidung != $scope.maxacnhan.hethong &&
	    		$scope.maxacnhan.nguoidung != null){
	    		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Mã xác nhận chưa đúng!!')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			    return;
	    	}
	    	$scope.loading_yeucau = true;
	    	var q_ngv_trunglich = '?ngaylam=' + $scope.doi_ngaysearch($scope.data.ngay) +
				'&giobatdau__lte=' + $scope.data.giokt1 +
				'&gioketthuc__gte=' + $scope.data.giobd1;
			$http.get('https://serene-stream-9747.herokuapp.com/api/lichlamviec'+q_ngv_trunglich, { cache: false})
		        .success(function(data) {
		        	if(data.length > 0){
			            for(i=0; i<data.length; i++){
			            	for(j=0; j<$scope.ngv_selected_arr.length; j++){
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
				        	var trangthaiyc = getTrangThaiYeuCau($scope.data.mang_tieuchi);
				        	var mangdichvu = layDanhSachDichVu();
				        	if(data.length>0){
					            //Lưu yêu cầu
					            thanhtoanFactory.luuYeuCau(
				            		$scope.data.ngay,
        						    $scope.data.ngay,
        						    $scope.tinhtien_nh_luudb(),
        						    $scope.khachhang.sdt,
        						    $scope.khachhang.diachi,
        						    $scope.data.quan,
        						    trangthaiyc,
        						    mangdichvu).then(function(data){
        						   		for(i=0; i<$scope.ngv_selected_arr.length; i++){
        						   			(function(i) {
        						   				var promise = thanhtoanFactory.luuChiTietYeuCau($scope.ngv_selected_arr[i].cmnd,
        						   											  $scope.data.ngay,
        						   											  $scope.data.giobd1,
        						   											  $scope.data.giokt1,
        						   											  data._id).then(function(data){
        						   											  	thanhtoanFactory.luuLichLamViec(data.nguoigiupviec,
												            									$scope.data.ngay,
												            									$scope.data.giobd1,
												            									$scope.data.giokt1,
												            									$scope.khachhang.sdt,
												            									data._id);
        						   											  });
        						   				$scope.promises.push(promise);
        						   			})(i)
        						   		}
        						   		$q.all($scope.promises).then(function(){
											reloadDataSauHoaDon();
										})
        						   })
				        	}else{
				        		//lưu khách hàng
					            thanhtoanFactory.luuKhachHang($scope.khachhang);					            
					            //Lưu yêu cầu
					            thanhtoanFactory.luuYeuCau(
				            		$scope.data.ngay,
        						    $scope.data.ngay,
        						    $scope.tinhtien_nh_luudb(),
        						    $scope.khachhang.sdt,
        						    $scope.khachhang.diachi,
        						    $scope.data.quan,
        						    trangthaiyc,
        						    mangdichvu).then(function(data){
        						   		for(i=0; i<$scope.ngv_selected_arr.length; i++){
        						   			(function(i) {
        						   				var promise = thanhtoanFactory.luuChiTietYeuCau($scope.ngv_selected_arr[i],
        						   					                          $scope.data.ngay,
        						   											  $scope.data.giobd1,
        						   											  $scope.data.giokt1,
        						   											  data._id).then(function(){
        						   											  	thanhtoanFactory.luuLichLamViec(data.nguoigiupviec,
												            									$scope.data.ngay,
												            									$scope.data.giobd1,
												            									$scope.data.giokt1,
												            									$scope.khachhang.sdt,
												            									data._id);
        						   											  });
        						   				$scope.promises.push(promise);
        						   			})(i)
        						   			
        						   		}
        						   		$q.all($scope.promises).then(function(){
											reloadDataSauHoaDon();
										})
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
	    	var giatien = $scope.tieuchis[0].giachuan*(($scope.data.giokt1-$scope.data.giobd1)/60);
	    	giatien = giatien + (giatien*getPhuPhi1LonNhat($scope.data.mang_tieuchi))/100;
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
	    	var giatien = $scope.tieuchis[0].giachuan*(($scope.data.giokt1-$scope.data.giobd1)/60);
	    	giatien = giatien + (giatien*getPhuPhi1LonNhat($scope.data.mang_tieuchi))/100;
	    	giatien = Math.floor(giatien);
	    	giatien *= $scope.ngv_selected_arr.length;
	    	return giatien;
	    }
	    //----------------------end tính tiền------------------------------

	    //modal yeu cau
	    $scope.show_yeucau = function(){
	    	if($scope.ngv_selected_arr.length > 0){
	    		//$('#thongtinkh').modal({backdrop: 'static', keyboard: false},'show');
	    		$scope.isSearch = false;
				$scope.isThanhToan = true;
	    	}
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
	    	$scope.isSearch = true;
			$scope.isThanhToan = false;
			$scope.khachhang.sdt= null;
			$scope.khachhang.hoten= '';
			$scope.khachhang.diachi= '';
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
	    //
	});
	module.controller('searchdhController', 
		function(khachhangFactory,
				  thanhtoanFactory,
				  filterFactory,
				  ngvFactory,
				  $scope,
				  $http,
				  $log,
				  $location,
				  $mdDialog,
				  $q,
				  $compile,
				  $mdSidenav,
				  $timeout,
				  cancelableQ){
		//session ngăn ko cho quay lại trang chủ
		
		//load and close modal
		
		$scope.firstload = {
			ngaybd: true,
			ngaykt: true,
			giobd: true,
			giokt: true
		};
		$scope.Math = window.Math;
		$scope.loading = false;
		$scope.loading_yeucau = false;
		$scope.loading_dichvu = true;
		$scope.hoanthanh_thanhtoan_dh = false;
		$scope.thongbaongay = '';
		$scope.thongbaogio = '';
		$scope.ngvs = null;
		$scope.isDetail = false;
		$scope.maxacnhan = {
	    	nguoidung: null,
	    	hethong: null
	    };
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
    		},500);
    		
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
	    $scope.promises = [];
		var initData = function(initOption){
			$scope.loading = true;
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
			for(i=0; i<=dayrange; i++){
				(function(i) {
					var promise = ngvFactory.layDanhSachNgvDaiHan(ngaythuchien_arr[i],
						 $scope.data.giobd1,
						 $scope.data.giokt1,
						 $scope.data.quan);
					var cancelp = cancelableQ.wrap(promise);
					cancelp.then(function(data){
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
						 }, function(reason){
						 	console.log('rejected with reason: ', reason);
						 });
					$scope.promises.push(cancelp);
				})(i);
			}
			$q.all($scope.promises).then(function(){
				console.log('done');
				$scope.promises = [];
				$scope.loading = false;
			});
			$scope.initLanguage();
		}

		//-------------Lấy dữ liệu-----------------------------------
		$scope.kinhnghiems = filterFactory.getDSKinhNghiem();
		$scope.tieuchis = [];
		filterFactory.getDSTieuChi().then(function(data){
			for(i=0; i<data.length; i++){
				$scope.tieuchis.push({
					ten: data[i].tentieuchi,
					id: i,
					data: false,
					giachuan: data[i].giachuan,
					phuphi1: data[i].phuphi1,
					phuphi2: data[i].phuphi2,
					phingoaigiongv: data[i].phingoaigiongv,
					phingoaigiokh: data[i].phingoaigiokh,
				});
			}
			$scope.data.mang_tieuchi = filterFactory.getDichVu($location.search().dichvu,
													  $scope.tieuchis);
			$scope.loading_dichvu = false;
		});
		$scope.quans = filterFactory.getDSQuan();
		$scope.data = filterFactory.getDuLieuPage();
		$scope.locdaihan = filterFactory.getDSLocDaiHan();
		
		
		
        
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
	    //--------------lay dia chi google map-----------
	    $scope.layDiaChi = function(){
			if(navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					khachhangFactory.layDiaChiGoogleMapApi(pos.lat, pos.lng).then(function(data){
						$scope.khachhang.diachi = data.results[0].formatted_address;
					})
					
				});
			}
			// Browser doesn't support Geolocation
			else {
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Trình duyệt không hỗ trợ chức năng này!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
			}
		}
	    //--------------watch----------------------------
		function parseDate(str) {
		    var mdy = str.split('/')
		    return new Date(mdy[2], mdy[1]-1, mdy[0]);
		}

		function daydiff(first, second) {
		    return Math.round((second-first)/(1000*60*60*24));
		}
		$scope.changeFilter = function(){
			var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngaybdarr = $scope.data.ngaybd.split('/');
            var ngayktarr = $scope.data.ngaykt.split('/');
            var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);

            if(ngaybdarr[0] == now.getDate() 
                && ngaybdarr[1] == now.getMonth()+1 
                && ngaybdarr[2] == now.getFullYear()){
                $scope.thongbaongay = 'Ngày bắt đầu không được là ngày hiện tại!!';
            	return;
            }
            if(ngaybdarr[1] == ngayktarr[1] 
                && ngaybdarr[0] == ngayktarr[0] 
                && ngaybdarr[2] == ngayktarr[2]){
            	$scope.thongbaongay = 'Ngày bắt đầu không được trùng với ngày kết thúc.';
                return;
            }
            //kiem tra ngay bd và ngay kt
            if(daydiff(parseDate($scope.data.ngaybd), parseDate($scope.data.ngaykt)) <0){
            	$scope.thongbaongay = 'Ngày bắt đầu không được lớn hơn ngày kết thúc.';
			    return;
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$scope.thongbaogio = 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.';
                return;
            }

            $scope.thongbaogio = '';
            $scope.thongbaongay = '';

			for(i=0; i<$scope.promises.length; i++){
				$scope.promises[i].cancel();
			}
			$scope.promises = [];
			$timeout(function(){
				initData($scope.data.locdaihan);
			},300);
		}
		//modal yeu cau
		$scope.isSearch = true;
		$scope.isThanhToan = false;
		var getPhuPhi1LonNhat = function(mangtieuchi){
			var max = 0;
			for(i=0; i<mangtieuchi.length; i++){
	    		for(j=0; j<$scope.tieuchis.length; j++){
	    			if(mangtieuchi[i] == $scope.tieuchis[j].ten){
	    				if($scope.tieuchis[j].phuphi1 > max){
	    					max = $scope.tieuchis[j].phuphi1;
	    				}
	    			}
	    		}
	    	}
	    	return max;
		}
		var getTrangThaiYeuCau = function(mangtieuchi){
	    	for(i=0; i<mangtieuchi.length; i++){
	    		for(j=0; j<$scope.tieuchis.length; j++){
	    			if(mangtieuchi[i] == $scope.tieuchis[j].ten){
	    				if($scope.tieuchis[j].phuphi2 == 'Có'){
	    					return 'Chờ thỏa thuận';
	    				}
	    			}
	    		}
	    	}
	    	return 'Chưa tiến hành';
	    }
	    $scope.show_yeucau = function(){
	    	console.log($scope.loading);
	    	if($scope.loading == true){
	    		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin chờ 1 lát!!.')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			    return;
	    	}
	    	if(!daChonNgv()){
	    		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Bạn phải chọn ít nhất 1 nhân viên!!.')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
	    	}else{
	    		$scope.isSearch = false;
				$scope.isThanhToan = true;
	    	}
	    	
	    	/*
	    	$timeout(function(){
    			$('#thongtinkh').modal({backdrop: 'static', keyboard: false},'show');
    		},400);
    		*/
	    }
	    $scope.close_thanhtoan = function(){
	    	$scope.isSearch = true;
			$scope.isThanhToan = false;
			$scope.khachhang.sdt= null;
			$scope.khachhang.hoten= '';
			$scope.khachhang.diachi= '';
	    }
	    //tinh tien
	    $scope.tinhtiendhTungNgay = function(){
	    	var giatien = $scope.tieuchis[0].giachuan*(($scope.data.giokt1-$scope.data.giobd1)/60);
	    	giatien = giatien + (giatien*getPhuPhi1LonNhat($scope.data.mang_tieuchi))/100;
	    	giatien = Math.floor(giatien);
	    	var giatien_str = '';
	    	var giatien_arr = giatien.toString().split('');
	    	var dem = 1;
	    	for(i=giatien_arr.length-1; i>=0; i--){
	    		giatien_str += giatien_arr[i];
	    		if(dem%3==0 && i!=0) giatien_str += '.';
	    		dem++;
	    	}
	    	return giatien_str.split('').reverse().join('');
	    }
	    $scope.tinhtien_dh = function(){
	    	if($scope.loading_dichvu == true)
	    		return;
	    	var soluongngv = 0;
	    	for(i=0; i<$scope.data.lichdaihan.length; i++){
    			for(j=0; j<$scope.data.lichdaihan[i].dsNgvPhuHop.length; j++){
    				if($scope.data.lichdaihan[i].dsNgvPhuHop[j].selected == true){
    					soluongngv++;
    				}
    			}
	    	}
	    	var giatien = $scope.tieuchis[0].giachuan*(($scope.data.giokt1-$scope.data.giobd1)/60);
	    	giatien = giatien + (giatien*getPhuPhi1LonNhat($scope.data.mang_tieuchi))/100;
	    	giatien = Math.floor(giatien);
	    	giatien *= soluongngv;
	    	var giatien_str = '';
	    	var giatien_arr = giatien.toString().split('');
	    	var dem = 1;
	    	for(i=giatien_arr.length-1; i>=0; i--){
	    		giatien_str += giatien_arr[i];
	    		if(dem%3==0 && i!=0) giatien_str += '.';
	    		dem++;
	    	}
	    	return giatien_str.split('').reverse().join('');
	    }
	    $scope.tinhtien_dh_luudb = function(){
	    	var soluongngv = 0;
	    	for(i=0; i<$scope.data.lichdaihan.length; i++){
    			for(j=0; j<$scope.data.lichdaihan[i].dsNgvPhuHop.length; j++){
    				if($scope.data.lichdaihan[i].dsNgvPhuHop[j].selected == true){
    					soluongngv++;
    				}
    			}
	    	}
	    	var giatien = 60000*(($scope.data.giokt1-$scope.data.giobd1)/60);
	    	giatien = giatien + (giatien*getPhuPhi1LonNhat($scope.data.mang_tieuchi))/100;
	    	giatien = Math.floor(giatien);
	    	giatien *= soluongngv;
	    	return giatien;
	    }
	    var daChonNgv = function(){
	    	if($scope.tinhtien_dh_luudb() > 0)
	    		return true;
	    	else
	    		return false;
	    }
	    //---------------------luu yeu cau---------------------------------
	    var layDanhSachDichVu = function(){
	    	var result = [];
	    	for(i=0; i<$scope.tieuchis.length; i++){
	    		if($scope.tieuchis[i].data == true)
	    			result.push($scope.tieuchis[i].ten);
	    	}
	    	return result;
	    }
	    $scope.layMaXacNhan = function(){
			var min = 1;
			var max = 99999;
			var random = Math.floor(Math.random() * (max - min + 1)) + min;

			if($scope.khachhang.sdt == null)
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin nhập số điện thoại')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
			else{
				//if($scope.solanxacnhan == 3){

				//}
				//$scope.solanxacnhan++;
				$scope.maxacnhan.hethong = random;
				khachhangFactory.layMaXacNhan(random, $scope.khachhang.sdt);
			}
		}
	    $scope.llvpromises = [];
	    $scope.ctycpromises = [];
	    $scope.luu_yeucau = function(){
	    	if($scope.maxacnhan.nguoidung != $scope.maxacnhan.hethong &&
	    		$scope.maxacnhan.nguoidung != null){
	    		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Mã xác nhận chưa đúng!!')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			    return;
	    	}
	    	$scope.loading_yeucau = true;
	    	var promises = [];
	    	for(i=0; i<$scope.data.lichdaihan; i++){
	    		(function(i) {
	    			for(j=0; j<$scope.data.lichdaihan[i].dsNgvPhuHop.length; j++){
	    				(function(j) {
	    					if($scope.data.lichdaihan[i].dsNgvPhuHop[j].selected == true)
		    				var promise = thanhtoanFactory.LayLichLvKhiLuu($scope.data.lichdaihan[i].ngay,
		    														   $scope.data.giobd1,
		    														   $scope.data.giokt1,
		    														   $scope.data.lichdaihan[i].dsNgvPhuHop[j].data.cmnd);
		    				promises.push(promise);
	    				})(j)
	    			}
	    		})(i)
	    	}
	    	$q.all(promises).then(function(data){

	    		if(data.length>0){
	    			$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('body')))
				        .clickOutsideToClose(true)
				        .title('Thông báo')
				        .content('Đã có người thuê nhân viên xin hãy chọn nhân viên khác!')
				        .ok('Đồng ý!')
				        .targetEvent(null)
			    	);
	    		}
	    		else{
	    			$http.get('https://serene-stream-9747.herokuapp.com/api/khachhang?sdt='+$scope.khachhang.sdt, { cache: false})
				        .success(function(data) {
				        	var trangthaiyc = getTrangThaiYeuCau($scope.data.mang_tieuchi);
				        	var mangdichvu = layDanhSachDichVu();
				        	if(data.length>0){
					            //Lưu yêu cầu
					            thanhtoanFactory.luuYeuCauDh(
				            		$scope.data.ngaybd,
        						    $scope.data.ngaykt,
        						    $scope.tinhtien_dh_luudb(),
        						    data[0].sdt,
        						    data[0].diachi,
        						    $scope.data.quan,
        						    trangthaiyc,
        						    mangdichvu).then(function(data){
        						    	for(i=0; i<$scope.data.lichdaihan.length; i++){
						            		for(j=0; j<$scope.data.lichdaihan[i].dsNgvPhuHop.length; j++){
					            				if($scope.data.lichdaihan[i].dsNgvPhuHop[j].selected == true){
						            				var promise = thanhtoanFactory.luuChiTietYeuCauDh(
						            								  $scope.data.lichdaihan[i].dsNgvPhuHop[j].data.cmnd,
						            								  $scope.data.lichdaihan[i].ngay,
						   											  $scope.data.giobd1,
						   											  $scope.data.giokt1,
						   											  data._id).then(function(data){
					   											  			var ngay = new Date(Date.parse(data.giobatdau));
					   											  			ngay.setHours(0,0);
					   											  			var ngay_utc = new Date(Date.UTC(ngay.getFullYear(), ngay.getMonth(), ngay.getDate()));
												            				thanhtoanFactory.luuLichLamViecDh(data.nguoigiupviec,
												            									ngay_utc,
												            									$scope.data.giobd1,
												            									$scope.data.giokt1,
												            									$scope.khachhang.sdt,
												            									data._id);
						   											  });
						   							$scope.ctycpromises.push(promise);
						            			}
						            		}
							            }
							            
    						   			$q.all($scope.ctycpromises).then(function(){
    						   				$scope.ctycpromises = [];
    						   				$scope.loading_yeucau = false;
    						   				$scope.hoanthanh_thanhtoan_dh = true;
										})
        						   })
				        	}else{
				        		//lưu khách hàng
					            thanhtoanFactory.luuKhachHang($scope.khachhang);

						        //Lưu yêu cầu
					            thanhtoanFactory.luuYeuCauDh(
				            		$scope.data.ngaybd,
        						    $scope.data.ngaykt,
        						    $scope.tinhtien_dh_luudb(),
        						    data[0].sdt,
        						    data[0].diachi,
        						    $scope.data.quan,
        						    trangthaiyc,
        						    mangdichvu).then(function(data){
        						    	for(i=0; i<$scope.data.lichdaihan.length; i++){
						            		for(j=0; j<$scope.data.lichdaihan[i].dsNgvPhuHop.length; j++){
					            				if($scope.data.lichdaihan[i].dsNgvPhuHop[j].selected == true){
						            				var promise = thanhtoanFactory.luuChiTietYeuCauDh(
						            								  $scope.data.lichdaihan[i].dsNgvPhuHop[j].data.cmnd,
						            								  $scope.data.lichdaihan[i].ngay,
						   											  $scope.data.giobd1,
						   											  $scope.data.giokt1,
						   											  data._id).then(function(data){
					   											  			var ngay = new Date(Date.parse(data.giobatdau));
					   											  			ngay.setHours(0,0);
					   											  			var ngay_utc = new Date(Date.UTC(ngay.getFullYear(), ngay.getMonth(), ngay.getDate()));
												            				thanhtoanFactory.luuLichLamViecDh(data.nguoigiupviec,
												            									ngay_utc,
												            									$scope.data.giobd1,
												            									$scope.data.giokt1,
												            									$scope.khachhang.sdt,
												            									data._id);
						   											  });
						   							$scope.ctycpromises.push(promise);
						            			}
						            		}
							            }
							            
    						   			$q.all($scope.ctycpromises).then(function(){
    						   				$scope.ctycpromises = [];
    						   				$scope.loading_yeucau = false;
    						   				$scope.hoanthanh_thanhtoan_dh = true;
										})
        						   })
				        	}
				        })
				        .error(function(data) {
				            console.log('Error: ' + data);
		    			});
	    		}
	    	})
	    }
	    //---------------------end-----------------------------------------
	    $scope.hoanthanh_thanhtoan = function(){
	    	location.reload();
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
	module.controller('loginController', function(khachhangFactory, thanhtoanFactory, $scope, $timeout, $cookies, $location, $cookies){
		$scope.registed = false;
		$scope.khachhang = {};
		$scope.sdtTonTai = false;
		$scope.sdtKhongTonTai = false;
		$scope.dangkyThanhCong = false;
		$scope.loadingDangKy = false;
		$scope.loadingDangNhap = false;
		$scope.maxacnhan = {
	    	nguoidung: null,
	    	hethong: null
	    };
		$scope.solanxacnhan = 0;
		$scope.thongbaomaxacnhan = '';
		$scope.daxacnhansdt = false;
		$scope.thongbaosdt = '';
		$scope.tamdungxacnhan = null;
		//check cookies
		$scope.checkCookies = function(){
			if($cookies.get('khachhang') != null){
				$scope.khachhang.sdt = $cookies.get('khachhang');
				$scope.DangNhap();
			}
		}
		//
		$scope.showDangKy = function(){
			$('#DangKyForm').modal({backdrop: 'static', keyboard: false},'show');
		}
		$scope.closeDangKy = function(){
			$('#DangKyForm').modal('hide');
		}
		$scope.kiemtraFormDangKy = function(){
			if($scope.daxacnhansdt == true)
				return false;
			else
				return true;
		}
		$scope.$watch('khachhang.sdt', function(newVal, oldVal){
			if(newVal == null) return;
			if(newVal.toString().length < 7) {
				$scope.thongbaosdt = 'Số điện thoại phải từ 10 số';
				$scope.daxacnhansdt = false;
			}
			else {
				thanhtoanFactory.timKhachHang($scope.khachhang.sdt).then(function(data){
					if(data.length > 0){
						thanhtoanFactory.luuKhachHang($scope.khachhang).then(function(data){
							$scope.thongbaosdt = 'số này đã được đăng ký!!'
							$scope.daxacnhansdt = false;
						});
					}else{
						$scope.thongbaosdt = 'Có thế sử dụng số này';
						$scope.daxacnhansdt = true;
					}
				});
			}
		});
		$scope.DangKy = function(){
			if($scope.maxacnhan.hethong != $scope.maxacnhan.hethong){
				$scope.thongbaomaxacnhan = 'Mã xác nhận không đúng';
				return;
			}
			$scope.thongbaomaxacnhan = '';
			$scope.loadingDangKy = true;
			thanhtoanFactory.timKhachHang($scope.khachhang.sdt).then(function(data){
				if(!data.length > 0){
					thanhtoanFactory.luuKhachHang($scope.khachhang).then(function(data){
						console.log(data);
						$scope.loadingDangKy = false;
						$scope.dangkyThanhCong = true;
						$timeout(function(){
							$scope.dangkyThanhCong = false;
						},5000)
					});
				}else{
					$scope.loadingDangKy = false;
					$scope.sdtTonTai = true;
					$timeout(function(){
						$scope.sdtTonTai = false;
					},5000)
				}
			});
		}
		$scope.layMaXacNhan = function(){
			if($scope.daxacnhansdt == false){
				$scope.thongbaomaxacnhan = 'Số điện thoại không phù hợp';
				return;
			}
			var min = 1;
			var max = 99999;
			var random = Math.floor(Math.random() * (max - min + 1)) + min;

			if($scope.khachhang.sdt == null)
				$scope.thongbaomaxacnhan = 'Xin nhập số điện thoại';
			else{
				//if($scope.solanxacnhan == 3){

				//}
				//$scope.solanxacnhan++;
				$scope.maxacnhan.hethong = random;
				khachhangFactory.layMaXacNhan(random, $scope.khachhang.sdt);
			}
		}
		$scope.layDiaChi = function(){
			if(navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					khachhangFactory.layDiaChiGoogleMapApi(pos.lat, pos.lng).then(function(data){
						$scope.khachhang.diachi = data.results[0].formatted_address;
					})
					
				});
			}
			// Browser doesn't support Geolocation
			else {
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Trình duyệt không hỗ trợ chức năng này!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
			}
		}
		$scope.showDangNhap = function(){
			$('#DangNhapForm').modal({backdrop: 'static', keyboard: false},'show');
		}
		$scope.closeDangNhap = function(){
			$('#DangNhapForm').modal('hide');
		}
		$scope.DangNhap = function(){
			$scope.loadingDangNhap = true;
			thanhtoanFactory.timKhachHang($scope.khachhang.sdt).then(function(data){
				if(data.length > 0){
					$('#DangNhapForm').modal('hide');
					$scope.registed = true;
					$scope.khachhang.sdt = data[0].sdt;
					$scope.khachhang.diachi = data[0].diachi;
					$scope.khachhang.hoten = data[0].hoten;
					var expireDate = new Date();
  					expireDate.setDate(expireDate.getDate() + 1);
					$cookies.put('khachhang', data[0].sdt, {'expires': expireDate});
					khachhangFactory.setKhachHang($scope.khachhang);
					$scope.khachhang = khachhangFactory.getKhachHang();
					$scope.loadingDangNhap = false;

				}else{
					$scope.loadingDangNhap = false;
					$scope.sdtKhongTonTai = true;
					$timeout(function(){
						$scope.sdtKhongTonTai = false;
					},5000)
				}
			});
		}
		$scope.DangXuat = function(){
			khachhangFactory.setKhachHang($scope.khachhang);
			$cookies.remove('khachhang');
			window.location.href = '/';
			
		}
	});
	module.controller('userController', 
	function(ngvFactory, khachhangFactory, $scope,$http, $log, $location, $mdDialog, $q, $cookies){

		$scope.Math = window.Math;
		$scope.loading = false;
		$scope.khachhang = {};
		$scope.hudo = false;
		$scope.matdo = false;
		$scope.yeucauNh = [];
		$scope.yeucauDh = [];
		$scope.chitietyeucau = [];
		$scope.isThongTinTk = true;
		$scope.isLichSuYc = false;
		$scope.isChitietYc = false;
		$scope.dsNgvChiTiet = [];
		$scope.ngvChiTiet = {};
		$scope.ctycDangXem = {};
		$scope.ycDangXem = {};
		$scope.nhanxet = null;
		$scope.tienno = 0;
		var tab = $location.search().tab;

		var tinhTienNo = function(ycnh, ycdh){
			var tienno = 0;
			for(i=0; i<ycnh.length; i++){
				if(ycnh[i].trangthai != 'Hoàn thành')
					tienno+=ycnh[i].chiphi;
			}
			for(i=0; i<ycdh.length; i++){
				if(ycdh[i].trangthai != 'Hoàn thành')
					tienno+=ycdh[i].chiphi;
			}
			return tienno;
		}
		$scope.showTTTK = function(){
			$scope.isThongTinTk = true;
			$scope.isLichSuYc = false;
			$scope.isChitietYc = false;
		}
		$scope.showLSYC = function(){
			$scope.isThongTinTk = false;
			$scope.isLichSuYc = true;
			$scope.isChitietYc = false;
		}
		
		$scope.initData = function(){
			$scope.loading = true;
			$scope.khachhang = khachhangFactory.getKhachHang();
			var promises = [];
			var promise_ycnganhan = khachhangFactory.getYeuCauNh(Number($cookies.get('khachhang')));
			var promise_ycdaihan = khachhangFactory.getYeuCauDh(Number($cookies.get('khachhang')));
			promises.push(promise_ycnganhan);
			promises.push(promise_ycdaihan);
			$q.all(promises).then(function(data){
				$scope.yeucauNh = data[0];
				$scope.yeucauDh = data[1];
				$scope.tienno = tinhTienNo($scope.yeucauNh, $scope.yeucauDh);
				$scope.loading = false;
			})
			if(tab == 'tttk'){
				$scope.showTTTK();
			}else{
				$scope.showLSYC();
			}
		}
		$scope.xemChiTietYc = function(yc){
			$scope.ycDangXem = yc;
			$scope.isThongTinTk = false;
			$scope.isLichSuYc = false;
			$scope.isChitietYc = false;
			$scope.loading = true;
			khachhangFactory.getChiTietYeuCau(yc._id).then(function(data){
				$scope.chitietyeucau = data;
				$scope.isChitietYc = true;
				$scope.loading = false;
			})
		}
		$scope.layNgvChiTiet = function(cmnd){
			ngvFactory.layNgvTheoCmnd(cmnd).then(function(data){
				$scope.dsNgvChiTiet.push(data[0]);
			})
		}
		$scope.layTenNgv = function(cmnd) {
			for(i=0; i<$scope.dsNgvChiTiet.length; i++){
				if($scope.dsNgvChiTiet[i].cmnd == cmnd){
					return $scope.dsNgvChiTiet[i].hoten;
				}
			}
		}
		$scope.danhgiaCtyc = function(mucdg){
			if(mucdg == 0){
				$scope.nhanxet = 'Tệ';
				$('#star1').addClass('fa-star');
				$('#star2').removeClass('fa-star');
				$('#star3').removeClass('fa-star');
				$('#star4').removeClass('fa-star');
				$('#star5').removeClass('fa-star');

				$('#star1').removeClass('fa-star-o');
				$('#star2').addClass('fa-star-o');
				$('#star3').addClass('fa-star-o');
				$('#star4').addClass('fa-star-o');
				$('#star5').addClass('fa-star-o');
			}
			if(mucdg == 1){
				$scope.nhanxet = 'Không tốt';
				$('#star1').addClass('fa-star');
				$('#star2').addClass('fa-star');
				$('#star3').removeClass('fa-star');
				$('#star4').removeClass('fa-star');
				$('#star5').removeClass('fa-star');

				$('#star1').removeClass('fa-star-o');
				$('#star2').removeClass('fa-star-o');
				$('#star3').addClass('fa-star-o');
				$('#star4').addClass('fa-star-o');
				$('#star5').addClass('fa-star-o');
			}
			if(mucdg == 2){
				$scope.nhanxet = 'Trung bình';
				$('#star1').addClass('fa-star');
				$('#star2').addClass('fa-star');
				$('#star3').addClass('fa-star');
				$('#star4').removeClass('fa-star');
				$('#star5').removeClass('fa-star');

				$('#star1').removeClass('fa-star-o');
				$('#star2').removeClass('fa-star-o');
				$('#star3').removeClass('fa-star-o');
				$('#star4').addClass('fa-star-o');
				$('#star5').addClass('fa-star-o');
			}
			if(mucdg == 3){
				$scope.nhanxet = 'Khá';
				$('#star1').addClass('fa-star');
				$('#star2').addClass('fa-star');
				$('#star3').addClass('fa-star');
				$('#star4').addClass('fa-star');
				$('#star5').removeClass('fa-star');

				$('#star1').removeClass('fa-star-o');
				$('#star2').removeClass('fa-star-o');
				$('#star3').removeClass('fa-star-o');
				$('#star4').removeClass('fa-star-o');
				$('#star5').addClass('fa-star-o');
			}
			if(mucdg == 4){
				$scope.nhanxet = 'Tốt';
				$('#star1').addClass('fa-star');
				$('#star2').addClass('fa-star');
				$('#star3').addClass('fa-star');
				$('#star4').addClass('fa-star');
				$('#star5').addClass('fa-star');

				$('#star1').removeClass('fa-star-o');
				$('#star2').removeClass('fa-star-o');
				$('#star3').removeClass('fa-star-o');
				$('#star4').removeClass('fa-star-o');
				$('#star5').removeClass('fa-star-o');
			}
		}
		var resetNhanXetCtyc = function(){
			$('#star1').removeClass('fa-star');
			$('#star2').removeClass('fa-star');
			$('#star3').removeClass('fa-star');
			$('#star4').removeClass('fa-star');
			$('#star5').removeClass('fa-star');

			$('#star1').addClass('fa-star-o');
			$('#star2').addClass('fa-star-o');
			$('#star3').addClass('fa-star-o');
			$('#star4').addClass('fa-star-o');
			$('#star5').addClass('fa-star-o');
			$scope.hudo = false;
			$scope.matdo = false;
		}
		$scope.showDanhgiaCtyc = function(ctyc){
			for(i=0; i<$scope.dsNgvChiTiet.length; i++){
				if($scope.dsNgvChiTiet[i].cmnd == ctyc.nguoigiupviec){
					$scope.ngvChiTiet = $scope.dsNgvChiTiet[i];
					$scope.ctycDangXem = ctyc;
					$scope.nhanxet = ctyc.nhanxet;
					
					resetNhanXetCtyc();

					if($scope.nhanxet == 'Tệ') $scope.danhgiaCtyc(0);
					if($scope.nhanxet == 'Không tốt') $scope.danhgiaCtyc(1);
					if($scope.nhanxet == 'Trung bình') $scope.danhgiaCtyc(2);
					if($scope.nhanxet == 'Khá') $scope.danhgiaCtyc(3);
					if($scope.nhanxet == 'Tốt') $scope.danhgiaCtyc(4);
					if(ctyc.hudo == 'Có') $scope.hudo = true;
					if(ctyc.matdo == 'Có') $scope.matdo = true;
				}
			}
			if($scope.ycDangXem.trangthai == 'Hoàn thành')
				$('#nhanxet').modal({backdrop: 'static', keyboard: false},'show');
			else
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Yêu cầu này chưa hoàn thành!!')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
		}
		$scope.luuNhanXet = function(){
			khachhangFactory.luuNhanXet($scope.ctycDangXem, $scope.nhanxet, $scope.hudo, $scope.matdo).then(function(data){				
				$('#nhanxet').modal('hide');
				$scope.xemChiTietYc($scope.ycDangXem);
			})
		}
	});
	module.controller('indexController', function(ngvFactory, $scope, $http, $log, $location, $mdDialog){

		
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
            if(ngayarr[0] == now.getDate() 
                && ngayarr[1] == now.getMonth()+1 
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
	module.controller('slickController', function(ngvFactory, filterFactory, $scope, $http, $log, $location, $mdDialog){
		$scope.dsNgv = [];
		$scope.loadingSlick = true;
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
		ngvFactory.layDanhSachNgvAll().then(function(data){
			$scope.dsNgv = data;
			$scope.loadingSlick = false;
			console.log($scope.dsNgv);
		})
		$scope.tinhTuoiNgv = filterFactory.tinhTuoiNgv;
	});
	
	module.controller('chitietController', function(khachhangFactory, thanhtoanFactory, filterFactory, ngvFactory, $scope, $http, $log, $location, $mdDialog, $q){
		$scope.ngvDcChon = null;
		$scope.loading = true;
		$scope.isThanhToan = false;
		$scope.ngv_sub1 = null;
		$scope.ngv_sub2 = null;
		$scope.loading_yeucau = false;
		$scope.tieuchis = [];
		$scope.mang_tieuchi = [];
		$scope.hoanthanh_thanhtoan_ct = false;
		$scope.data = {
			soluongdv: 0,
			isReverse: false,
			ngay: null,
			quan: null,
		    giobd1: null,
		    giokt1: null,
		    thongbaongaygio: 'Xin chọn ngày giờ giúp việc!!',
		    thongbaodichvu: '',
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
	    $scope.maxacnhan = {
	    	nguoidung: null,
	    	hethong: null
	    };
		
	    $scope.khachhang = {
	    	sdt: null,
	    	hoten: null,
	    	diachi: null,
	    };
		$scope.tinhTuoiNgv = filterFactory.tinhTuoiNgv;
		$scope.layDiaChi = function(){
			if(navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					khachhangFactory.layDiaChiGoogleMapApi(pos.lat, pos.lng).then(function(data){
						$scope.khachhang.diachi = data.results[0].formatted_address;
					})
					
				});
			}
			// Browser doesn't support Geolocation
			else {
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Trình duyệt không hỗ trợ chức năng này!!')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
			}
		}
		$scope.layMaXacNhan = function(){
			var min = 1;
			var max = 99999;
			var random = Math.floor(Math.random() * (max - min + 1)) + min;

			if($scope.khachhang.sdt == null)
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Xin nhập số điện thoại')
			        .ok('Đồng ý!')
			        .targetEvent(ev)
			    );
			else{
				//if($scope.solanxacnhan == 3){

				//}
				//$scope.solanxacnhan++;
				$scope.maxacnhan.hethong = random;
				khachhangFactory.layMaXacNhan(random, $scope.khachhang.sdt);
			}
		}
		$scope.close_thanhtoan = function(){
			$scope.isThanhToan = false;
		}
		$scope.initData = function(){
			var promise1 = ngvFactory.layNgvTheoId($location.search().id).then(function(data){
				$scope.ngvDcChon = data[0];
			})
			var promise2 = ngvFactory.layDanhSachNgvSub($location.search().id).then(function(data){
				if(data.length == 1){
					$scope.ngv_sub1 = data[0];
				}
				if(data.length == 2){
					$scope.ngv_sub1 = data[0];
					$scope.ngv_sub2 = data[1];
				}
				if(data.length > 2){
					var min = 0;
					var max = data.length-1;
					var random = [];
					// and the formula is:
					var random1 = Math.floor(Math.random() * (max - min + 1)) + min;
					var random2; 
					while(true){
						random2 = Math.floor(Math.random() * (max - min + 1)) + min;
						if(random2 != random1) break;
					}
					$scope.ngv_sub1 = data[random1];
					$scope.ngv_sub2 = data[random2];
				}
			})
			var promise3 = filterFactory.getDSTieuChi().then(function(data){
				for(i=0; i<data.length; i++){
					$scope.tieuchis.push({
						ten: data[i].tentieuchi,
						id: i,
						data: false,
						giachuan: data[i].giachuan,
						phuphi1: data[i].phuphi1,
						phuphi2: data[i].phuphi2,
						phingoaigiongv: data[i].phingoaigiongv,
						phingoaigiokh: data[i].phingoaigiokh,
					});
				}
			});
			$q.all([promise1, promise2, promise3]).then(function(){
				$scope.data.quan = $scope.ngvDcChon.diachi.quan;
				$scope.loading = false;
			})
		}
		$scope.show_yeucau = function(){
			$scope.isThanhToan = true;
		}
		$scope.hoanthanh_thanhtoan = function(){
			location.reload();
		}
		$scope.checkThanhToan = function(){
			if($scope.data.thongbaongaygio == '' && 
				$scope.data.ngay != null &&
				$scope.data.giobd1 != null &&
				$scope.data.giokt1 != null){
				return true;
			}else{
				return false;
			}
		}
		$scope.checkDichVu = function(){
			if($scope.data.soluongdv >0) return true;
			else return false;
		}
		//gia tri preselect la gia tri true/false của dịch vụ trước khi chọn select
		$scope.them_dichvu = function(preSelect){
			console.log(preSelect);
			if(preSelect == false) {
				$scope.data.soluongdv++;
			}else {
				$scope.data.soluongdv--;
			}
		}
		//--------------------tinh tien--------------------------
		var getPhuPhi1LonNhat = function(mangtieuchi){
			var max = 0;
			for(i=0; i<mangtieuchi.length; i++){
	    		if(mangtieuchi[i].data == true){
	    			if(max < mangtieuchi[i].phuphi1)
	    				max = mangtieuchi[i].phuphi1;
	    		}
	    	}
	    	return max;
		}
		var getTrangThaiYeuCau = function(mangtieuchi){
	    	for(i=0; i<mangtieuchi.length; i++){
	    		if(mangtieuchi[i].data == true){
	    			if(mangtieuchi[i].phuphi2 == 'Có')
	    				return 'Chờ thỏa thuận';
	    		}
	    	}
	    	return 'Chưa tiến hành';
	    }
	    $scope.tinhtien_ct = function(){
	    	if($scope.loading == true || 
	    		$scope.data.giokt1 == null || 
	    		$scope.data.giobd1 == null || 
	    		$scope.data.ngay == null) return;
	    	
	    	var giatien = $scope.tieuchis[0].giachuan*(($scope.data.giokt1-$scope.data.giobd1)/60);
	    	giatien = giatien + (giatien*getPhuPhi1LonNhat($scope.tieuchis))/100;
	    	giatien = Math.floor(giatien);
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
	    	var giatien = $scope.tieuchis[0].giachuan*(($scope.data.giokt1-$scope.data.giobd1)/60);
	    	giatien = giatien + (giatien*getPhuPhi1LonNhat($scope.tieuchis))/100;
	    	giatien = Math.floor(giatien);
	    	return giatien;
	    }
	    //-------------------------------------------------------
	    //--------------------luu yeu cau------------------------
	    var layDanhSachDichVu = function(){
	    	var result = [];
	    	for(i=0; i<$scope.tieuchis.length; i++){
	    		if($scope.tieuchis[i].data == true)
	    			result.push($scope.tieuchis[i].ten);
	    	}
	    	return result;
	    }
	    $scope.luu_yeucau = function(){
	    	if($scope.maxacnhan.nguoidung != $scope.maxacnhan.hethong &&
	    		$scope.maxacnhan.nguoidung != null){
	    		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title('Thông báo')
			        .content('Mã xác nhận chưa đúng!!')
			        .ok('Đồng ý!')
			        .targetEvent(null)
			    );
			    return;
	    	}
	    	$scope.loading_yeucau = true;
            $http.get('https://serene-stream-9747.herokuapp.com/api/khachhang?sdt='+$scope.khachhang.sdt, { cache: false})
		        .success(function(data) {
		        	var trangthaiyc = getTrangThaiYeuCau($scope.tieuchis);
		        	var mangdichvu = layDanhSachDichVu();
		        	if(data.length>0){
			            //Lưu yêu cầu
			            thanhtoanFactory.luuYeuCau(
		            		$scope.data.ngay,
						    $scope.data.ngay,
						    $scope.tinhtien_nh_luudb(),
						    $scope.khachhang.sdt,
						    $scope.khachhang.diachi,
						    $scope.data.quan,
						    trangthaiyc,
						    mangdichvu).then(function(data){
				   				thanhtoanFactory.luuChiTietYeuCau($scope.ngvDcChon.cmnd,
				   											  $scope.data.ngay,
				   											  $scope.data.giobd1,
				   											  $scope.data.giokt1,
				   											  data._id).then(function(data){
				   											  	thanhtoanFactory.luuLichLamViec(data.nguoigiupviec,
								            									$scope.data.ngay,
								            									$scope.data.giobd1,
								            									$scope.data.giokt1,
								            									$scope.khachhang.sdt,
								            									data._id).then(function(){
								            										$scope.hoanthanh_thanhtoan_ct = true;
								            										$scope.loading_yeucau = false;
								            									});
				   											  });
						   		
						   });
		        	}else{
		        		//lưu khách hàng
			            thanhtoanFactory.luuKhachHang($scope.khachhang);					            
			            //Lưu yêu cầu
			            thanhtoanFactory.luuYeuCau(
		            		$scope.data.ngay,
						    $scope.data.ngay,
						    $scope.tinhtien_nh_luudb(),
						    $scope.khachhang.sdt,
						    $scope.khachhang.diachi,
						    $scope.data.quan,
						    trangthaiyc,
						    mangdichvu).then(function(data){
				   				thanhtoanFactory.luuChiTietYeuCau($scope.ngvDcChon.cmnd,
				   											  $scope.data.ngay,
				   											  $scope.data.giobd1,
				   											  $scope.data.giokt1,
				   											  data._id).then(function(data){
				   											  	thanhtoanFactory.luuLichLamViec(data.nguoigiupviec,
								            									$scope.data.ngay,
								            									$scope.data.giobd1,
								            									$scope.data.giokt1,
								            									$scope.khachhang.sdt,
								            									data._id).then(function(){
								            										$scope.hoanthanh_thanhtoan_ct = true;
								            										$scope.loading_yeucau = false;
								            									});
				   											  });
						   		
						   });
		        	}
		        })
		        .error(function(data) {
		            console.log('Error: ' + data);
    			});
	    }
	    //-------------------------------------------------------
		//--------------------watch------------------------------

		$scope.$watch('data.soluongdv', function(newVal, oldVal){
			if(newVal==0) {
				$scope.data.thongbaodichvu = 'Cần chọn ít nhất 1 dịch vụ!!';
			}
			else {
				$scope.data.thongbaodichvu = '';
			}
		});
		$scope.$watch('data.ngay', function(newVal, oldVal){
			if($scope.data.ngay == null || 
			   $scope.data.giobd1 == null || 
			   $scope.data.giokt1 == null) return;
			if($scope.data.isReverse == true){
	    		$scope.data.isReverse = false;
	    		return;
    		}
			var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);
	    	var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngayarr = $scope.data.ngay.split('/');
	    	if(ngayarr[0] == now.getDate() 
                && ngayarr[1] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {

                	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) + 
                    	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).';
				    $scope.data.ngay = oldVal;
				    $scope.data.isReverse = true;
				    console.log($scope.data.thongbaongaygio);
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.';
			    $scope.data.ngay = oldVal;
			    $scope.data.isReverse = true;
                return;
            }
            ngvFactory.kiemtraLlv($scope.ngvDcChon.cmnd, 
            	filterFactory.doiNgaySearch($scope.data.ngay),
            	$scope.data.giobd1,
            	$scope.data.giokt1).then(function(data){
            		if(data.length >0) $scope.data.thongbaongaygio = 'Nhân viên đã có lịch làm việc ở khung giờ này!!';
            	})
            $scope.data.thongbaongaygio = '';
		});
		$scope.$watch('data.giobd1', function(newVal, oldVal){
			if($scope.data.ngay == null || 
			   $scope.data.giobd1 == null || 
			   $scope.data.giokt1 == null) return;
			if($scope.data.isReverse == true){
	    		$scope.data.isReverse = false;
	    		return;
    		}
			var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);
	    	var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngayarr = $scope.data.ngay.split('/');
	    	if(ngayarr[0] == now.getDate() 
                && ngayarr[1] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {
                	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) + 
                    	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).';
				    $scope.data.giobd1 = oldVal;
				    $scope.data.isReverse = true;
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.';
			    $scope.data.giobd1 = oldVal;
			    $scope.data.isReverse = true;
                return;
            }
            ngvFactory.kiemtraLlv($scope.ngvDcChon.cmnd, 
            	filterFactory.doiNgaySearch($scope.data.ngay),
            	$scope.data.giobd1,
            	$scope.data.giokt1).then(function(data){
            		if(data.length >0) $scope.data.thongbaongaygio = 'Nhân viên đã có lịch làm việc ở khung giờ này!!';
            	})
            $scope.data.thongbaongaygio = '';
		});
		$scope.$watch('data.giokt1', function(newVal, oldVal){
			if($scope.data.ngay == null || 
			   $scope.data.giobd1 == null || 
			   $scope.data.giokt1 == null) return;
			if($scope.data.isReverse == true){
	    		$scope.data.isReverse = false;
	    		return;
    		}
			var bd1 = Number($scope.data.giobd1);
            var kt1 = Number($scope.data.giokt1);
	    	var now = new Date();
            var sophutht = now.getHours() * 60 + now.getMinutes() + 180;
            var ngayarr = $scope.data.ngay.split('/');
	    	if(ngayarr[0] == now.getDate() 
                && ngayarr[1] == now.getMonth()+1 
                && ngayarr[2] == now.getFullYear()){
                if(bd1 < sophutht) {
                	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải từ '+ Math.floor(sophutht/60) + 
                    	':' +sophutht%60+ ' (cách giờ hiện tại ít nhất 3 tiếng).';
				    $scope.data.giokt1 = oldVal;
				    $scope.data.isReverse = true;
                    return;
                }
            }
            if(bd1+120 > kt1 && bd1 != 0 && kt1 != 0) {
            	$scope.data.thongbaongaygio = 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc ít nhất 2 tiếng.';
			    $scope.data.giokt1 = oldVal;
			    $scope.data.isReverse = true;
                return;
            }
            ngvFactory.kiemtraLlv($scope.ngvDcChon.cmnd, 
            	filterFactory.doiNgaySearch($scope.data.ngay),
            	$scope.data.giobd1,
            	$scope.data.giokt1).then(function(data){
            		if(data.length >0) $scope.data.thongbaongaygio = 'Nhân viên đã có lịch làm việc ở khung giờ này!!';
            	})
            $scope.data.thongbaongaygio = '';
		});
		//--------------end watch-----------------------
		$scope.loadingSlick = true;
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
	});
})();