import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { IStyledComponentsProps } from '../../interfaces/styled-components';
import { Button } from 'access-pwa-styleguide/src/components/atoms/button';
import { Loader } from 'access-pwa-styleguide/src/components/atoms/loader';
import { theme } from 'access-pwa-styleguide/src/theme';

export const Form = styled(
  (
    props: {
      onLogin?: () => void;
      loading?: boolean;
      error?: any;
      children?: React.ReactNode;
    } & IStyledComponentsProps,
  ) => {
    const [fullfilled, setFullfilled] = useState(
      Array.isArray(props.children) ? props.children.map(() => false) : [false],
    );

    const onChange = (i: number) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const fields = [...fullfilled];

        if (e.target.value !== '') {
          fields[i] = true;
        } else {
          fields[i] = false;
        }

        setFullfilled(fields);
      };
    };

    const disabled = useMemo(() => fullfilled.some((el) => !el), [fullfilled]);

    return (
      <form className={props.className} onSubmit={props.onLogin}>
        {React.Children.map(props.children, (children, index: number) => {
          return React.cloneElement(children as any, {
            onChange: onChange(index),
          });
        })}
        <Button variant="contained" type="submit" disabled={disabled}>
          {props.loading ? <Loader /> : 'Log in'}
        </Button>
      </form>
    );
  },
)`
  padding-top: ${theme.spacing(6.25)}px;
  display: flex;
  flex-flow: column;
  & > div {
    height: 76px;
  }
  ${Button} {
    margin: ${theme.spacing(3)}px auto ${theme.spacing(30)}px;
  }
`;
