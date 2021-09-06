import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { IStyledComponentsProps } from '../../interfaces/styled-components';
import React from 'react';
import { ILogoutPopup } from '../../interfaces/logout-popup';

export const Logout = styled(
  (props: { loading?: boolean } & ILogoutPopup & IStyledComponentsProps) => {
    return (
      <div className={props.className}>
        <Button onClick={props.toggleButton} variant="text">
          Log out
        </Button>
      </div>
    );
  },
)`
  position: fixed;
  bottom: 50px;
  right: 40px;
`;
