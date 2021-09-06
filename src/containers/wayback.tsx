import React from 'react';
import Router from 'next/router';

export const withWayBackButton = <
  P extends {
    wayBackButtonHandler?: () => void;
  }
>(
  Component: React.ComponentType<P>,
) => {
  return (props: P) => {
    const wayBackButton = () => {
      Router.push('/');
    };

    return <Component {...props} wayBackButtonHandler={wayBackButton} />;
  };
};
