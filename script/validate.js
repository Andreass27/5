const thisenableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'

  }
 
  const querySelector= document.querySelector('popup__input-error_visibled');
  console.log(querySelector);
  const getElementsByClassName1 = document.querySelector('.popup__form');
  console.log(getElementsByClassName1);
  



// показ ошибки
  const ShowInputError = (formElement, inputElement, errorMassage, Element) =>{
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(Element.inputErrorClass);
    errorElement.classList.add(Element.errorClass);
    errorElement.textContent = errorMassage;
    


  };
// удаление
  const hideInputError = (formElement, inputElement, Element) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(Element.inputErrorClass);
    errorElement.classList.remove(Element.errorClass);
    errorElement.textContent = '';
  };

  // проверка на волидность

  const checkInputValidity = (formElement, inputElement, Element) => {
    if (!inputElement.validity.valid) {
      ShowInputError(formElement, inputElement, inputElement.validationMessage,Element);
    } else {
      hideInputError(formElement, inputElement, Element);
    }
  };


  const resetInputError = ((form, Element) => {
    const inputAll = Array.from(form.querySelectorAll(Element.inputSelector));
    const button = form.querySelector(Element.submitButtonSelector)
    inputAll.forEach((i) => {
        hideInputError(form, i, Element)
      })
    button.classList.add(Element.inactiveButtonClass)
  });


  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
       return !inputElement.validity.valid;
     })
   };

   function toggleButtonState(inputList, buttonElement, Element) {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(Element.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true)
    }
    else {
      buttonElement.classList.remove(Element.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true)
    }
  };

  const setEventListeners = (formElement, Element) => {
    const inputList = Array.from(formElement.querySelectorAll(Element.inputSelector));
    const buttonElement = formElement.querySelector(Element.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, Element);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, Element);
        toggleButtonState(inputList, buttonElement, Element);
      });
    });
  };

  const enableValidation = (Element) => {
    const formList = Array.from(document.querySelectorAll(Element.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, Element);
  })};
  
  enableValidation (thisenableValidation);



 
