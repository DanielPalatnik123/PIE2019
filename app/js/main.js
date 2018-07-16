
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


function showPage() {
  $('.page-cover').hide()
}

setTimeout(showPage, 0);
