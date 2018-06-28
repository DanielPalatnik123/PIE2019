
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

// document.addEventListener('DOMContentLoaded', function canvasFunc(){
//
// (function canvasFunc(){
//   var outputCanvas = document.getElementById('output'),
//   output = outputCanvas.getContext('2d'),
//   bufferCanvas = document.getElementById('buffer'),
//   buffer = bufferCanvas.getContext('2d'),
//   video = document.getElementById('video'),
//   width = outputCanvas.width,
//   height = outputCanvas.height,interval;
//   console.log(video)
//
//     buffer.drawImage(video, 0, 0);
//     console.log(buffer)
//
//         // this can be done without alphaData, except in Firefox which doesn't like it when image is bigger than the canvas
//     var image = buffer.getImageData(0, 0, width, height),
//     imageData = image.data,
//     alphaData = buffer.getImageData(0, height, width, height).data;
//     console.log(width)
//     console.log(height)
//
//     for (var i = 3, len = imageData.length; i < len; i = i + 4) {
//       imageData[i] = alphaData[i-1];
//     }
//
//     output.putImageData(image, 0, 0, 0, 0, width, height);
//
//
//
// })()
//
//
//
// video.addEventListener('play', function() {
//   clearInterval(interval);
//   interval = setInterval(processFrame, 40)
// }, false);
//
// // Firefox doesn't support looping video, so we emulate it this way
// video.addEventListener('ended', function() {
//   video.play();
// }, false);
//
// document.getElementById('start').addEventListener('click', function(event) {
//   video.play();
//   event.preventDefault();
// }, false);
//
// document.getElementById('stop').addEventListener('click', function(event) {
//   video.pause();
//   clearInterval(interval);
//   event.preventDefault();
// }, false);
//
// document.getElementById('toggleProcessing').addEventListener('click', function(event) {
//   var toShow = video,
//     toHide = outputCanvas;
//
//   if (video.style.display == 'block') {
//     toShow = outputCanvas;
//     toHide = video;
//   }
//
//   toShow.style.display = 'block';
//   toHide.style.display = 'none';
//
//   event.preventDefault();
// }, false);
//
// });



// document.addEventListener('DOMContentLoaded', function(){
//     var v = document.getElementById('v');
//     var canvas = document.getElementById('c');
//     var context = canvas.getContext('2d');
//
//     var cw = Math.floor(canvas.clientWidth / 100);
//     var ch = Math.floor(canvas.clientHeight / 100);
//     canvas.width = cw;
//     canvas.height = ch;
//
//     v.addEventListener('play', function(){
//         draw(this,context,cw,ch);
//     },false);
//
// },false);
//
// function draw(v,c,w,h) {
//     if(v.paused || v.ended) return false;
//     c.drawImage(v,0,0,w,h);
//     setTimeout(draw,20,v,c,w,h);
// }




function showPage() {
  $('.page-cover').hide()
}

setTimeout(showPage, 0);
