import React from 'react';

const Rating = ({ value, text, color }) => {
  return (
    <div className="flex items-center text-yellow-500">
      <div className="flex">
        <span>
          <i
            style={{ color }}
            className={
              value >= 1
                ? 'fas fa-star'
                : value >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 2
                ? 'fas fa-star'
                : value >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 3
                ? 'fas fa-star'
                : value >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 4
                ? 'fas fa-star'
                : value >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 5
                ? 'fas fa-star'
                : value >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      </div>
      {text && <span className="ml-2 text-white">{text} Reviews</span>}
    </div>
  );
};

Rating.defaultProps = {
  color: 'text-yellow-500',
};

export default Rating;
