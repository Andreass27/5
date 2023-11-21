
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditButtonForm = document.forms.editForm;
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__researcher');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form'); 
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#researcher');
const InputPlace = document.querySelector('#place')
const InputLink = document.querySelector('#link');
const Elements = document.querySelector('.elements');
const PopupImage = document.querySelector('.popup__image');
const addCardsForm = document.forms.addform;
const imgName = document.querySelector('.popup__imgname');
const cardTemplate = document.querySelector('#card__template').content
const addCardCloseButton = addCardsForm.previousElementSibling;
const bigWindow = document.querySelector('.popup__image');
const bigWindowCloseButton = bigWindow.nextElementSibling;
const editProfileCloseButton = profileEditButtonForm.previousElementSibling;


function openPopup(popup) {
  popup.parentElement.parentElement.classList.add('popup__open');
}



function closePopup (e) {
    e.target.closest('.popup').classList.remove('popup__open');
  }

function submitprofileEditform (e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(e);
}



profileEditButton.addEventListener('click', function() { //редактор профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profileEditButtonForm);
});
profileEditButtonForm.addEventListener('submit',submitprofileEditform); //сохранение редактора профиля


bigWindowCloseButton.addEventListener('click', closePopup);

profileAddButton.addEventListener('click', function(){ //редактор добавления карт
  InputPlace.value ='';
  InputLink.value = '';
  openPopup(addCardsForm)
});





addCardCloseButton.addEventListener('click', closePopup); // кнопка закрытия добавленяи карт
editProfileCloseButton.addEventListener('click', closePopup); //кнопка закрытяи профиля 




function createCards(name, link) {
  const cardElement = cardTemplate.querySelector('.element__template').cloneNode(true); //клонировал 
  const cardImage = cardElement.querySelector('.element__img');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardImage.addEventListener('click', function() { //зум
    PopupImage.setAttribute('src', link);
    openPopup(PopupImage)
    imgName.textContent = name;
    bigWindow.setAttribute('alt', name);
  })

  cardElement.querySelector('.element__name').textContent = name;

  cardElement.querySelector('.element__trash').addEventListener('click', function () { //удаление карточек
    const card = cardElement.querySelector('.element__trash').closest('.element__template');
    card.remove() // карзина 
  })

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) { //like
    evt.target.classList.toggle('element__like_active'); //лайк
  })

  return cardElement // анти лайк
}

const loadCards = initialCards.forEach(function(item){
const cards = createCards(item.name , item.link);
Elements.prepend(cards);


})
function addCards(e){ //добавление карт
  e.preventDefault();
  const cards = createCards(InputPlace.value, InputLink.value);
  Elements.prepend(cards);
  closePopup(e);
}

addCardsForm.addEventListener('submit', addCards);



