import styled from 'styled-components';
import { theme } from 'access-pwa-styleguide/src/theme';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React from 'react';
import { colors } from 'access-pwa-styleguide/src/const/colors';
import { IStyledComponentsProps } from '../../interfaces/styled-components';
import { IDoor } from '../../interfaces/door';
import { Button } from 'access-pwa-styleguide/src/components/atoms/button';
import { Loader } from 'access-pwa-styleguide/src/components/atoms/loader';

type MethodProps = IStyledComponentsProps & {
  doors: IDoor[];
  onSelect: (door: IDoor) => () => void;
  loading?: boolean;
};

export const ChooseDoorButtons = styled((props: MethodProps) => {
  return (
    <div className={props.className}>
      {props.doors.map((door, index) => {
        return (
          <Button
            size="large"
            variant="contained"
            onClick={() => props.onSelect(door)}
            key={index}
          >
            {props.loading ? <Loader /> : door.name}
          </Button>
        );
      })}
    </div>
  );
})`
  padding: ${theme.spacing(6, 0, 4.75)};
  width: 100%;
  margin: ${theme.spacing(3, 0)};
  button {
    clear: both;
    display: block;
    margin-bottom: ${theme.spacing(1.625)}px;
    border: none;
    background: url('/static/img/back-key.svg'), ${colors.greys[11]};
    background-repeat: no-repeat;
    background-size: 250px 180px;
    background-position-x: 154px;
    background-position-y: -19px;
  }
`;
