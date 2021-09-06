import { useState } from 'react';
import { ILogoutPopup } from '../interfaces/logout-popup';
import { NextPage } from 'next';

export const withLogoutPopup = <
  P extends Partial<Pick<ILogoutPopup, 'open' | 'toggleButton'>>
>(
  Component: NextPage<P>,
) => {
  const PageComponent = (props: P) => {
    const [open, setOpen] = useState(false);
    const toggleButton = () => {
      setOpen(!open);
    };

    return <Component {...props} open={open} toggleButton={toggleButton} />;
  };

  PageComponent.getInitialProps = async (ctx) => {
    if (Component.getInitialProps) {
      return await Component.getInitialProps(ctx);
    }
  };

  return PageComponent;
};
