'use strict';

//Добавление похожих волшебников
(function () {
  var setup = document.querySelector('.setup');
  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var setupForm = document.querySelector('.setup-wizard-form');
  var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');


  window.paramWizards = {
    namesWizards: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    surnamesWizards: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    coatColors: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
    fireballsColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  window.calculating.getRandomArrayElemIndex = function (arr) {
    var randomNumber = Math.random() * (arr.length - 1);
    return Math.round(randomNumber);
  };


  window.calculating.getRandomArrayElement = function (arr) {
    return arr[window.calculating.getRandomArrayElemIndex(arr)];
  };

  window.wizards = [
    {
      name: RandomSequenceConcatNameAndSurname(window.paramWizards.namesWizards, window.paramWizards.surnamesWizards),
      coatColor: window.calculating.getRandomArrayElement(window.paramWizards.coatColors),
      eyesColor: window.calculating.getRandomArrayElement(window.paramWizards.eyesColors)
    },
    {
      name: RandomSequenceConcatNameAndSurname(window.paramWizards.namesWizards, window.paramWizards.surnamesWizards),
      coatColor: window.calculating.getRandomArrayElement(window.paramWizards.coatColors),
      eyesColor: window.calculating.getRandomArrayElement(window.paramWizards.eyesColors)
    },
    {
      name: concatRandomNameAndSurname(window.paramWizards.namesWizards, window.paramWizards.surnamesWizards),
      coatColor: window.calculating.getRandomArrayElement(window.paramWizards.coatColors),
      eyesColor: window.calculating.getRandomArrayElement(window.paramWizards.eyesColors)
    },
    {
      name: concatRandomNameAndSurname(window.paramWizards.namesWizards, window.paramWizards.surnamesWizards),
      coatColor: window.calculating.getRandomArrayElement(window.paramWizards.coatColors),
      eyesColor: window.calculating.getRandomArrayElement(window.paramWizards.eyesColors)
    }
  ];

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };


  function concatRandomNameAndSurname(arrNames, arrSurnames) {
    return (
      window.calculating.getRandomArrayElement(arrNames) + ' ' + window.calculating.getRandomArrayElement(arrSurnames)
    );
  }


  function RandomSequenceConcatNameAndSurname(arrNames, arrSurnames) {
    var arrayElements = [
      window.calculating.getRandomArrayElement(arrNames),
      window.calculating.getRandomArrayElement(arrSurnames)
    ];
    var randomElementOne = arrayElements[window.calculating.getRandomArrayElemIndex(arrayElements)];
    var randomElementTwo = arrayElements[window.calculating.getRandomArrayElemIndex(arrayElements)];
    if (randomElementOne !== randomElementTwo) {
      return randomElementOne + ' ' + randomElementTwo;
    } else {
      return RandomSequenceConcatNameAndSurname(arrNames, arrSurnames);
    }
  }


  window.backend.load(function (arrElements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(arrElements[i]));
    }
    setupSimilarList.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
  }, window.backend.onError);




  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupForm), function (response) {
      console.log(response);
      setup.classList.add('hidden');
    }, window.backend.onError);

  });
})();

//Открытие/закрытие попапа
(function () {
  var setup = document.querySelector('.setup');
  var buttonOpen = document.querySelector('.setup-open');
  var buttonClose = setup.querySelector('.setup-close');
  var OpenSetupPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupKeydownEsc);
  };
  var CloseSetupPopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupKeydownEsc);
    setup.setAttribute('style', '');
  };
  var onPopupKeydownEsc = function (evt) {
    if (document.activeElement.className !== 'setup-user-name') {
      if (evt.key === 'Escape') {
        CloseSetupPopup();
      }
    }
  };

  buttonOpen.addEventListener('click', function () {
    OpenSetupPopup();
  });

  buttonClose.addEventListener('click', function () {
    CloseSetupPopup();
  });

  buttonOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      OpenSetupPopup();
    }
  });

  buttonClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      CloseSetupPopup();
    }
  });
})();

//Изменение цвета мантии, глаз, фаербола
(function () {
  var setup = document.querySelector('.setup');
  var setupWizard = setup.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEye = setupWizard.querySelector('.wizard-eyes');
  var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');
  var inputWirardCoat = setup.querySelector('input[name="coat-color"]');
  var inputWirardEye = setup.querySelector('input[name="eyes-color"]');
  var inputWirardFireball = setup.querySelector('input[name="fireball-color"]');

  window.colorizeElement = function (element1, element2, arrayColors, callback1, callback2) {
    var color = arrayColors[window.calculating.getRandomArrayElemIndex(arrayColors)];
    callback2(element2, color);
    callback1(element1, color);
  };

  var inputElementColor = function (element, color) {
    element.setAttribute('value', color);
  };

  var fillElement = function (element, color) {
    element.style.fill = color;
  };


  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };


  setupWizardCoat.addEventListener('click', function () {
    window.colorizeElement(setupWizardCoat, inputWirardCoat, window.paramWizards.coatColors, fillElement, inputElementColor);
  });

  setupWizardEye.addEventListener('click', function () {
    window.colorizeElement(setupWizardEye, inputWirardEye, window.paramWizards.eyesColors, fillElement, inputElementColor);
  });

  setupWizardFireball.addEventListener('click', function () {
    window.colorizeElement(setupWizardFireball, inputWirardFireball, window.paramWizards.fireballsColors, changeElementBackground, inputElementColor);
  });

})();

//Перетаскивание артефактов
(function () {
  var setup = document.querySelector('.setup');
  var setupShop = setup.querySelector('.setup-artifacts-shop');
  var setupArtifacts = setup.querySelector('.setup-artifacts');
  var draggedItem = null;

  setupShop.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      setupArtifacts.style.outline = '2px dashed red';
    }
  });

  setupShop.addEventListener('dragend', function () {
    setupArtifacts.style.outline = '';
  });

  setupArtifacts.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  setupArtifacts.addEventListener('drop', function (evt) {
    if (evt.target.children.length === 0) {
      if (!(evt.target.tagName.toLowerCase() === 'img')) {
        evt.target.style.backgroundColor = '';
        evt.target.appendChild(draggedItem.cloneNode());
        setupArtifacts.style.outline = '';
        evt.preventDefault();
      }
    }
  });

  setupArtifacts.addEventListener('dragenter', function (evt) {
    if (evt.target.children.length === 0) {
      if (!(evt.target.tagName.toLowerCase() === 'img')) {
        evt.target.style.backgroundColor = 'yellow';
        evt.preventDefault();
      }
    }
  });
  setupArtifacts.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
