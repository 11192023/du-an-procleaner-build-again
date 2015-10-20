/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    if (sessionStorage.getItem("Page2Visited")) {
          sessionStorage.removeItem("Page2Visited");
          window.location.reload(true); // force refresh page1
    }
    $(document).ready(function(){
        
        
        $('.selectpicker').selectpicker({
              style: 'btn-info',
              size: 8
        });
        var limitday = new Date();
        limitday.setDate(limitday.getDate() + 30);
        $('.dpindex').datepicker({
            language: 'vi',
            startDate: new Date(),
            endDate: limitday
        });
        $('#btntheongay').click(function(){
            $('#btntheongay').addClass('active');
            $('#theongay').removeClass('hide');
            $('#btndaihan').removeClass('active');
            $('#daihan').addClass('hide');
        });
        $('#btndaihan').click(function(){
            $('#btndaihan').addClass('active');
            $('#daihan').removeClass('hide');
            $('#btntheongay').removeClass('active');
            $('#theongay').addClass('hide');
        });
        
        $('#addTimeTN').click(function(){
            $('#submitnh1').addClass('visuallyhidden');
            if($('#kg2').hasClass('visuallyhidden')){
                $('#kg2').removeClass('visuallyhidden');
                $('#submitnh2').removeClass('visuallyhidden');
            }
            else if($('#kg3').hasClass('visuallyhidden')){
                $('#kg3').removeClass('visuallyhidden');
                $('#submitnh2').addClass('visuallyhidden');
                $('#submitnh3').removeClass('visuallyhidden');
            }
        });
        $('#removekg2').click(function(){
            if(!$('#kg3').hasClass('visuallyhidden')){
                $('#kg2').appendTo('#nhlist');
                
            }
            else{
                $('#submitnh1').removeClass('visuallyhidden');
            }
            $('#kg2').addClass('visuallyhidden');
            $('#submitnh2').addClass('visuallyhidden');
        });
        $('#removekg3').click(function(){
            if(!$('#kg2').hasClass('visuallyhidden')){
                $('#submitnh2').removeClass('visuallyhidden');
            }
            else{
                $('#submitnh1').removeClass('visuallyhidden');
            }
            $('#kg3').addClass('visuallyhidden');
            $('#kg3').appendTo('#nhlist');
            $('#submitnh3').addClass('visuallyhidden');
            $('#submitnh2').removeClass('visuallyhidden');
        });

        $('#addTimeDH').click(function(){
            $('#submitdh1').addClass('visuallyhidden');
            if($('#kgdn2').hasClass('visuallyhidden')){
                $('#kgdn2').removeClass('visuallyhidden');
                $('#submitdh2').removeClass('visuallyhidden');
            }
            else if($('#kgdn3').hasClass('visuallyhidden')){
                $('#kgdn3').removeClass('visuallyhidden');
                $('#submitdh2').addClass('visuallyhidden');
                $('#submitdh3').removeClass('visuallyhidden');
            }
        });
        $('#removekgdn2').click(function(){
            if(!$('#kgdn3').hasClass('visuallyhidden')){
                $('#kgdn2').appendTo('#dhlist');
                
            }
            else{
                $('#submitdh1').removeClass('visuallyhidden');
            }
            $('#kgdn2').addClass('visuallyhidden');
            $('#submitdh2').addClass('visuallyhidden');
        });
        $('#removekgdn3').click(function(){
            if(!$('#kgdn2').hasClass('visuallyhidden')){
                $('#submitdh2').removeClass('visuallyhidden');
            }
            else{
                $('#submitdh1').removeClass('visuallyhidden');
            }
            $('#kgdn3').addClass('visuallyhidden');
            $('#kgdn3').appendTo('#dhlist');
            $('#submitdh3').addClass('visuallyhidden');
            $('#submitdh2').removeClass('visuallyhidden');
        });
        $('#mypanel > .panel').on('show.bs.collapse', function (e) {
            $(this).find('.panel-heading').addClass("active-panel");
        });
        $('#mypanel > .panel').on('hide.bs.collapse', function (e) {
            $(this).find('.panel-heading').removeClass("active-panel");
        });
      
    });
    "use strict"; // Start of use strict
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '25px',
            maxFontSize: '55px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict
