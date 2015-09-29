/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    $(document).ready(function(){
        $('.dpindex').datepicker({
            language: 'vi'
        });
        $('.input-daterange').datepicker({
            language: 'vi'
        });
        var quan = [
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
            ];
        var quans = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.whitespace,
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: quan
        });
        function showall(q, sync) {
          if (q === '') {
            sync(quans.get('Quận 1',
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
                'Quận 7'));
          }

          else {
            quans.search(q, sync);
          }
        }
        $('#quan .typeahead').typeahead({
            minLength: 0
        },
        {
            name: 'quan',
            limit: 9999,
            source: showall
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
            $('#formTheoNgay ul').append('<li>' +
                '<div class="form-group">' +
                '<div id="quan">' +
                '<input type="text" name="" placeholder="" readonly="readonly" class="form-control sb visuallyhidden"/>' +
                '<input type="text" name="" placeholder="" readonly="readonly" class="form-control sb visuallyhidden"/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<input type="text" name="tgbd" placeholder="Từ(giờ)" class="form-control sbhaft fixWTime"/>' +
                '<input type="text" name="tgkt" placeholder="Đến(giờ)" class="form-control sbhaft fixWTime"/>' +
                '<input type="button" value="+" class="form-control sb btn btn-danger visuallyhidden"/>' +
                '</div>' +
                '<input type="submit" value="Tìm kiếm" class="form-control sb btn btn-danger visuallyhidden"/>' +
                '</li>');
        });
        $('#addTimeDH').click(function(){
            $('#formDaiHan ul').append('<li>' +
                '<div class="form-group">' +
                '<div id="quan">' +
                '<input type="text" name="" placeholder="" readonly="readonly" class="form-control sb visuallyhidden"/>' +
                '<input type="text" name="" placeholder="" readonly="readonly" class="form-control sbhaft fixWTime visuallyhidden"/>' +
                '<input type="text" name="" placeholder="" readonly="readonly" class="form-control sbhaft fixWTime visuallyhidden"/>' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<input type="text" name="tgbd" placeholder="Từ(giờ)" class="form-control sbhaft fixWTime"/>' +
                '<input type="text" name="tgkt" placeholder="Đến(giờ)" class="form-control sbhaft fixWTime"/>' +
                '<input type="button" value="+" class="form-control sb btn btn-danger visuallyhidden"/>' +
                '</div>' +
                '<input type="submit" value="Tìm kiếm" class="form-control sb btn btn-danger visuallyhidden"/>' +
                '</li>');
        });
        $('#mypanel > .panel').on('show.bs.collapse', function (e) {
            $(this).find('.panel-heading').addClass("active-panel");
        });
        $('#mypanel > .panel').on('hide.bs.collapse', function (e) {
            $(this).find('.panel-heading').removeClass("active-panel");
        });
      $('.slicktest').slick({
        dots: false,
        /* Just changed this to get the bottom dots navigation */
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
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
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
