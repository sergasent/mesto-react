import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const {
    name: currentName,
    about: currentAbout,
  } = useContext(CurrentUserContext);

  const {
    isFormValid, formValues, validState, handleChange,
  } = useFormValidation({
    isOpen,
    inputs: {
      name: currentName,
      about: currentAbout,
    },
  });

  function handleSubmit() {
    return onUpdateUser({
      name: formValues?.name,
      about: formValues?.about,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      isValid={isFormValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChange}
        value={formValues?.name ?? ''}
        className="popup-form__input popup-form__input_type_username"
        type="text"
        name="name"
        id="profile-name"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className={`popup-form__input-error ${validState?.name && 'popup-form__input-error_visible'}`}>
        {validState?.name}
      </span>
      <input
        onChange={handleChange}
        value={formValues?.about ?? ''}
        className="popup-form__input popup-form__input_type_user-description"
        type="text"
        name="about"
        id="profile-description"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className={`popup-form__input-error ${validState?.about && 'popup-form__input-error_visible'}`}>
        {validState?.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
