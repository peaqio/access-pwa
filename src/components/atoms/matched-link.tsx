import React, { useEffect, useState, useCallback } from 'react';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';

export const MatchedLink = withRouter(
  (props: {
    href: string;
    as?: string;
    children?: React.ReactElement;
    exact?: boolean;
    router: typeof Router;
  }) => {
    const checkURL = useCallback(() => {
      return props.exact
        ? props.router.pathname === props.href
        : props.router.pathname.indexOf(props.href) !== -1;
    }, [props.exact, props.router.pathname, props.href]);

    const [active, setActive] = useState(checkURL());

    useEffect(() => {
      setActive(checkURL());
    }, [props.exact, props.router.pathname, props.href]);

    return (
      <Link href={props.href}>
        {React.cloneElement(props.children, {
          active,
        })}
      </Link>
    );
  },
);

MatchedLink.defaultProps = {
  exact: true,
};
