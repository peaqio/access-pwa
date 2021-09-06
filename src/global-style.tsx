import { createGlobalStyle } from 'styled-components';
import { colors } from 'access-pwa-styleguide/src/const/colors';

export const BodyStyle = createGlobalStyle`
    body {
        background-color: ${colors.black}!important;
    }
`;

export const HomeTransition = createGlobalStyle`
  .page-transition-enter {
    transform: translateY(-100%);
    transition: all 0.5s ease-in-out;
  }
  .page-transition-enter-active {
    transform: translateY(0%);
    transition: all 0.5s ease-in-out;
  }
  .page-transition-exit {
    transform: translateY(0%);
    transition: all 0.5s ease-in-out;
  }
  .page-transition-exit-active {
    transform: translateY(-100%);
    transition: all 0.5s ease-in-out;
  }
  .page-transition-enter-done {
    transform: translateY(0%);
    transition: all 0.5s ease-in-out;
  }
`;

export const HomeDoorTransition = createGlobalStyle`
  .page-transition-enter {
    transform: translateY(100%);
    transition: all 0.5s ease-in-out;
  }
  .page-transition-enter-active {
    transform: translateY(0%);
    transition: all 0.5s eease-in-out;
  }
  .page-transition-exit {
    transform: translateY(0%);
    transition: all 0.5s ease-in-out;
  }
  .page-transition-exit-active {
    transform: translateY(100%);
    transition: all 0.5s  ease-in-out;
  }
  .page-transition-enter-done {
    transform: translateY(0%);
    transition: all 0.5s ease-in-out;
  }
`;

export const LoginTransition = createGlobalStyle`
  .page-transition-enter {
    transform: translateX(100%);
    transition: all 0.5s ease-in-out;
  }
  .page-transition-enter-active {
    transform: translateX(0%);
    transition: all 0.5s ease-in-out;
  }
  .page-transition-enter-done {
    transform: translateX(0%);
    transition: all 0.5s ease-in-out;
  }
`;
