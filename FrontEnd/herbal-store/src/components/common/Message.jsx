import React from 'react';
import classNames from 'classnames';

const Message = ({ variant, children }) => {
  const classes = classNames('p-4', 'rounded', {
    'bg-blue-100 text-blue-800': variant === 'info',
    'bg-red-100 text-red-800': variant === 'danger',
    'bg-green-100 text-green-800': variant === 'success',
  });

  return <div className={classes}>{children}</div>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
