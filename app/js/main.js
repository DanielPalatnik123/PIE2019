
(function detectUserAgent() {
  var b = document.documentElement;
  b.setAttribute('data-useragent',  navigator.userAgent);
  b.setAttribute('data-platform', navigator.platform );
})();

(function detectBgAndColumns() {
  var toggleOptions = $('.page-toggle').children()
  toggleOptions.map(function(index, element){
    var toggle = $(element)
    var toggleValue = toggle[0].className

    function hasNumber(val) {
      return /\d/.test(val);
    };

    if (hasNumber(toggleValue)==true){
      $('#outline').addClass(toggleValue)

    } else if (hasNumber(toggleValue)==false) {
      $('.page-wrapper').addClass(toggleValue)

    }
  })
})();

(function detectGrid() {
  var topContainer = document.getElementById("page-top-inner");
  var outerContainer = document.getElementById("outer");
  var containerStyle = window.getComputedStyle(topContainer);
  var vals = Object.keys(containerStyle).map(function(key) {
      return containerStyle[key];
  });
  var hasGrid = false;

  $(containerStyle).map(function(index,element) {
    var tryGrid = new RegExp("grid-");
    var tryGridIE = new RegExp("msGrid");

    if (tryGrid.test(element) || tryGridIE.test(element)) {
      hasGrid = true;
    }
  })

  if (hasGrid === false) {
    outerContainer.className += " noGrid";
  }
})();

(function topDate() {

  var today = new Date();
  var BigDay = new Date("June 19, 2019");
  var msPerDay = 24 * 60 * 60 * 1000;
  var timeLeft = (BigDay.getTime() - today.getTime());
  var e_daysLeft = timeLeft / msPerDay;
  var daysLeft = Math.floor(e_daysLeft);
  var yearsLeft = 0;
  if (daysLeft > 365) {
    yearsLeft = Math.floor(daysLeft / 365);
    daysLeft = daysLeft % 365;
  }


  $('.counter-number').text(daysLeft);

  // var daysInMonthsLeft = Math.round((monthsLeftFloat - monthsLeftInt)*30)
  // var monthsLeftInt = parseInt(daysLeft/30)
  // var monthsLeftFloat = parseFloat(daysLeft/30)

})()

function expandMenu() {
  $('.menu-item').removeClass('expanded-menu')
  $(this).addClass('expanded-menu')
}

function shrinkMenu() {
  $('.menu-item').removeClass('expanded-menu')
}

$('.menu-item').mouseenter(expandMenu);
$('.menu-item').mouseleave(shrinkMenu);


(function attachStyle() {
  $('.speakers-block').map(function(index,element) {
    var thisElement = 'speaker' + index
    element.style.gridArea = thisElement
  })
})()


function peopleSayingHeight() {
  var leftColumnVideoHeight = $(".the-conference .left-column video")[0].clientHeight;
  var leftColumnLogosHeight = $(".the-conference .left-column .logo-block")[0].clientHeight;
  var leftColumnImageHeight = $(".the-conference .left-column .whole-content-block .image-block")[0].clientHeight;

  var textHeight = $(".the-conference .right-column .text-block")[0].clientHeight;
  var imgHeight = $(".the-conference .right-column .image-block")[0].clientHeight;
  var list = $(".the-conference .list-block");
  var listHeight = list[0].clientHeight;

  var containerHeight = '';

  containerHeight = (leftColumnVideoHeight + leftColumnLogosHeight + leftColumnImageHeight) - (textHeight + imgHeight);
  list.css('height', containerHeight);
}

$(window).on('load', peopleSayingHeight);
$(window).on('resize', peopleSayingHeight);





function SpeakersMobileCollapse() {

  var titleOffset = $('.speakers-container h1')[0].offsetTop
  var collapsedOffset = $('.speakers-container')[0].children[18].offsetTop
  var uncollapsedOffset = $('.speakers-container').children().last()[0].offsetTop
  var finalCollapsedHeight = uncollapsedOffset - collapsedOffset + 100
  var finalUncollapsedHeight = uncollapsedOffset - titleOffset + 250

  if ($(window).width() <= 520){
    if (expanderButton[0].innerHTML == 'SEE ALL SPEAKERS') {
      $('.speakers').css('height', finalCollapsedHeight);
    } else if (expanderButton[0].innerHTML == 'SEE LESS') {
      $('.speakers').css('height', finalUncollapsedHeight);
    }
  } else if ($(window).width() > 520) {
    $('.speakers').css('height', finalUncollapsedHeight);
  }
}

function SpeakersExpandHeight() {
  var titleOffset = $('.speakers-container h1')[0].offsetTop
  var collapsedOffset = $('.speakers-container')[0].children[18].offsetTop
  var uncollapsedOffset = $('.speakers-container').children().last()[0].offsetTop
  var finalCollapsedHeight = uncollapsedOffset - collapsedOffset + 100
  var finalUncollapsedHeight = uncollapsedOffset - titleOffset + 250

  if (expanderButton[0].innerHTML == 'SEE ALL SPEAKERS') {
    $('.speakers').css('height', finalUncollapsedHeight);
    expanderButton.html("SEE LESS");

  } else if (expanderButton[0].innerHTML == 'SEE LESS') {
      $('.speakers').css('height', finalCollapsedHeight);
      expanderButton.html("SEE ALL SPEAKERS");
  }
}

var expanderButton = $('.expander')

expanderButton.on('click', SpeakersExpandHeight);
$(window).on('load', SpeakersMobileCollapse);
$(window).on('resize', SpeakersMobileCollapse);


function navColorChange() {

  var scrollPos = $(window).scrollTop();

  if ($(window).width() >= 991) {

    if (scrollPos >= 480 && $(".dark-menu").length <= 0) {
      $('#menu').addClass('dark-menu')

    } else if (scrollPos < 480 && $(".dark-menu").length > 0) {
      $('#menu').removeClass('dark-menu')
    }
  }
}

$(window).on('load', navColorChange);
$(window).on('scroll', navColorChange);
$(window).on('resize', navColorChange);




function changeDay() {
  $('.program-day').removeClass('expanded')
  $('.day').removeClass('selected-day')

  if (this == $('.day')[0]) {
    $(this).addClass('selected-day')
    $('.day-one').addClass('expanded')
  } else if (this == $('.day')[1]) {
    $(this).addClass('selected-day')
    $('.day-two').addClass('expanded')
  }
}

$('.day').on('click', changeDay);



/*
  * Replace all SVG images with inline SVG
  */
 $(function() {
  $('nav img').each(function() {
     var $img = $(this);
     var imgID = $img.attr('id');
     var imgClass = $img.attr('class');
     var imgURL = $img.attr('src');

     $.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

  // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
  // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

  // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

  // Replace image with new SVG
        $img.replaceWith($svg);

      }, 'xml');

  });
})



function showPage() {
  $('.page-cover').hide()
}

setTimeout(showPage, 0);
