import { getRotate } from '../../utils/get-rotate';
import SVG from 'react-inlinesvg';
import { theme } from 'access-pwa-styleguide/src/theme';
import { ILockedProps } from '../../interfaces/locked-state';
import { IStyledComponentsProps } from '../../interfaces/styled-components';
import styled from 'styled-components';
import { colors } from 'access-pwa-styleguide/src/const/colors';
import { getColor } from '../../utils/get-color';

export const KeyIcon = styled(
  (
    props: Pick<ILockedProps, 'isLocked' | 'state'> & IStyledComponentsProps,
  ) => {
    return (
      <div className={props.className}>
        <SVG className="top-key" src="/static/img/open-key.svg" />
        <SVG className="bottom-key" src="/static/img/key.svg" />
      </div>
    );
  },
)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0% 0%;
  transform: translate(-50%, -50%);
  width: 62px;
  height: 99px;
  padding-top: ${theme.spacing(3.25)}px;
  cursor: pointer;
  .top-key {
    display: block;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: ${(props) => getRotate(props.isLocked, props.state)};
    transition: 0.5s ease;
  }
  .bottom-key path {
    transition: fill 0.5s ease-in-out, stroke 0.5s ease-in-out;
    stroke: ${(props) => colors[getColor(props.isLocked, props.state)]};
    &:nth-of-type(1n + 5) {
      fill: ${(props) => colors[getColor(props.isLocked, props.state)]};
    }
  }
  .top-key path {
    transition: fill 0.5s ease-in-out;
    fill: ${(props) => colors[getColor(props.isLocked, props.state)]};
  }
`;
