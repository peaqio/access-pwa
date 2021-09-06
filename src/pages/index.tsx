import styled from 'styled-components';
import { Typography } from 'access-pwa-styleguide/src/components/atoms/typography';
import { Page } from '../components/atoms/page';
import { IStyledComponentsProps } from '../interfaces/styled-components';
import { Header } from '../components/organithms/header';
import { theme } from 'access-pwa-styleguide/src/theme';
import { Logout } from '../components/atoms/log-out';
import { withLogoutPopup } from '../containers/logout-popup';
import { ILogoutPopup } from '../interfaces/logout-popup';
import { Popup } from '../components/organithms/logout-popup';
import React from 'react';
import { IDoor } from '../interfaces/door';
import { withSelectDoor } from '../containers/select-door';
import { HomeTransition } from '../global-style';
import { ChooseDoorButtons } from '../components/molecules/choose-door-buttons';
import { withUserData } from '../containers/user';
import { ILogin } from '../interfaces/login';
import { withLogin } from '../containers/login';
import { withDisplayError } from '../containers/error';

type MethodProps = IStyledComponentsProps & {
  doors: IDoor[];
  onSelect: (door: IDoor) => () => void;
  logout?: () => void;
  userData?: ILogin;
  loading?: boolean;
};

const Home = styled(
  (
    props: MethodProps &
      ILogoutPopup & {
        pageTransitionReadyToEnter: () => void;
      },
  ) => {
    return (
      <div>
        <HomeTransition />
        <Header>
          <Typography color="secondary" variant="subtitle1">
            Home
          </Typography>
        </Header>
        <Page className={props.className}>
          <div>
            <Typography variant="h3" color="secondary">
              Hi, {props.userData && props.userData.user.name}!
            </Typography>
            <Typography variant="subtitle2" color="secondary">
              Which door would you like to open?
            </Typography>
            <ChooseDoorButtons
              doors={props.doors}
              onSelect={props.onSelect}
              loading={props.loading}
            />
            <Logout
              toggleButton={props.toggleButton}
              open={props.open}
              state={props.state}
              loading={props.loading}
            />
            {props.open ? (
              <Popup {...props} open={props.open} logout={props.logout} />
            ) : null}
          </div>
        </Page>
      </div>
    );
  },
)`
  h3 {
    padding-bottom: ${theme.spacing(1)}px;
  }
`;

const wrappedHome = withDisplayError(
  // @ts-ignore
  withUserData(
    // @ts-ignore
    withSelectDoor(
      // @ts-ignore
      withLogoutPopup(
        // @ts-ignore
        withLogin(Home) as any,
      ),
    ),
  ),
) as any;

export default wrappedHome;
