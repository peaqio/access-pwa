import React from 'react';
import { Page } from '../../components/atoms/page';
import styled from 'styled-components';
import { IStyledComponentsProps } from '../../interfaces/styled-components';
import { Typography } from 'access-pwa-styleguide/src/components/atoms/typography';
import { Form } from '../../components/molecules/form';
import { Logo } from '../../components/atoms/logo';
import { LoginTransition } from '../../global-style';
import { withLogin } from '../../containers/login';
import { withDisplayError } from '../../containers/error';
import { TextField } from 'access-pwa-styleguide/src/components/atoms/input-field';

const Login = styled(
  (
    props: {
      onLogin: () => void;
      loading: boolean;
      error?: any;
    } & IStyledComponentsProps,
  ) => {
    return (
      <Page className={props.className}>
        <LoginTransition />
        <div>
          <Typography variant="h2" color="secondary">
            Welcome
          </Typography>
          <Typography variant="subtitle1" color="secondary">
            Please log in with your email account
          </Typography>
          <Form
            onLogin={props.onLogin}
            loading={props.loading}
            error={props.error}
          >
            <TextField label="Email" error={props.error} name="email" />
            <TextField
              label="Password"
              type="password"
              name="password"
              error={props.error}
              autoComplete="current-password"
              helperText={
                props.error &&
                'This email and password combination is not correct'
              }
            />
          </Form>
          <Logo />
        </div>
      </Page>
    );
  },
)`
  background-image: url(/static/img/peaq-back.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 80% 5%;
  height: 100vh;
`;

export default withDisplayError(
  // @ts-ignore
  withLogin(
    // @ts-ignore
    Login as any,
    {
      targetURL: '/',
      reverse: false,
    },
  ),
);
