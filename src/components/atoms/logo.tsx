import React from 'react';
import styled from 'styled-components';
import { IStyledComponentsProps } from '../../interfaces/styled-components';

export const Logo = styled((props: IStyledComponentsProps) => {
  return (
    <img className={props.className} src="/static/img/peaq-logo.svg" alt="" />
  );
})`
  display: block;
  margin: 0 auto;
  width: 118px;
  height: 30px;
`;
