import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { colors } from 'access-pwa-styleguide/src/const/colors';
import { rgba } from 'polished';
import { getColor } from '../../../utils/get-color';
import { ILockedProps } from '../../../interfaces/locked-state';
import { IStyledComponentsProps } from '../../../interfaces/styled-components';
import { theme } from 'access-pwa-styleguide/src/theme';
import { KeyIcon } from '../../atoms/key-icon';

export const GroupIconButton = styled(
  (props: ILockedProps & IStyledComponentsProps) => {
    return (
      <div className={props.className}>
        <IconButton className="big-circle" />
        <IconButton className="medium-circle" />
        <IconButton className="small-circle" />
        <KeyIcon isLocked={props.isLocked} state={props.state} />
      </div>
    );
  },
)`
  position: relative;
  width: 330px;
  height: 330px;
  margin: ${theme.spacing(5, 0, 6)};
  button {
    position: absolute;
    transform-origin: 0 0;
    top: 50%;
    left: 50%;
    padding-top: ${theme.spacing(3.25)}px;
    background: ${(props) =>
      rgba(colors[getColor(props.isLocked, props.state)], 0.08)};
    transition: background 0.5s ease-in-out;
    &:hover {
      background: ${(props) =>
        rgba(colors[getColor(props.isLocked, props.state)], 0.08)};
    }
  }
  .big-circle {
    width: 330px;
    height: 330px;
    animation: pulsing-big 2.13s infinite;
  }
  .medium-circle {
    width: 263px;
    height: 263px;
    animation: pulsing-medium 2.13s infinite;
  }
  .small-circle {
    width: 176px;
    height: 176px;
    animation: pulsing-small 2.13s infinite;
  }

  @keyframes pulsing-small {
    0% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
    2.34741784% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
    10.798122065% {
      transform: scale(1.2, 1.2) translate(-50%, -50%);
    }
    13.615023474% {
      transform: scale(1.2, 1.2) translate(-50%, -50%);
    }
    58.685446009% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
    100% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
  }

  @keyframes pulsing-medium {
    0% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
    4.225352112% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
    13.615023474% {
      transform: scale(1.2, 1.2) translate(-50%, -50%);
    }
    48.826291079% {
      transform: scale(1.2, 1.2) translate(-50%, -50%);
    }
    93.896713615% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
    100% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
  }

  @keyframes pulsing-big {
    0% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
    7.981220657% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
    48.356807511% {
      transform: scale(1.2, 1.2) translate(-50%, -50%);
    }
    51.17370892% {
      transform: scale(1.2, 1.2) translate(-50%, -50%);
    }
    97.183098591% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
    100% {
      transform: scale(1, 1) translate(-50%, -50%);
    }
  }
`;
