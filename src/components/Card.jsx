import React, { useContext, memo } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = memo(({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked && 'card__like-button_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="cards__list-item">
      <article className="card">
        {isOwn && (
          <button
            onClick={handleDeleteClick}
            className="card__delete-button root__link"
            type="button"
            aria-label="Удалить место"
          />
        )}

        <button className="card__link" onClick={handleClick} type="button">
          <img
            src={card.link ?? ''}
            alt={card.name ?? ''}
            className="card__image"
          />
        </button>
        <div className="card__description">
          <h2 className="card__title">{card.name ?? ''}</h2>
          <div className="card__like-container">
            <button
              onClick={handleLikeClick}
              className={cardLikeButtonClassName}
              type="button"
              aria-label="Добавить лайк"
            />
            <p className="card__likes-counter">{card.likes?.length ?? ''}</p>
          </div>
        </div>
      </article>
    </li>
  );
});

export default Card;
