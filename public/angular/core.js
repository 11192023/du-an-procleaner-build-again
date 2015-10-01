(function(){
	//search module
	var module = angular.module('SearchModule', ['ngMaterial','ui.bootstrap','rgkevin.datetimeRangePicker','slickCarousel']);

	module.config(function($mdThemingProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
	});
	module.controller('searchController', function($scope, $http){
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
		$scope.timeNHPopover = [
			//khung giờ 1
			{
				content: 'Hello, World!',
				templateUrl: 'kg1.html',
				title: 'Xin chọn khung thời gian',
				tugio: {
					gio: 0,
					phut: 0,
				},
				toigio: {
					gio: 0,
					phut: 0,
				},
				isOpen: false,
				timetext: 'Chọn khung giờ',
				myDatetimeRange: {
				    time: {
					    from: 390,
					    to: 1020,
					    dFrom: 0,
					    dTo: 1440,
					    step: 15,
					    minRange: 15,
					    hours24: true
				  	},
				  hasDatePickers: false,
				  hasTimeSliders: true,
				},
				myDatetimeLabels: {
				    date: {
				        from: 'Start date',
				        to: 'End date'
				    }
				},
				open: function open() {
		          $scope.timeNHPopover[0].isOpen = true;
		        }, 
		        close: function close() {
		          $scope.timeNHPopover[0].isOpen = false;
		          $scope.timeNHPopover[0].tugio.gio = Math.floor($scope.timeNHPopover[0].myDatetimeRange.time.from/60);
		          $scope.timeNHPopover[0].tugio.phut = Math.floor($scope.timeNHPopover[0].myDatetimeRange.time.from%60); 
		          $scope.timeNHPopover[0].toigio.gio = Math.floor($scope.timeNHPopover[0].myDatetimeRange.time.to/60);
		          $scope.timeNHPopover[0].toigio.phut = Math.floor($scope.timeNHPopover[0].myDatetimeRange.time.to%60); 
		          $scope.timeNHPopover[0].timetext = 'Từ ' + $scope.timeNHPopover[0].tugio.gio + ':' + $scope.timeNHPopover[0].tugio.phut +
		          								   ' đến '+ $scope.timeNHPopover[0].toigio.gio + ':' + $scope.timeNHPopover[0].toigio.phut;
		        }
		  	},
		  	//khung giờ 2
		  	{
				content: 'Hello, World!',
				templateUrl: 'kg2.html',
				title: 'Xin chọn khung thời gian',
				tugio: {
					gio: 0,
					phut: 0,
				},
				toigio: {
					gio: 0,
					phut: 0,
				},
				isOpen: false,
				timetext: 'Chọn khung giờ',
				myDatetimeRange: {
				    time: {
					    from: 390,
					    to: 1020,
					    dFrom: 0,
					    dTo: 1440,
					    step: 15,
					    minRange: 15,
					    hours24: true
				  	},
				  hasDatePickers: false,
				  hasTimeSliders: true,
				},
				myDatetimeLabels: {
				    date: {
				        from: 'Start date',
				        to: 'End date'
				    }
				},
				open: function open() {
		          $scope.timeNHPopover[1].isOpen = true;
		        }, 
		        close: function close() {
		          $scope.timeNHPopover[1].isOpen = false;
		          $scope.timeNHPopover[1].tugio.gio = Math.floor($scope.timeNHPopover[1].myDatetimeRange.time.from/60);
		          $scope.timeNHPopover[1].tugio.phut = Math.floor($scope.timeNHPopover[1].myDatetimeRange.time.from%60); 
		          $scope.timeNHPopover[1].toigio.gio = Math.floor($scope.timeNHPopover[1].myDatetimeRange.time.to/60);
		          $scope.timeNHPopover[1].toigio.phut = Math.floor($scope.timeNHPopover[1].myDatetimeRange.time.to%60); 
		          $scope.timeNHPopover[1].timetext = 'Từ ' + $scope.timeNHPopover[1].tugio.gio + ':' + $scope.timeNHPopover[1].tugio.phut +
		          								   ' đến '+ $scope.timeNHPopover[1].toigio.gio + ':' + $scope.timeNHPopover[1].toigio.phut;
		        }
		  	},
		  	//khung giờ 3
		  	{
				content: 'Hello, World!',
				templateUrl: 'kg3.html',
				title: 'Xin chọn khung thời gian',
				tugio: {
					gio: 0,
					phut: 0,
				},
				toigio: {
					gio: 0,
					phut: 0,
				},
				isOpen: false,
				timetext: 'Chọn khung giờ',
				myDatetimeRange: {
				    time: {
					    from: 390,
					    to: 1020,
					    dFrom: 0,
					    dTo: 1440,
					    step: 15,
					    minRange: 15,
					    hours24: true
				  	},
				  hasDatePickers: false,
				  hasTimeSliders: true,
				},
				myDatetimeLabels: {
				    date: {
				        from: 'Start date',
				        to: 'End date'
				    }
				},
				open: function open() {
		          $scope.timeNHPopover[2].isOpen = true;
		        }, 
		        close: function close() {
		          $scope.timeNHPopover[2].isOpen = false;
		          $scope.timeNHPopover[2].tugio.gio = Math.floor($scope.timeNHPopover[2].myDatetimeRange.time.from/60);
		          $scope.timeNHPopover[2].tugio.phut = Math.floor($scope.timeNHPopover[2].myDatetimeRange.time.from%60); 
		          $scope.timeNHPopover[2].toigio.gio = Math.floor($scope.timeNHPopover[2].myDatetimeRange.time.to/60);
		          $scope.timeNHPopover[2].toigio.phut = Math.floor($scope.timeNHPopover[2].myDatetimeRange.time.to%60); 
		          $scope.timeNHPopover[2].timetext = 'Từ ' + $scope.timeNHPopover[2].tugio.gio + ':' + $scope.timeNHPopover[2].tugio.phut +
		          								   ' đến '+ $scope.timeNHPopover[2].toigio.gio + ':' + $scope.timeNHPopover[2].toigio.phut;
		        }
		  	},
		  	//khung giờ 4
		  	{
				content: 'Hello, World!',
				templateUrl: 'kg4.html',
				title: 'Xin chọn khung thời gian',
				tugio: {
					gio: 0,
					phut: 0,
				},
				toigio: {
					gio: 0,
					phut: 0,
				},
				isOpen: false,
				timetext: 'Chọn khung giờ',
				myDatetimeRange: {
				    time: {
					    from: 390,
					    to: 1020,
					    dFrom: 0,
					    dTo: 1440,
					    step: 15,
					    minRange: 15,
					    hours24: true
				  	},
				  hasDatePickers: false,
				  hasTimeSliders: true,
				},
				myDatetimeLabels: {
				    date: {
				        from: 'Start date',
				        to: 'End date'
				    }
				},
				open: function open() {
		          $scope.timeNHPopover[3].isOpen = true;
		        }, 
		        close: function close() {
		          $scope.timeNHPopover[3].isOpen = false;
		          $scope.timeNHPopover[3].tugio.gio = Math.floor($scope.timeNHPopover[3].myDatetimeRange.time.from/60);
		          $scope.timeNHPopover[3].tugio.phut = Math.floor($scope.timeNHPopover[3].myDatetimeRange.time.from%60); 
		          $scope.timeNHPopover[3].toigio.gio = Math.floor($scope.timeNHPopover[3].myDatetimeRange.time.to/60);
		          $scope.timeNHPopover[3].toigio.phut = Math.floor($scope.timeNHPopover[3].myDatetimeRange.time.to%60); 
		          $scope.timeNHPopover[3].timetext = 'Từ ' + $scope.timeNHPopover[3].tugio.gio + ':' + $scope.timeNHPopover[3].tugio.phut +
		          								   ' đến '+ $scope.timeNHPopover[3].toigio.gio + ':' + $scope.timeNHPopover[3].toigio.phut;
		        }
		  	}
	  	],
	  	$scope.dateDNPopover = [
			//khung thời gian 1
			{
				content: 'Hello, World!',
				templateUrl: 'dayrangedn1.html',
				title: 'Xin chọn khung thời gian',
				tungay: '',
				toingay: '',
				isOpen: false,
				datetext: 'Chọn ngày',
				myDatetimeRange: {
				    date: {
					    from: new Date(),
					    to: new Date(),
					    min: new Date()
				  	},
				  hasDatePickers: true,
				  hasTimeSliders: false,
				},
				myDatetimeLabels: {
				    date: {
				        from: 'Ngày bắt đầu',
				        to: 'Ngày kết thúc'
				    }
				},
				open: function open() {
		          $scope.dateDNPopover[0].isOpen = true;
		        }, 
		        close: function close() {
		        	var fromdate = $scope.dateDNPopover[0].myDatetimeRange.date.from.getDate();
		        	var frommonth = $scope.dateDNPopover[0].myDatetimeRange.date.from.getMonth() + 1;
		        	var fromyear = $scope.dateDNPopover[0].myDatetimeRange.date.from.getFullYear();
		        	var todate = $scope.dateDNPopover[0].myDatetimeRange.date.to.getDate();
		        	var tomonth = $scope.dateDNPopover[0].myDatetimeRange.date.to.getMonth() + 1;
		        	var toyear = $scope.dateDNPopover[0].myDatetimeRange.date.to.getFullYear();
		          $scope.dateDNPopover[0].isOpen = false;
		          $scope.dateDNPopover[0].datetext = 'Từ ' + fromdate + '/' + 
		          		frommonth + '/' +
		          		fromyear + ' tới ' +
		          		todate + '/' + 
		          		tomonth + '/' +
		          		toyear;
		        }
		  	}
	  	]
	  	$scope.timeDNPopover = [
			//khung giờ 1
			{
				content: 'Hello, World!',
				templateUrl: 'kgdn1.html',
				title: 'Xin chọn khung thời gian',
				tugio: {
					gio: 0,
					phut: 0,
				},
				toigio: {
					gio: 0,
					phut: 0,
				},
				isOpen: false,
				timetext: 'Chọn khung giờ',
				myDatetimeRange: {
				    time: {
					    from: 390,
					    to: 1020,
					    dFrom: 0,
					    dTo: 1440,
					    step: 15,
					    minRange: 15,
					    hours24: true
				  	},
				  hasDatePickers: false,
				  hasTimeSliders: true,
				},
				myDatetimeLabels: {
				    date: {
				        from: 'Start date',
				        to: 'End date'
				    }
				},
				open: function open() {
		          $scope.timeDNPopover[0].isOpen = true;
		        }, 
		        close: function close() {
		          $scope.timeDNPopover[0].isOpen = false;
		          $scope.timeDNPopover[0].tugio.gio = Math.floor($scope.timeDNPopover[0].myDatetimeRange.time.from/60);
		          $scope.timeDNPopover[0].tugio.phut = Math.floor($scope.timeDNPopover[0].myDatetimeRange.time.from%60); 
		          $scope.timeDNPopover[0].toigio.gio = Math.floor($scope.timeDNPopover[0].myDatetimeRange.time.to/60);
		          $scope.timeDNPopover[0].toigio.phut = Math.floor($scope.timeDNPopover[0].myDatetimeRange.time.to%60); 
		          $scope.timeDNPopover[0].timetext = 'Từ ' + $scope.timeDNPopover[0].tugio.gio + ':' + $scope.timeDNPopover[0].tugio.phut +
		          								   ' đến '+ $scope.timeDNPopover[0].toigio.gio + ':' + $scope.timeDNPopover[0].toigio.phut;
		        }
		  	},
		  	//khung giờ 2
		  	{
				content: 'Hello, World!',
				templateUrl: 'kgdn2.html',
				title: 'Xin chọn khung thời gian',
				tugio: {
					gio: 0,
					phut: 0,
				},
				toigio: {
					gio: 0,
					phut: 0,
				},
				isOpen: false,
				timetext: 'Chọn khung giờ',
				myDatetimeRange: {
				    time: {
					    from: 390,
					    to: 1020,
					    dFrom: 0,
					    dTo: 1440,
					    step: 15,
					    minRange: 15,
					    hours24: true
				  	},
				  hasDatePickers: false,
				  hasTimeSliders: true,
				},
				myDatetimeLabels: {
				    date: {
				        from: 'Start date',
				        to: 'End date'
				    }
				},
				open: function open() {
		          $scope.timeDNPopover[1].isOpen = true;
		        }, 
		        close: function close() {
		          $scope.timeDNPopover[1].isOpen = false;
		          $scope.timeDNPopover[1].tugio.gio = Math.floor($scope.timeDNPopover[1].myDatetimeRange.time.from/60);
		          $scope.timeDNPopover[1].tugio.phut = Math.floor($scope.timeDNPopover[1].myDatetimeRange.time.from%60); 
		          $scope.timeDNPopover[1].toigio.gio = Math.floor($scope.timeDNPopover[1].myDatetimeRange.time.to/60);
		          $scope.timeDNPopover[1].toigio.phut = Math.floor($scope.timeDNPopover[1].myDatetimeRange.time.to%60); 
		          $scope.timeDNPopover[1].timetext = 'Từ ' + $scope.timeDNPopover[1].tugio.gio + ':' + $scope.timeDNPopover[1].tugio.phut +
		          								   ' đến '+ $scope.timeDNPopover[1].toigio.gio + ':' + $scope.timeDNPopover[1].toigio.phut;
		        }
		  	},
		  	//khung giờ 3
		  	{
				content: 'Hello, World!',
				templateUrl: 'kgdn3.html',
				title: 'Xin chọn khung thời gian',
				tugio: {
					gio: 0,
					phut: 0,
				},
				toigio: {
					gio: 0,
					phut: 0,
				},
				isOpen: false,
				timetext: 'Chọn khung giờ',
				myDatetimeRange: {
				    time: {
					    from: 390,
					    to: 1020,
					    dFrom: 0,
					    dTo: 1440,
					    step: 15,
					    minRange: 15,
					    hours24: true
				  	},
				  hasDatePickers: false,
				  hasTimeSliders: true,
				},
				myDatetimeLabels: {
				    date: {
				        from: 'Start date',
				        to: 'End date'
				    }
				},
				open: function open() {
		          $scope.timeDNPopover[2].isOpen = true;
		        }, 
		        close: function close() {
		          $scope.timeDNPopover[2].isOpen = false;
		          $scope.timeDNPopover[2].tugio.gio = Math.floor($scope.timeDNPopover[2].myDatetimeRange.time.from/60);
		          $scope.timeDNPopover[2].tugio.phut = Math.floor($scope.timeDNPopover[2].myDatetimeRange.time.from%60); 
		          $scope.timeDNPopover[2].toigio.gio = Math.floor($scope.timeDNPopover[2].myDatetimeRange.time.to/60);
		          $scope.timeDNPopover[2].toigio.phut = Math.floor($scope.timeDNPopover[2].myDatetimeRange.time.to%60); 
		          $scope.timeDNPopover[2].timetext = 'Từ ' + $scope.timeDNPopover[2].tugio.gio + ':' + $scope.timeDNPopover[2].tugio.phut +
		          								   ' đến '+ $scope.timeDNPopover[2].toigio.gio + ':' + $scope.timeDNPopover[2].toigio.phut;
		        }
		  	},
		  	//khung giờ 4
		  	{
				content: 'Hello, World!',
				templateUrl: 'kgdn4.html',
				title: 'Xin chọn khung thời gian',
				tugio: {
					gio: 0,
					phut: 0,
				},
				toigio: {
					gio: 0,
					phut: 0,
				},
				isOpen: false,
				timetext: 'Chọn khung giờ',
				myDatetimeRange: {
				    time: {
					    from: 390,
					    to: 1020,
					    dFrom: 0,
					    dTo: 1440,
					    step: 15,
					    minRange: 15,
					    hours24: true
				  	},
				  hasDatePickers: false,
				  hasTimeSliders: true,
				},
				myDatetimeLabels: {
				    date: {
				        from: 'Start date',
				        to: 'End date'
				    }
				},
				open: function open() {
		          $scope.timeDNPopover[3].isOpen = true;
		        }, 
		        close: function close() {
		          $scope.timeDNPopover[3].isOpen = false;
		          $scope.timeDNPopover[3].tugio.gio = Math.floor($scope.timeDNPopover[3].myDatetimeRange.time.from/60);
		          $scope.timeDNPopover[3].tugio.phut = Math.floor($scope.timeDNPopover[3].myDatetimeRange.time.from%60); 
		          $scope.timeDNPopover[3].toigio.gio = Math.floor($scope.timeDNPopover[3].myDatetimeRange.time.to/60);
		          $scope.timeDNPopover[3].toigio.phut = Math.floor($scope.timeDNPopover[3].myDatetimeRange.time.to%60); 
		          $scope.timeDNPopover[3].timetext = 'Từ ' + $scope.timeDNPopover[3].tugio.gio + ':' + $scope.timeDNPopover[3].tugio.phut +
		          								   ' đến '+ $scope.timeDNPopover[3].toigio.gio + ':' + $scope.timeDNPopover[3].toigio.phut;
		        }
		  	}
	  	]
	}]);
	module.controller('slickController',['$scope', function($scope){
		$scope.numberLoaded = true;
		$scope.slickconfig = {
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