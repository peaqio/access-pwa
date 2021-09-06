import React from 'react';
import styled from 'styled-components';
import { IStyledComponentsProps } from '../../interfaces/styled-components';
import { Typography } from 'access-pwa-styleguide/src/components/atoms/typography';
import { ILogoutPopup } from '../../interfaces/logout-popup';
import { colors } from 'access-pwa-styleguide/src/const/colors';
import { rgba } from 'polished';
import { theme } from 'access-pwa-styleguide/src/theme';
import { Button } from 'access-pwa-styleguide/src/components/atoms/button';

export const Popup = styled(
  (props: { logout: () => void } & ILogoutPopup & IStyledComponentsProps) => {
    return (
      <div className={props.className}>
        <div className="popup-body">
          <Typography variant="subtitle1" color="secondary">
            Log out
          </Typography>
          <Typography variant="body2" color="secondary">
            Are you sure you want to log out?
          </Typography>
          <div>
            <Button
              variant="contained"
              size="small"
              onClick={props.toggleButton}
            >
              Cancel
            </Button>
            <Button
              onClick={props.logout}
              variant="outlined"
              size="small"
              color="secondary"
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    );
  },
)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: ${rgba(colors.black, 0.8)};
  .popup-body {
    width: 336px;
    height: 180px;
    border-radius: 13px;
    box-shadow: 0 4px 4px 0 ${rgba(colors.black, 0.35)};
    background-color: ${colors.greys[7]};
    text-align: center;
    padding: ${theme.spacing(3.125, 4.375)};
    box-sizing: border-box;
    button {
      margin: ${theme.spacing(4, 2.5, 0, 0)};
      border: 1px solid ${colors.greys[11]};
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;
