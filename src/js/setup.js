'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
var namesWizards = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnamesWizards = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [
  {
    name: RandomSequenceConcatNameAndSurname(namesWizards, surnamesWizards),
    coatColor: getRandomArrayElement(coatColors),
    eyesColor: getRandomArrayElement(eyesColors)
  },
  {
    name: RandomSequenceConcatNameAndSurname(namesWizards, surnamesWizards),
    coatColor: getRandomArrayElement(coatColors),
    eyesColor: getRandomArrayElement(eyesColors)
  },
  {
    name: concatRandomNameAndSurname(namesWizards, surnamesWizards),
    coatColor: getRandomArrayElement(coatColors),
    eyesColor: getRandomArrayElement(eyesColors)
  },
  {
    name: concatRandomNameAndSurname(namesWizards, surnamesWizards),
    coatColor: getRandomArrayElement(coatColors),
    eyesColor: getRandomArrayElement(eyesColors)
  }
];


var renderWizard = function(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.coatColor;
  return wizardElement;
};

function getRandomArrayElemIndex(arr) {
  var randomNumber = Math.random() * (arr.length - 1);
  return Math.round(randomNumber);
}

function getRandomArrayElement(arr) {
  return arr[getRandomArrayElemIndex(arr)];
}

function concatRandomNameAndSurname(arrNames, arrSurnames) {
  return getRandomArrayElement(arrNames) + ' ' + getRandomArrayElement(arrSurnames);
}

function RandomSequenceConcatNameAndSurname(arrNames, arrSurnames) {
  var arrayElements = [getRandomArrayElement(arrNames), getRandomArrayElement(arrSurnames)];
  var randomElementOne = arrayElements[getRandomArrayElemIndex(arrayElements)];
  var randomElementTwo = arrayElements[getRandomArrayElemIndex(arrayElements)];
  if (randomElementOne !== randomElementTwo) {
    return randomElementOne + ' ' + randomElementTwo;
  } else {
    return RandomSequenceConcatNameAndSurname(arrNames, arrSurnames);
  }
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
setupSimilarList.appendChild(fragment);

setupSimilar.classList.remove('hidden');
