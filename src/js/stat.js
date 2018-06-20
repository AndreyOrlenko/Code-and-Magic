'use strict';

function getStep(array, maxValue) {
  var max = -1;
  var step = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  step = max / maxValue;
  return step;
}

function getRandomNumber() {
  var num = Math.random();
  if (num < 0.1) {
    return getRandomNumber();
  } else {
    return num;
  }
}

window.renderStatistics = function(ctx, names, times) {
  var step = getStep(times, 150);
  var colorText = 'rgb(0,0,0)';
  var coordinateX = 200;
  var coordinateY = 250;
  var TextCoordinateY = 270;
  var columnWidth = 40;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.arcTo(150, 20, 530, 20, 100);
  ctx.arcTo(530, 20, 530, 290, 100);
  ctx.arcTo(530, 290, 110, 290, 100);
  ctx.arcTo(110, 290, 110, 20, 100);
  ctx.arcTo(110, 20, 150, 20, 100);
  ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx.beginPath();
  ctx.arcTo(140, 10, 520, 10, 100);
  ctx.arcTo(520, 10, 520, 280, 100);
  ctx.arcTo(520, 280, 100, 280, 100);
  ctx.arcTo(100, 280, 100, 10, 100);
  ctx.arcTo(100, 10, 140, 10, 100);
  ctx.fill();

  ctx.fillStyle = colorText;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 230, 40);
  ctx.fillText('Список результатов:', 215, 60);

  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = colorText;
      ctx.fillText(names[i], coordinateX + 50 * i, TextCoordinateY);
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(coordinateX + 50 * i, coordinateY, columnWidth, -times[i] / step);
    } else {
      ctx.fillStyle = colorText;
      ctx.fillText(names[i], 200 + 50 * i, 270);
      ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandomNumber() + ')';
      ctx.fillRect(coordinateX + 50 * i, coordinateY, columnWidth, -times[i] / step);
    }
  }
};
