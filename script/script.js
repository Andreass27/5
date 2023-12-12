
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditButtonForm = document.forms.editForm;
const profileAddButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_card-add');
const nameInput = document.querySelector('#popup__name');
const jobInput = document.querySelector('#popup__researcher');
const InputPlace = document.querySelector('#popup__place')
const InputLink = document.querySelector('#popup__link');
const Elements = document.querySelector('.elements');
const PopupImage = document.querySelector('.popup__image');
const addCardsForm = document.forms.addform;
const imgName = document.querySelector('.popup__imgname');
const cardTemplate = document.querySelector('#card__template').content
const addCardCloseButton = addCardsForm.previousElementSibling;
const bigWindow = document.querySelector('.popup__image');
const bigWindowCloseButton = bigWindow.nextElementSibling;
const editProfileCloseButton = profileEditButtonForm.previousElementSibling;
const popupAll = Array.from(document.querySelectorAll('.popup'));
const profilename = document.querySelector('.profile__name');
const profileresearcher = document.querySelector('.profile__researcher');
const popupClosebigImage = document.querySelector('.popup_type_bigImage');


console.log(popupAll, document.querySelectorAll('.popup'));


// закрыть попапы на ESC
function keyHandler(e){
  if(e.key === 'Escape'){
    const popopOpen = document.querySelector('.popup__open');
    closePopup(popopOpen)
  }
};


// закрыть попапы мышкой
popupAll.forEach(function(popupMouseClose) {
  popupMouseClose.addEventListener('mousedown', function(e) {
    if(e.target.classList.contains('popup__open')) {
      closePopup(popupMouseClose)
    }
    })
});

// Открытия форм
function openPopup(popup) {
window.addEventListener('keydown', keyHandler)
popup.classList.add('popup__open');
};


// закрытие форм
function closePopup (popup) {
  window.removeEventListener('keydown', keyHandler)
  popup.classList.remove('popup__open');
  };



function submitprofileEditform (e) {
  e.preventDefault();
  profilename.textContent = nameInput.value;
  profileresearcher.textContent = jobInput.value;
  closePopup(popupProfile);
};

function addCards(e){ //добавление карт
  e.preventDefault();
  const cards = createCards(InputPlace.value, InputLink.value);
  Elements.prepend(cards);
  closePopup(popupAddCard);
};


function createCards(name, link) {
  const cardElement = cardTemplate.querySelector('.element__template').cloneNode(true); //клонировал 
  const cardImage = cardElement.querySelector('.element__img');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardImage.addEventListener('click', function() { //зум
    PopupImage.setAttribute('src', link);
    openPopup(popupClosebigImage)
    imgName.textContent = name;
    bigWindow.setAttribute('alt', name);
  });

  cardElement.querySelector('.element__name').textContent = name;

  cardElement.querySelector('.element__trash').addEventListener('click', function () { //удаление карточек
    const card = cardElement.querySelector('.element__trash').closest('.element__template');
    card.remove() // карзина 
  });

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) { //like
    evt.target.classList.toggle('element__like_active'); //лайк
  });

  return cardElement 
};

 initialCards.forEach(function(item){
  cards = createCards(item.name , item.link);
  Elements.prepend(cards);
  });

profileEditButton.addEventListener('click', function() { //редактор профиля 
  nameInput.value = profilename.textContent;
  jobInput.value = profileresearcher.textContent;
  resetInputError(profileEditButtonForm, thisenableValidation)
  openPopup(popupProfile);
});

profileAddButton.addEventListener('click', function(){ //редактор добавления карт
  addCardsForm.reset()
  resetInputError(addCardsForm,thisenableValidation)
  openPopup(popupAddCard)
});





profileEditButtonForm.addEventListener('submit',submitprofileEditform); //сохранение редактора профиля
bigWindowCloseButton.addEventListener('click', function(){
  closePopup(popupClosebigImage)
});
addCardCloseButton.addEventListener('click', function(){
  addCardsForm.reset()
  closePopup(popupAddCard)
}); 
editProfileCloseButton.addEventListener('click', function(){
  profileEditButtonForm.reset()
  closePopup(popupProfile)
}); 
addCardsForm.addEventListener('submit', addCards);








