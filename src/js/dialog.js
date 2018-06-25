'use strict';
var setup = document.querySelector('.setup');
var setupUpload = document.querySelector('.upload');


setupUpload.addEventListener('click', function (evt) {
  evt.preventDefault();
});


var onSetupUploadMousedown = function (evt) {
  var StartCoord = {
    x: evt.pageX,
    y: evt.pageY
  };

  var onDocumentMousemove = function (ev) {
    var shiftCoord = {
      x: StartCoord.x - ev.pageX,
      y: StartCoord.y - ev.pageY
    };

    StartCoord.x = ev.pageX;
    StartCoord.y = ev.pageY;

    var setupPositionX = (setup.offsetLeft - shiftCoord.x) + 'px';
    var setupPositionY = (setup.offsetTop - shiftCoord.y) + 'px';
    setup.style.left = setupPositionX;
    setup.style.top = setupPositionY;
  };

  var onDocumentMouseup = function () {
    document.removeEventListener('mousemove', onDocumentMousemove);
    document.removeEventListener('mouseup', onDocumentMouseup);
  };

  document.addEventListener('mousemove', onDocumentMousemove);
  document.addEventListener('mouseup', onDocumentMouseup);

};


setupUpload.addEventListener('mousedown', onSetupUploadMousedown);



