(function($) {
    $(document).ready(function(){
        var limitday = new Date();
        limitday.setDate(limitday.getDate() + 30);
        $('.dpindex').datepicker({
            language: 'vi',
            startDate: new Date(),
            endDate: limitday
        });
        $('.selectpicker').selectpicker({
              style: 'btn-info',
              size: 8
        });
    });
})(jQuery); // End of use strict