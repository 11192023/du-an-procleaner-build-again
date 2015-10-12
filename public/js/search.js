(function($) {
    $(document).ready(function(){
        var limitday = new Date();
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        limitday.setDate(limitday.getDate() + 30);
        $('.dpindex').datepicker({
            language: 'vi',
            format: 'mm/dd/yyyy',
            startDate: new Date(),
            endDate: limitday
        });
        $('.selectpicker').selectpicker({
              style: 'btn-info',
              size: 8
        });
        var ngay = getUrlParameter('ngay');
        $('#ngay').val(ngay);
    });
})(jQuery); // End of use strict