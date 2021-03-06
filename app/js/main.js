
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


function expandMenu() {
  $('.menu-item').removeClass('expanded-menu')
  $(this).addClass('expanded-menu')
}


function shrinkMenu() {
  $('.menu-item').removeClass('expanded-menu')
}

$('.menu-item').mouseenter(expandMenu);
$('.menu-item').mouseleave(shrinkMenu);

function menuScroll() {
  var allSections = $('.content-section')
  var allAnchors = $('.menu-item')
  var thisAnchor = this
  var ind = ''
  var elementTop = ''
  var modifiedIndex = ''

  /*compares clicked menu item with the entire array of menu items, gets its position*/
  allAnchors.map(function(index,element) {
    if (thisAnchor == element) {
      ind = index
    }
  })

  /*compares array number decided above with the same array of sections (which positioning is the same as the menu items) and picks the equivalent section*/
  allSections.map(function(index,element) {

    /*a modal content section and top section on top of the page will require the two first menu items on the index to be skipped*/

    if ((ind == 0 && index == 2) || (ind == 1 && index == 6) || (ind == 2 && index == 3) || (ind == 3 && index == 4) || (ind == 4 && index == 5) || (ind == 5 && index == 7)) {
      elementTop = element
    } else {
      return
    }
  })

  if (elementTop != '') {
    $('html, body').animate({
        scrollTop: $(elementTop).offset().top
    }, 1000);
  }

}

$('.menu-item').on('click', menuScroll);



(function attachStyle() {
  $('.speakers-block').map(function(index,element) {
    var thisElement = 'speaker' + index
    element.style.gridArea = thisElement
  })
})()

function peopleSayingHeight() {
  var leftColumnVideoHeight = $(".the-conference .left-column video")[0].clientHeight;
  var leftColumnLogosHeight = $(".the-conference .left-column .list-block")[0].clientHeight;
  var leftColumnButtonHeight = $(".the-conference .left-column .whole-content-block.middle-block")[0].clientHeight;
  var leftColumnImageHeight = $(".the-conference .left-column .whole-content-block.bottom-block")[0].clientHeight;

  var textHeight = $(".the-conference .right-column .text-block")[0].clientHeight;
  var imgHeight = $(".the-conference .right-column .image-block")[0].clientHeight;
  var list = $(".the-conference .right-column .list-block");
  var listHeight = list[0].clientHeight;

  var containerHeight = '';

  if (($(window).width() >= 520) && ($(window).width() <= 767)){
    containerHeight = (leftColumnVideoHeight + leftColumnLogosHeight + leftColumnImageHeight + leftColumnButtonHeight) - (textHeight + imgHeight);

  } else {
    containerHeight = (leftColumnVideoHeight + leftColumnLogosHeight + leftColumnImageHeight) - (textHeight + imgHeight);
  }

  list.css('height', containerHeight);
}

$(window).on('load', peopleSayingHeight);
$(window).on('resize', peopleSayingHeight);



function SpeakersMobileCollapse() {

  var titleOffset = $('.speakers-container h1')[0].offsetTop
  var collapsedOffset = $('.speakers-container')[0].children[12].offsetTop
  var uncollapsedOffset = $('.speakers-container').children().last()[0].offsetTop
  var finalCollapsedHeight = uncollapsedOffset - collapsedOffset
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
  var collapsedOffset = $('.speakers-container')[0].children[12].offsetTop
  var uncollapsedOffset = $('.speakers-container').children().last()[0].offsetTop
  var finalCollapsedHeight = uncollapsedOffset - collapsedOffset
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
  $('.program-container').removeClass('expand-one')
  $('.program-container').removeClass('expand-two')
  $('.day').removeClass('selected-day')

  // $('.day').map(function(index, element){
  //   $(element).removeClass('selected-day')
  // })
  thisClass = $(this).attr('class')

  if (thisClass.indexOf('first') !== -1) {
    $('.first-day').map(function(index, element){
      $(element).addClass('selected-day')
    })
    $('.program-container').addClass('expand-one')
  } else if (thisClass.indexOf('second') !== -1) {
      $('.second-day').map(function(index, element){
        $(element).addClass('selected-day')
      })
      $('.program-container').addClass('expand-two')
  }
}


$('.day').on('click', changeDay);



/* Replace all SVG images with inline SVG*/
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



/*funtion related to video modal */

$('video').on('loadedmetadata', function() {
  $('video')[0].play();
});

var modalContainer = $('.video-modal')
var modalIframe = $('.video-modal iframe')
var vidsrc = modalIframe.attr('src');
var icon = $('.play');

icon.click(function() {
   icon.toggleClass('active');
});


$('.btn-modal').click(function(ev) {
  modalContainer.addClass('expanded');
  modalIframe.attr('src', vidsrc);
  modalIframe[0].src += "&autoplay=1";
  var windowHeight = $(window).height()
  ev.preventDefault();
});


function closeModal() {
  modalContainer.removeClass('expanded');
  modalIframe.attr('src','');
}
$('.close-thin').click(closeModal);
$('#videoModal').click(closeModal);


/*funtion related to non-video modal */

function toggleModal(event) {
  if ($(this).hasClass('show-modal')) {
    $('#myModal').attr( "class", "modal" );

    $('#myModal .right-column .text-block').remove();
    $('#myModal .left-column .image-block').remove();

    var thisText = $(this).find('.text-block')[0]
    var thisImage = $(this).find('.image-block')[0]
    var thisClass = ''

    if ($(this).hasClass('keynote-block') || $(this).hasClass('speakers-block') || $(this).hasClass('session-block') || $(this).parent().parent().hasClass('dual-track-block')) {
      thisClass = $(this)[0].className;
    }

    thisClass = thisClass.split(" ")[0]

    thisClassCss = '.' + thisClass

    $(thisClassCss).map(function(index, element){

      var everyText = $(element).find('.text-block')[0]
      var everyImage = $(element).find('.image-block')[0]

      if (thisText == everyText) {
        $(everyText).clone().appendTo("#myModal .right-column");
        $("#myModal .right-column .text-block").addClass(thisClass);
        $("#myModal").addClass(thisClass);
      }

      if (thisImage == everyImage) {
        $(everyImage).clone().appendTo("#myModal .left-column");
        $("#myModal .left-column .image-block").addClass(thisClass);
        $("#myModal").addClass(thisClass);
      }
    })

    $('#myModal').show()

  } else if ($(this).hasClass('close')) {
    $('#myModal').hide()

  } else if (this == document.getElementById('myModal')) {
    if (event.target == $('#myModal')[0]) {
      $('#myModal').hide()
    }
  }
  return false;
}

$('#myModal').on('click', toggleModal);
$('.show-modal').on('click', toggleModal);
$('.close').on('click', toggleModal);


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

  function commaSeparateNumber(val){
     while (/(\d+)(\d{3})/.test(val.toString())){
       val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     }
     return val;
   }


  function startCounter(){

    $(".counter-container").each(function (index, element) {
      var thisText = $(this).find(".large-text-text");
      var thisValue = $(this).find(".large-text-value");
      thisValue.html(daysLeft)
	    $(thisValue).prop('Counter',0).animate({
	        Counter: $(thisValue).text()
	    }, {
	        duration: 2000,
	        easing: 'swing',
	        step: function (now) {
              thisText.text(commaSeparateNumber(parseInt(now).toFixed(0)));
	        }
	    });
    })
  }


  startCounter();
})()
