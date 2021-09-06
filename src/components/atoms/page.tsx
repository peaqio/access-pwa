import styled from 'styled-components';
import { theme } from 'access-pwa-styleguide/src/theme';
import { colors } from 'access-pwa-styleguide/src/const/colors';

export const Page = styled.div`
  width: 100%;
  min-width: 360px;
  min-height: calc(100vh - 62px);
  background: ${colors.black};
  padding: ${theme.spacing(2.5)}px;
  box-sizing: border-box;
  & > div {
    width: 100%;
    height: 100%;
    min-height: calc(100% - 93px);
    box-sizing: border-box;
    padding: ${theme.spacing(3.125, 2.125, 7.5)};
  }
`;
