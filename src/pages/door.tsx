import styled from 'styled-components';
import { Page } from '../components/atoms/page';
import { IStyledComponentsProps } from '../interfaces/styled-components';
import { Typography } from 'access-pwa-styleguide/src/components/atoms/typography';
import { Header } from '../components/organithms/header';
import { ILockedProps } from '../interfaces/locked-state';
import { Button } from 'access-pwa-styleguide/src/components/atoms/button';
import { withLockedState } from '../containers/locked-state';
import { Animation } from '../components/organithms/door/animation';
import { getText } from '../utils/get-text';
import { Time } from '../components/molecules/door/time';
import { IDoor } from '../interfaces/door';
import { HomeDoorTransition } from '../global-style';
import { withLogin } from '../containers/login';
import { withDisplayError } from '../containers/error';

type MethodProps = IStyledComponentsProps & {
  selected: IDoor;
};

const DoorState = styled(
  (
    props: ILockedProps &
      MethodProps & { pageTransitionReadyToEnter: () => void },
  ) => {
    return (
      <div>
        <HomeDoorTransition />
        <Header wayBackButton={true}>
          <Typography color="secondary" variant="subtitle1">
            {props.selected && props.selected.name}
          </Typography>
        </Header>
        <Page
          className={props.className}
          onClick={props.isLocked && props.toggleButton}
        >
          <div>
            <Typography variant="h2" color="secondary">
              {getText(props.isLocked, props.state)}
            </Typography>
            <Animation {...props} />
            {props.isLocked ? null : <Time {...props} />}
            <Typography variant="subtitle2" color="secondary">
              {props.isLocked ? (
                'Tap to open the door'
              ) : (
                <Button variant="contained" onClick={props.closeDoor}>
                  Done
                </Button>
              )}
            </Typography>
          </div>
        </Page>
      </div>
    );
  },
)`
  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-flow: column;
    align-items: center;
  }
`;

const wrappedDoorState = withDisplayError(
  withLockedState(withLogin(DoorState as any)),
) as any;

export default wrappedDoorState;
