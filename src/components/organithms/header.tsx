import React from 'react';
import styled from 'styled-components';
import { IStyledComponentsProps } from '../../interfaces/styled-components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { theme } from 'access-pwa-styleguide/src/theme';
import IconButton from '@material-ui/core/IconButton';
import { withWayBackButton } from '../../containers/wayback';
import { colors } from 'access-pwa-styleguide/src/const/colors';

export const Header = styled(
  withWayBackButton(
    // @ts-ignore
    (
      props: {
        children?: React.ReactNode;
        wayBackButton?: boolean;
        wayBackButtonHandler?: () => void;
      } & IStyledComponentsProps,
    ) => {
      return (
        <header className={props.className}>
          {props.wayBackButton && (
            <IconButton color="secondary" onClick={props.wayBackButtonHandler}>
              <ArrowBackIosIcon />
            </IconButton>
          )}
          {props.children}
        </header>
      );
    },
  ),
)`
  background: ${colors.greys[5]};
  padding: ${theme.spacing(2.25, 2.5, 2)};
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
  button {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  }
`;
