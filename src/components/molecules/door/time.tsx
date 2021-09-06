import styled from 'styled-components';
import { Typography } from 'access-pwa-styleguide/src/components/atoms/typography';
import { theme } from 'access-pwa-styleguide/src/theme';
import { colors } from 'access-pwa-styleguide/src/const/colors';
import moment from 'moment';
import { getColor } from '../../../utils/get-color';
import { ILockedProps } from '../../../interfaces/locked-state';
import { IStyledComponentsProps } from '../../../interfaces/styled-components';

export const Time = styled((props: ILockedProps & IStyledComponentsProps) => {
  return (
    <Typography className={props.className} variant="h1">
      {props.state === 'locked'
        ? '00:00'
        : moment(props.time - props.currentTime).format('mm:ss')}
    </Typography>
  );
})`
  color: ${(props) => colors[getColor(props.isLocked, props.state)]};
  transition: color 0.5s ease-in-out;
  padding-bottom: ${theme.spacing(3.75)}px;
`;
